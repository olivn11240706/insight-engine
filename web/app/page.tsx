'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, Search, Coffee, Cloud, 
  FileBarChart, History as HistoryIcon, Settings, PawPrint, 
  TrendingUp, DollarSign, Target, Award
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- 这里必须定义 COLORS，否则会报你在截图中看到的错误 ---
const CHART_COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

export default function FixedReportWorkstation() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setReportData({
      mainMetrics: [
        { label: '商品总数', value: '2,595', unit: '件', icon: <Target size={18}/> },
        { label: '月销量估算', value: '722.8', unit: '万单', icon: <TrendingUp size={18}/> },
        { label: '核心均价', value: '¥22.5', unit: '', icon: <DollarSign size={18}/> }
      ],
      elements: [{ name: '发夹类', value: 62 }, { name: '蝴蝶结', value: 21 }, { name: '鲨鱼夹', value: 11 }, { name: '新中式', value: 6 }],
      insights: [
        "市场高度集中：TOP 10 店铺占据近 40% 销量。",
        "风格趋势：新中式/古风（7.9%）呈现爆发式增长。",
        "价格区间：10-20元区间竞争最为激烈。"
      ]
    });
    setIsAnalyzing(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', display: 'flex', color: '#5A5A5A', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '85px', backgroundColor: '#F0E6E1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: '1px solid #EEDCDB' }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: '#BC8F8F', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '40px' }}><PawPrint size={22} /></div>
        <FileBarChart size={24} color="#BC8F8F" />
      </aside>

      <main style={{ flex: 1, padding: '60px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>市场数据深度分析</h1>
            <div style={{ background: 'white', borderRadius: '20px', padding: '10px', display: 'flex', border: '1px solid #EEDCDB', marginTop: '20px' }}>
              <input type="text" placeholder="粘贴链接..." value={url} onChange={(e) => setUrl(e.target.value)} style={{ flex: 1, border: 'none', padding: '12px', outline: 'none' }} />
              <button onClick={handleStartAnalysis} style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '10px 25px', borderRadius: '15px', cursor: 'pointer' }}>
                {isAnalyzing ? '分析中...' : '生成报告'}
              </button>
            </div>
          </header>

          {reportData && (
            <div style={{ animation: 'fadeIn 0.5s' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {reportData.mainMetrics.map((m: any, i: number) => (
                  <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #F3EAE3', textAlign: 'center' }}>
                    <div style={{ color: '#BC8F8F', marginBottom: '5px' }}>{m.icon}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'white', borderRadius: '24px', padding: '40px', border: '1px solid #F3EAE3' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={reportData.elements} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                          {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 style={{ color: '#BC8F8F', marginBottom: '15px' }}>核心洞察</h4>
                    {reportData.insights.map((text: string, i: number) => (
                      <p key={i} style={{ fontSize: '13px', color: '#666', marginBottom: '10px', lineHeight: '1.6' }}>• {text}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}