"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";

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

/**
 * 从 Supabase 中读取雷达图指标数据。
 *
 * 假设有一张表：competitive_radar_metrics
 * 字段示例：
 * - ours_id text
 * - competitor_id text
 * - axis text
 * - ours_score double precision
 * - competitor_score double precision
 */
export async function loadCompetitiveAnalysis(params: {
  oursId: string;
  competitorId: string;
}) {
  const { oursId, competitorId } = params;

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("competitive_radar_metrics")
    .select("*")
    .eq("ours_id", oursId)
    .eq("competitor_id", competitorId);

  if (error) {
    console.error("Supabase competitive_radar_metrics error:", error);
    return {
      success: false as const,
      error: error.message,
      metrics: [] as RadarMetric[],
    };
  }

  const metrics: RadarMetric[] =
    data?.map((row: any) => ({
      axis: row.axis as string,
      ours: Number(row.ours_score ?? 0),
      competitor: Number(row.competitor_score ?? 0),
    })) ?? [];

  return {
    success: true as const,
    metrics,
  };
}

export async function generateStrategyFromAnalysis(params: {
  oursId: string;
  competitorId: string;
  // 这里传入你 PRD 里写好的完整 Prompt 文本
  prdPrompt: string;
}) {
  const { oursId, competitorId, prdPrompt } = params;

  const { success, metrics, error } = await loadCompetitiveAnalysis({
    oursId,
    competitorId,
  });

  if (!success) {
    return {
      success: false as const,
      cards: [] as StrategyCard[],
      error: error ?? "无法从 Supabase 读取竞品分析数据。",
    };
  }

  const analysisData = {
    metrics,
    context: {
      oursId,
      competitorId,
    },
  };

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY 未设置，请在环境变量中配置 GEMINI_API_KEY。"
    );
  }

  const modelName = "models/gemini-2.0-flash";

  const systemInstruction = `
你是一个负责「竞品分析与落地策略」的高级产品策划，请严格按照下面的 PRD 提示词来思考和输出策略：

${prdPrompt}

输入数据是我们通过 Supabase 存储的分析结果，包括我方数据、竞品数据以及雷达图指标。
请根据这些分析数据，输出适合管理层快速决策的策略卡片：
- 每张卡片包含：title, summary, recommendations[], priority, impactArea
- priority 只能是 "low" | "medium" | "high"
- 输出风格专业、简洁，便于直接展示在策略看板。

仅返回 JSON，不要有任何额外说明。
JSON 结构：
{
  "cards": [
    {
      "title": "string",
      "summary": "string",
      "recommendations": ["string", ...],
      "priority": "low" | "medium" | "high",
      "impactArea": "string"
    }
  ]
}
`;

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `下面是我们在 Supabase 中存储的竞品分析数据（包含雷达图维度，对比我方 vs 竞品）：\n\n${JSON.stringify(
            analysisData,
            null,
            2
          )}`,
        },
      ],
    },
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          role: "system",
          parts: [{ text: systemInstruction }],
        },
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini API 请求失败，状态码 ${response.status}: ${errorText}`
    );
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    data.candidates?.[0]?.content?.parts?.[0]?.["text"] ??
    "";

  if (!text) {
    throw new Error("Gemini 返回内容为空，请检查 Prompt 和输入数据。");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error("Gemini 返回的 JSON 解析失败，请检查模型输出格式。");
  }

  if (
    !parsed ||
    typeof parsed !== "object" ||
    !Array.isArray((parsed as { cards?: unknown }).cards)
  ) {
    throw new Error("Gemini 返回的 JSON 结构与预期不符（缺少 cards 数组）。");
  }

  const cards = (parsed as { cards: StrategyCard[] }).cards;

  // 可选：如需把策略结果也落地到 Supabase，这里可以插入到某个 strategy 表中
  // const supabase = createSupabaseServerClient();
  // await supabase.from("strategies").insert(
  //   cards.map((card) => ({
  //     ...card,
  //     created_at: new Date().toISOString(),
  //   }))
  // );

  return {
    success: true as const,
    cards,
  };
}

