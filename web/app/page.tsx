'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, Link as LinkIcon, Search, Sparkles, 
  FileBarChart, Heart, Palette, MousePointer2
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

// --- 可爱的小装饰组件 ---
const FloatingDecor = () => (
  <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
    {/* 漂浮的小圆点和图形 */}
    <div className="float-1" style={{ position: 'absolute', top: '15%', left: '10%', width: '20px', height: '20px', borderRadius: '50%', background: '#EEDCDB' }} />
    <div className="float-2" style={{ position: 'absolute', bottom: '20%', right: '15%', width: '30px', height: '30px', borderRadius: '8px', background: '#E1E8EB', transform: 'rotate(15deg)' }} />
    <div className="float-3" style={{ position: 'absolute', top: '40%', right: '10%', color: '#BC8F8F', opacity: 0.4 }}><Heart size={24} fill="#BC8F8F" /></div>
    <div className="float-1" style={{ position: 'absolute', bottom: '30%', left: '15%', color: '#A9BA9D', opacity: 0.4 }}><Sparkles size={20} /></div>
    
    {/* 水彩墨迹背景 */}
    <div style={{ position: 'absolute', top: '-5%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, #F3EAE3 0%, rgba(243,234,227,0) 70%)', filter: 'blur(50px)' }} />
  </div>
);

export default function KawaiiInsightEngine() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartAnalysis = async () => {
    if (!url && !file) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setReportData({
        elements: [{ name: '温柔法式', value: 45 }, { name: '奶油甜心', value: 30 }, { name: '森系自然', value: 25 }],
        prices: [{ range: '¥0-30', count: 20 }, { range: '¥30-80', count: 35 }, { range: '¥80+', count: 10 }],
        summary: "分析报告：这份数据透出一种“治愈系”的商业能量。建议在视觉呈现上多使用低饱和度的色彩组合。"
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', display: 'flex', color: '#5D5D5D', fontFamily: '"Noto Sans SC", sans-serif' }}>
      <FloatingDecor />

      <main style={{ flex: 1, padding: '40px', position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
        {/* 顶部标题栏 */}
        <header style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#F0E6E1', padding: '8px 20px', borderRadius: '20px', color: '#BC8F8F', fontSize: '14px', marginBottom: '15px' }}>
            <Palette size={16} /> 创意诊断实验室
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#4A4A4A' }}>
            Insight <span style={{ color: '#BC8F8F' }}>Engine</span> ✨
          </h1>
        </header>

        {/* 搜索框：带一点圆润的手感 */}
        <div style={{ 
          background: 'white', 
          borderRadius: '25px', 
          padding: '8px 12px', 
          display: 'flex', 
          alignItems: 'center', 
          boxShadow: '0 10px 25px rgba(188,143,143,0.08)',
          marginBottom: '30px',
          border: '2px solid #F3EAE3'
        }}>
          <div style={{ padding: '10px', color: '#BC8F8F' }}><LinkIcon size={20} /></div>
          <input 
            type="text" 
            placeholder="粘贴链接到这里..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, border: 'none', padding: '10px', fontSize: '15px', outline: 'none', background: 'transparent' }}
          />
          <button className="jelly-button" onClick={handleStartAnalysis} style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '18px', cursor: 'pointer', fontWeight: 'bold' }}>
            开始解析
          </button>
        </div>

        {/* 上传区域：可爱的大卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div 
            onClick={() => document.getElementById('file-upload')?.click()}
            style={{ 
              background: 'white', 
              borderRadius: '30px', 
              padding: '40px', 
              border: '3px dashed #EEDCDB',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s',
              position: 'relative'
            }}
          >
            <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>☁️</div>
            <h3 style={{ fontSize: '18px', color: '#BC8F8F', marginBottom: '8px' }}>上传文件</h3>
            <p style={{ fontSize: '13px', color: '#A98080' }}>{file ? `已选: ${file.name}` : '拖拽 Excel/PDF 到这里'}</p>
          </div>

          <div style={{ background: '#A9BA9D', borderRadius: '30px', padding: '30px', color: 'white', position: 'relative', overflow: 'hidden' }}>
            <MousePointer2 size={60} style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.2, transform: 'rotate(-15deg)' }} />
            <h4 style={{ fontSize: '18px', marginBottom: '12px' }}>温馨提示</h4>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.6' }}>
              系统会自动识别行业属性哦！无论是可爱的发饰还是精美的周边，AI 都能看懂。
            </p>
          </div>
        </div>

        {/* 结果展示 */}
        {reportData && (
          <div style={{ background: 'white', borderRadius: '35px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', animation: 'slideUp 0.5s ease-out' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#BC8F8F' }} />
              <h3 style={{ fontSize: '20px', margin: 0 }}>诊断结果已送达</h3>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={reportData.elements} dataKey="value" innerRadius={60} outerRadius={85} paddingAngle={8}>
                    {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.prices}>
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#A98080'}} />
                  <Bar dataKey="count" fill="#EEDCDB" radius={[10, 10, 10, 10]} barSize={25} />
                  <Tooltip cursor={{fill: '#FDFBF9'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#FDFBF9', borderRadius: '25px', color: '#666', fontSize: '14px', border: '1px solid #F3EAE3' }}>
              {reportData.summary}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        .float-1 { animation: float 4s infinite ease-in-out; }
        .float-2 { animation: float 5s infinite ease-in-out 1s; }
        .float-3 { animation: float 6s infinite ease-in-out 0.5s; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .jelly-button:active { transform: scale(0.95); }
        .jelly-button:hover { background-color: #A98080 ! competitiveness; }
      `}</style>
    </div>
  );
}