import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString('base64');

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 关键指令：要求 AI 必须返回符合我们图表结构的 JSON
    // 在 web/app/api/analyze/route.ts 中替换 prompt 定义
const prompt = `
你是一位极具商业洞察力的行业分析专家。请深度分析这份文件（可能包含发饰、服装、IP衍生品等数据）。

请执行以下操作并严格返回 JSON：
1. 识别行业属性：根据文件内容判断这是什么品类。
2. 动态维度拆解：
   - 如果是饰品/服装：按“风格”拆解（如：新中式、多巴胺、法式复古、极简等）。
   - 如果是 IP 衍生品：按“品类”拆解（如：毛绒公仔、盲盒、亚克力挂件、文具等）。
   - 如果是其他：找出一个最能体现销售核心差异的维度进行 4-5 个分类。

严格按照以下 JSON 格式返回，不要有任何多余文字：
{
  "elements": [
    {"name": "识别出的风格或品类1", "value": 占比数值},
    {"name": "识别出的风格或品类2", "value": 占比数值},
    {"name": "识别出的风格或品类3", "value": 占比数值},
    {"name": "识别出的风格或品类4", "value": 占比数值}
  ],
  "prices": [
    {"range": "价格段1", "count": 数量},
    {"range": "价格段2", "count": 数量},
    {"range": "价格段3", "count": 数量}
  ],
  "summary": "针对该行业的深度总结：包含当前最火的风格逻辑、热销背后的情绪价值分析，以及 3 条具体改进建议。"
}
`;

    const result = await model.generateContent([
      { inlineData: { data: base64Data, mimeType: file.type } },
      { text: prompt }
    ]);

    const responseText = result.response.text();
    // 提取 JSON 部分（防止 AI 偶尔带上 ```json 标签）
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    
    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error: any) {
    return NextResponse.json({ error: "AI 思考过度，请重试" }, { status: 500 });
  }
}