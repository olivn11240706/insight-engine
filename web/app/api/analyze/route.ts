import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, fileName } = await req.json();

    // --- 真实抓取逻辑预留 ---
    let crawledContent = "";
    if (url) {
      // 以后你可以在这里集成 Puppeteer 或第三方抓取 API
      // const pageData = await fetch(`https://api.scraper.com?url=${url}`).then(res => res.text());
      crawledContent = `用户提供的链接是 ${url}，正在分析其视觉风格。`;
    }

    // --- 构造 AI 指令 ---
    // 在真实环境下，你会调用 Gemini API 并把 crawledContent 传进去
    const mockSummary = url 
      ? `针对竞品链接 ${url} 的深度分析：该店铺目前主打“高溢价人文感”，色彩饱和度极低，建议你在产品主图中加入更多自然光影效果。`
      : `针对文件 ${fileName} 的分析：数据显示 ¥60-¥90 是你的核心成交区间，但在这个区间内，用户对“包装仪式感”的提及率最高。`;

    const result = {
      elements: [
        { name: '法式奶油', value: Math.floor(Math.random() * 50) + 20 },
        { name: '复古手作', value: Math.floor(Math.random() * 30) + 10 },
        { name: '极简北欧', value: Math.floor(Math.random() * 20) + 5 }
      ],
      prices: [
        { range: '¥0-50', count: Math.floor(Math.random() * 30) },
        { range: '¥50-100', count: Math.floor(Math.random() * 50) },
        { range: '¥100+', count: Math.floor(Math.random() * 20) }
      ],
      summary: mockSummary
    };

    return NextResponse.json(result);

  } catch (error) {
    return NextResponse.json({ error: "分析失败" }, { status: 500 });
  }
}