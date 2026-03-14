"use server";

import { createSupabaseServerClient } from "@/lib/supabaseServer";

type CleanedReview = {
  id?: string | number | null;
  text: string;
  metadata?: Record<string, unknown> | null;
};

type GeminiReviewClassification = {
  id?: string | number | null;
  text: string;
  topics: string[];
  sentiment: "positive" | "neutral" | "negative";
  confidence?: number;
};

async function callGeminiForTopicsAndSentiment(
  reviews: CleanedReview[]
): Promise<GeminiReviewClassification[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not set. Please add it to your environment."
    );
  }

  if (reviews.length === 0) {
    return [];
  }

  const modelName = "models/gemini-2.0-flash";

  const systemInstruction = `
You are a data analysis assistant helping with topic modeling and sentiment analysis of user reviews.

For each review you receive, you must:
- Identify 1-3 concise, human-readable topics (e.g. "customer support", "pricing", "product quality").
- Assign an overall sentiment: one of "positive", "neutral", or "negative".
- Optionally provide a confidence score between 0 and 1.

Return ONLY valid JSON with no extra commentary. The JSON should be an array where each element corresponds to an input review in order, with this shape:
{
  "id": string | number | null, // echo any id we pass through, or null
  "text": string,               // original review text
  "topics": string[],           // 1-3 topics
  "sentiment": "positive" | "neutral" | "negative",
  "confidence": number          // optional
}
`;

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Here is an array of cleaned reviews. Analyze each one and respond with JSON as specified:\n\n${JSON.stringify(
            reviews,
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
      `Gemini API request failed with status ${response.status}: ${errorText}`
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
    throw new Error("Gemini API returned an empty response.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(
      "Failed to parse Gemini JSON response. Check the model output format."
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Gemini response is not an array as expected.");
  }

  return parsed as GeminiReviewClassification[];
}

export async function analyzeAndStoreReviews(params: {
  reviews: CleanedReview[];
}) {
  const { reviews } = params;

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return {
      success: false,
      error: "No reviews provided.",
    };
  }

  const supabase = createSupabaseServerClient();

  const classifications = await callGeminiForTopicsAndSentiment(reviews);

  const payload = classifications.map((item, index) => {
    const original = reviews[index];
    return {
      // Adjust these keys to match your Supabase "reviews" table columns.
      original_id: original.id ?? null,
      text: original.text,
      topics: item.topics,
      sentiment: item.sentiment,
      sentiment_confidence: item.confidence ?? null,
      metadata: {
        ...((original.metadata as Record<string, unknown> | undefined) ?? {}),
        gemini_raw: item,
      },
      created_at: new Date().toISOString(),
    };
  });

  const { error } = await supabase.from("reviews").insert(payload);

  if (error) {
    console.error("Supabase insert error:", error);
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
    count: payload.length,
  };
}

