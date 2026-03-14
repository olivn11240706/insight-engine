"use client";

import { useCallback, useMemo, useState } from "react";
import { UploadCloud, FileSpreadsheet, Sparkles, Trash2 } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

type CleaningStep =
  | {
      type: "info" | "success" | "warning";
      message: string;
    }
  | {
      type: "change-summary";
      message: string;
      details: Record<string, unknown>;
    };

type ParsedTable = {
  headers: string[];
  rows: Record<string, unknown>[];
};

function isCSV(file: File) {
  return (
    file.type === "text/csv" ||
    file.name.toLowerCase().endsWith(".csv") ||
    file.type === "application/vnd.ms-excel"
  );
}

function isExcel(file: File) {
  const name = file.name.toLowerCase();
  return (
    name.endsWith(".xlsx") ||
    name.endsWith(".xls") ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
}

async function parseFile(file: File): Promise<ParsedTable> {
  if (isCSV(file)) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = (results.data as Record<string, unknown>[]) ?? [];
          const headers =
            (results.meta.fields as string[] | undefined) ??
            (rows[0] ? Object.keys(rows[0]) : []);
          resolve({ headers, rows });
        },
        error: (error) => reject(error),
      });
    });
  }

  if (isExcel(file)) {
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
      defval: null,
    });
    const headers = json[0] ? Object.keys(json[0]) : [];
    return { headers, rows: json };
  }

  throw new Error("Unsupported file type. Please upload CSV or Excel.");
}

type NullStrategy = "leave" | "drop-rows" | "fill-zero" | "fill-empty";

function cleanData(
  table: ParsedTable,
  strategy: NullStrategy
): { cleaned: ParsedTable; steps: CleaningStep[] } {
  const steps: CleaningStep[] = [];

  steps.push({
    type: "info",
    message: `Loaded ${table.rows.length} rows with ${table.headers.length} columns.`,
  });

  const seen = new Set<string>();
  const dedupedRows: Record<string, unknown>[] = [];

  for (const row of table.rows) {
    const key = JSON.stringify(row);
    if (!seen.has(key)) {
      seen.add(key);
      dedupedRows.push(row);
    }
  }

  const duplicateCount = table.rows.length - dedupedRows.length;
  if (duplicateCount > 0) {
    steps.push({
      type: "change-summary",
      message: "Removed duplicate rows.",
      details: { duplicatesRemoved: duplicateCount },
    });
  } else {
    steps.push({
      type: "info",
      message: "No duplicate rows detected.",
    });
  }

  let processedRows = dedupedRows;

  if (strategy !== "leave") {
    if (strategy === "drop-rows") {
      const before = processedRows.length;
      processedRows = processedRows.filter((row) =>
        table.headers.every((h) => row[h] !== null && row[h] !== undefined)
      );
      const dropped = before - processedRows.length;
      steps.push({
        type: "change-summary",
        message: dropped
          ? "Dropped rows containing null values."
          : "No rows contained null values.",
        details: { rowsDropped: dropped },
      });
    } else {
      let nullCells = 0;
      processedRows = processedRows.map((row) => {
        const copy: Record<string, unknown> = { ...row };
        for (const h of table.headers) {
          const value = copy[h];
          if (value === null || value === undefined) {
            nullCells += 1;
            if (strategy === "fill-zero") {
              copy[h] = 0;
            } else if (strategy === "fill-empty") {
              copy[h] = "";
            }
          }
        }
        return copy;
      });

      steps.push({
        type: "change-summary",
        message: nullCells
          ? "Filled null values."
          : "No null values were found.",
        details: { cellsFilled: nullCells, strategy },
      });
    }
  } else {
    steps.push({
      type: "info",
      message: "Null handling strategy: leave as-is.",
    });
  }

  steps.push({
    type: "success",
    message: `Cleaning complete. Final row count: ${processedRows.length}.`,
  });

  return {
    cleaned: {
      headers: table.headers,
      rows: processedRows,
    },
    steps,
  };
}

const nullStrategyOptions: { value: NullStrategy; label: string }[] = [
  { value: "leave", label: "Leave nulls as-is" },
  { value: "drop-rows", label: "Drop rows with nulls" },
  { value: "fill-zero", label: "Fill nulls with 0" },
  { value: "fill-empty", label: "Fill nulls with empty string" },
];

export default function DashboardPage() {
  const [rawTable, setRawTable] = useState<ParsedTable | null>(null);
  const [cleanedTable, setCleanedTable] = useState<ParsedTable | null>(null);
  const [strategy, setStrategy] = useState<NullStrategy>("drop-rows");
  const [log, setLog] = useState<CleaningStep[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      setError(null);
      setIsProcessing(true);
      setLog([
        {
          type: "info",
          message: `Received file "${file.name}". Detecting format and parsing...`,
        },
      ]);

      try {
        const parsed = await parseFile(file);
        setRawTable(parsed);
        setLog((current) => [
          ...current,
          {
            type: "info",
            message: `Parsed ${parsed.rows.length} rows, ${parsed.headers.length} columns.`,
          },
        ]);

        const { cleaned, steps } = cleanData(parsed, strategy);
        setCleanedTable(cleaned);
        setLog((current) => [...current, ...steps]);
      } catch (e) {
        console.error(e);
        setError(
          e instanceof Error
            ? e.message
            : "Failed to parse file. Please check the format."
        );
        setLog((current) => [
          ...current,
          {
            type: "warning",
            message: "Cleaning aborted due to an error.",
          },
        ]);
      } finally {
        setIsProcessing(false);
      }
    },
    [strategy]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const files = event.dataTransfer.files;
      void handleFiles(files);
    },
    [handleFiles]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      void handleFiles(event.target.files);
    },
    [handleFiles]
  );

  const hasTable = !!cleanedTable;

  const previewRows = useMemo(() => {
    if (!cleanedTable) return [];
    return cleanedTable.rows.slice(0, 10);
  }, [cleanedTable]);

  const reset = () => {
    setRawTable(null);
    setCleanedTable(null);
    setLog([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-stone-900">
                Insight Engine Dashboard
              </h1>
              <p className="text-sm text-stone-500">
                Gently prepare your data for analysis with a calm, guided flow.
              </p>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <section className="space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-white/80 p-5 shadow-sm shadow-amber-100 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                    <FileSpreadsheet className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-stone-900">
                      Upload your dataset
                    </h2>
                    <p className="text-xs text-stone-500">
                      CSV or Excel files up to a few MBs.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-full border border-amber-100 bg-white px-3 py-1.5 text-xs font-medium text-stone-500 shadow-sm transition hover:border-amber-200 hover:text-stone-700"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              </div>

              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={handleDrop}
                className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-amber-200 bg-gradient-to-br from-amber-50/80 via-white to-rose-50/80 px-6 py-10 text-center transition hover:border-amber-300 hover:bg-amber-50/80"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-amber-100/80 p-3 text-amber-700 shadow-sm">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="mb-1 text-sm font-medium text-stone-800">
                  Drop your file here or{" "}
                  <span className="underline decoration-amber-400 decoration-2 underline-offset-4">
                    browse
                  </span>
                </p>
                <p className="mb-4 text-xs text-stone-500">
                  Accepted formats: .csv, .xlsx, .xls
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-stone-500 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Auto-applies duplicate removal &amp; null handling.
                </div>
                <input
                  type="file"
                  accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  onChange={handleInputChange}
                />
              </label>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-stone-600">
                    Null handling
                  </span>
                  <div className="relative">
                    <select
                      value={strategy}
                      onChange={(e) =>
                        setStrategy(e.target.value as NullStrategy)
                      }
                      className="h-8 rounded-full border border-amber-100 bg-white px-3 pr-8 text-xs text-stone-700 shadow-sm focus:border-amber-300 focus:outline-none"
                    >
                      {nullStrategyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] text-stone-400">
                      ▼
                    </span>
                  </div>
                </div>
                {rawTable && (
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      Raw: {rawTable.rows.length} rows
                    </span>
                    {cleanedTable && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Clean: {cleanedTable.rows.length} rows
                      </span>
                    )}
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/80 px-4 py-3 text-xs text-rose-700">
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-amber-100 bg-white/90 p-4 shadow-sm shadow-amber-100 backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-stone-900">
                  Data preview
                </h2>
                <p className="text-xs text-stone-400">
                  Showing up to 10 rows of the cleaned dataset.
                </p>
              </div>
              {!hasTable ? (
                <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-amber-100 bg-amber-50/40 text-xs text-stone-400">
                  <p>No data yet. Upload a file to see a preview.</p>
                </div>
              ) : (
                <div className="max-h-[360px] overflow-auto rounded-2xl border border-amber-100 bg-amber-50/40">
                  <table className="min-w-full text-left text-xs text-stone-700">
                    <thead className="sticky top-0 bg-amber-100/80 backdrop-blur">
                      <tr>
                        {cleanedTable!.headers.map((header) => (
                          <th
                            key={header}
                            className="whitespace-nowrap px-3 py-2 font-semibold text-stone-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previewRows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={
                            rowIndex % 2 === 0
                              ? "bg-white/60"
                              : "bg-amber-50/60"
                          }
                        >
                          {cleanedTable!.headers.map((header) => (
                            <td
                              key={header}
                              className="whitespace-nowrap px-3 py-2 text-[11px] text-stone-700"
                            >
                              {String(
                                row[header] === null || row[header] === undefined
                                  ? ""
                                  : row[header]
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-amber-900/95 p-5 text-amber-50 shadow-md shadow-amber-200">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">
                    Cleaning Log
                  </h2>
                  <p className="text-xs text-amber-200">
                    A transparent, step-by-step record of how your data is
                    transformed.
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-800/80 px-2.5 py-1 text-[11px] text-amber-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {isProcessing ? "Processing…" : "Idle"}
                </div>
              </div>

              <div className="max-h-[420px] space-y-2 overflow-auto rounded-2xl bg-amber-950/30 p-3">
                {log.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-amber-700/60 bg-amber-950/40 px-3 py-3 text-xs text-amber-200/80">
                    Upload a dataset to see a live log of parsing, duplicate
                    detection, and null handling, inspired by a Pandas-style
                    workflow.
                  </div>
                ) : (
                  log.map((entry, index) => {
                    const key = `${entry.type}-${index}`;
                    if (entry.type === "change-summary") {
                      return (
                        <div
                          key={key}
                          className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-amber-50"
                        >
                          <div className="mb-0.5 font-medium">
                            {entry.message}
                          </div>
                          <div className="flex flex-wrap gap-2 text-[11px] text-emerald-100/90">
                            {Object.entries(entry.details).map(
                              ([k, v], detailIndex) => (
                                <span
                                  key={`${key}-${detailIndex}`}
                                  className="rounded-full bg-emerald-500/20 px-2 py-0.5"
                                >
                                  {k}: {String(v)}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      );
                    }
                    const palette =
                      entry.type === "success"
                        ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-50"
                        : entry.type === "warning"
                        ? "border-rose-400/40 bg-rose-500/10 text-rose-50"
                        : "border-amber-500/40 bg-amber-500/10 text-amber-50";
                    return (
                      <div
                        key={key}
                        className={`rounded-2xl border px-3 py-2 text-xs ${palette}`}
                      >
                        {entry.message}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-white/90 p-4 text-xs text-stone-500 shadow-sm shadow-amber-100">
              <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-700">
                Notes
              </h3>
              <p className="mb-1">
                This prototype performs all cleaning in your browser. For larger
                datasets or persistent workflows, you can move this logic into a
                backend job or Supabase function.
              </p>
              <p>
                Current steps: parse file → remove duplicate rows → apply your
                chosen null strategy → surface a transparent Cleaning Log.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

