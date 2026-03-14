import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    // 这里是模拟数据，用于先确保上传后能显示报告
    const mockData = {
      elements: [
        { name: '新中式风格', value: 35 },
        { name: '法式复古发圈', value: 25 },
        { name: '极简抓夹', value: 20 },
        { name: '其他', value: 20 }
      ],
      prices: [
        { range: '0-50元', count: 15 },
        { range: '50-100元', count: 25 },
        { range: '100-200元', count: 18 }
      ],
      summary: "基于上传的发饰数据，我们发现“新中式风格”目前热度最高，建议加强此类产品的视觉呈现和营销推广。价格方面，50-100元是主销区间，请保持性价比。"
    };

    return NextResponse.json(mockData);
  } catch (error) {
    return NextResponse.json({ error: '后端接口异常' }, { status: 500 });
  }
}