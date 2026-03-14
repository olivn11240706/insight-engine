"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import {
  generateStrategyFromAnalysis,
  loadCompetitiveAnalysis,
} from "./actions";

type RadarMetric = {
  axis: string;
  ours: number;
  competitor: number;
};

type StrategyCard = {
  title: string;
  summary: string;
  recommendations: string[];
  priority: "low" | "medium" | "high";
  impactArea: string;
};

// 这里放一个占位的 PRD Prompt，实际使用时你可以把“之前写好的 PRD 提示词”完整替换进去
const PRD_PROMPT_PLACEHOLDER = `
你是一名资深产品经理，请基于竞品分析数据，输出可落地的产品与运营策略。
关注：差异化优势、补短板动作、节奏与优先级、对营收/留存/口碑的影响。
输出形式：多张策略卡片，每张卡片可直接展示在高管评审页面。
`;

const MOCK_OPTIONS = [
  { id: "ours_v1", label: "我方版本 v1.0" },
  { id: "ours_v2", label: "我方版本 v2.0" },
];

const MOCK_COMP_OPTIONS = [
  { id: "comp_a", label: "竞品 A" },
  { id: "comp_b", label: "竞品 B" },
];

const MOCK_RADAR_DATA: RadarMetric[] = [
  { axis: "功能完备度", ours: 80, competitor: 65 },
  { axis: "易用性", ours: 72, competitor: 88 },
  { axis: "性能 & 稳定性", ours: 76, competitor: 70 },
  { axis: "生态/集成", ours: 68, competitor: 82 },
  { axis: "品牌影响力", ours: 60, competitor: 90 },
  { axis: "价格竞争力", ours: 74, competitor: 60 },
];

function priorityChip(priority: StrategyCard["priority"]) {
  const map: Record<
    StrategyCard["priority"],
    { label: string; className: string }
  > = {
    high: {
      label: "高优先级",
      className: "bg-rose-100 text-rose-700 border-rose-200",
    },
    medium: {
      label: "中优先级",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    },
    low: {
      label: "低优先级",
      className: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
  };
  const cfg = map[priority];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${cfg.className}`}
    >
      {cfg.label}
    </span>
  );
}

export default function CompetitivePage() {
  const [ours, setOurs] = useState(MOCK_OPTIONS[0]?.id ?? "");
  const [competitor, setCompetitor] = useState(MOCK_COMP_OPTIONS[0]?.id ?? "");
  const [cards, setCards] = useState<StrategyCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [metrics, setMetrics] = useState<RadarMetric[] | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  // 从 Supabase 加载雷达图指标
  useEffect(() => {
    let cancelled = false;
    setIsLoadingMetrics(true);
    setError(null);

    loadCompetitiveAnalysis({ oursId: ours, competitorId: competitor })
      .then((res) => {
        if (cancelled) return;
        if (!res.success) {
          setError(res.error ?? "加载竞品分析数据失败。");
          setMetrics(null);
          return;
        }
        setMetrics(res.metrics);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error(e);
        setError(
          e instanceof Error ? e.message : "加载竞品分析数据时出现异常。"
        );
        setMetrics(null);
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoadingMetrics(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [ours, competitor]);

  const chartData = useMemo(
    () => metrics && metrics.length > 0 ? metrics : MOCK_RADAR_DATA,
    [metrics]
  );

  const handleGenerate = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await generateStrategyFromAnalysis({
          oursId: ours,
          competitorId: competitor,
          prdPrompt: PRD_PROMPT_PLACEHOLDER,
        });

        if (!result.success) {
          setError(result.error ?? "生成策略失败，请稍后重试。");
          return;
        }

        setCards(result.cards);
      } catch (e) {
        console.error(e);
        setError(
          e instanceof Error ? e.message : "调用 Gemini 生成策略时出现异常。"
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50 text-stone-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-stone-900">
                竞品分析 · 雷达对比
              </h1>
              <p className="text-xs text-stone-500">
                左右选择数据源，中间雷达图可视化对比，一键生成策略卡片。
              </p>
            </div>
          </div>
        </header>

        <main className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <section className="space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-white/80 p-5 shadow-sm shadow-amber-100 backdrop-blur">
              <div className="mb-4 grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-stone-600">
                    我方数据
                  </div>
                  <select
                    value={ours}
                    onChange={(e) => setOurs(e.target.value)}
                    className="h-9 w-full rounded-2xl border border-amber-100 bg-amber-50/40 px-3 text-xs text-stone-800 shadow-sm focus:border-amber-300 focus:outline-none"
                  >
                    {MOCK_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-center text-xs text-stone-400">
                  <span className="rounded-full bg-stone-100 px-3 py-1">
                    雷达对比维度：功能、体验、品牌、价格等
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-stone-600">
                    竞品数据
                  </div>
                  <select
                    value={competitor}
                    onChange={(e) => setCompetitor(e.target.value)}
                    className="h-9 w-full rounded-2xl border border-amber-100 bg-rose-50/40 px-3 text-xs text-stone-800 shadow-sm focus:border-amber-300 focus:outline-none"
                  >
                    {MOCK_COMP_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="h-80 rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50/80 via-white to-rose-50/80 p-4 shadow-inner">
                {isLoadingMetrics && (
                  <div className="mb-2 text-right text-[11px] text-stone-400">
                    正在从 Supabase 加载分析数据…
                  </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={chartData}
                    margin={{ top: 16, right: 32, bottom: 16, left: 32 }}
                  >
                    <PolarGrid stroke="#f5e6c8" />
                    <PolarAngleAxis
                      dataKey="axis"
                      tick={{ fill: "#6b5c4b", fontSize: 11 }}
                    />
                    <PolarRadiusAxis
                      angle={45}
                      domain={[0, 100]}
                      tick={{ fill: "#a38d76", fontSize: 10 }}
                      tickCount={6}
                    />
                    <Radar
                      name="我方"
                      dataKey="ours"
                      stroke="#ea580c"
                      fill="#ea580c"
                      fillOpacity={0.35}
                    />
                    <Radar
                      name="竞品"
                      dataKey="competitor"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.25}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: 11,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 16,
                        borderColor: "#fcd9b6",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                        fontSize: 11,
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-amber-900/95 p-5 text-amber-50 shadow-md shadow-amber-200">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">
                    生成落地策略
                  </h2>
                  <p className="text-xs text-amber-200">
                    点击「生成策略」，把 Supabase 的竞品分析数据 +
                    PRD 提示词一起丢给 Gemini。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1.5 text-xs font-medium text-amber-50 shadow-sm shadow-amber-700/40 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-amber-700/60"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      正在生成…
                    </>
                  ) : (
                    <>
                      生成策略
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="max-h-[420px] space-y-3 overflow-auto rounded-2xl bg-amber-950/40 p-3">
                {cards.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-amber-700/60 bg-amber-950/50 px-3 py-3 text-xs text-amber-200/90">
                    暂无策略卡片。
                    <br />
                    后续接入 Supabase 后，你可以：
                    <br />
                    1）根据左/右下拉框选择，从 Supabase 读取对应的竞品分析数据；
                    <br />
                    2）将这些分析数据 + 你在 PRD 中写好的完整 Prompt 一起传入
                    generateStrategyFromAnalysis；
                    <br />
                    3）把返回的 cards 渲染成现在这个区域里的精美卡片。
                  </div>
                ) : (
                  cards.map((card, index) => (
                    <div
                      key={`${card.title}-${index}`}
                      className="space-y-2 rounded-2xl border border-amber-700/70 bg-gradient-to-br from-amber-900/80 via-amber-950/80 to-stone-950/80 p-3 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-amber-50">
                            {card.title}
                          </div>
                          <div className="mt-0.5 text-[11px] text-amber-200/90">
                            影响范围：{card.impactArea}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {priorityChip(card.priority)}
                        </div>
                      </div>
                      <p className="text-xs text-amber-100/90">
                        {card.summary}
                      </p>
                      <ul className="space-y-1 text-xs text-amber-100/90">
                        {card.recommendations.map((rec, i) => (
                          <li
                            key={`${index}-rec-${i}`}
                            className="flex gap-2"
                          >
                            <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-amber-400" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              {error && (
                <div className="mt-3 rounded-2xl border border-rose-400/60 bg-rose-500/15 px-3 py-2 text-xs text-rose-50">
                  {error}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

