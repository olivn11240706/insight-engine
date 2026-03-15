'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, Link as LinkIcon, Search, Sparkles, 
  FileBarChart, History, Settings, HelpCircle, ChevronRight,
  PawPrint, Coffee, Cloud
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

// --- 萌系小动物组件 ---
const AnimalFriends = () => (
  <div style={{ position: 'fixed', bottom: 0, left: '100px', right: '40px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', pointerEvents: 'none', zIndex: 10 }}>
    {/* 小猫 */}
    <div className="animal" style={{ fontSize: '40px', marginBottom: '-5px' }}>🐱</div>
    {/* 小企鹅 */}
    <div className="animal-slow" style={{ fontSize: '35px', marginBottom: '-2px' }}>🐧</div>
    {/* 小狗 */}
    <div className="animal" style={{ fontSize: '42px', marginBottom: '-8px' }}>🐶</div>
    {/* 小兔子 */}
    <div className="animal-delay" style={{ fontSize: '38px', marginBottom: '-4px' }}>🐰</div>
  </div>
);

export default function CozyProfessionalEngine() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartAnalysis = async () => {
    if (!url && !file) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setReportData({
        elements: [{ name: '温柔粉蓝', value: 40 }, { name: '治愈草木', value: 35 }, { name: '暖阳黄', value: 25 }],
        prices: [{ range: '¥0-50', count: 15 }, { range: '¥50-100', count: 30 }, { range: '¥100+', count: 12 }],
        summary: "分析结果：该品类非常适合“情感化营销”。建议在包装中使用低饱和度的配色方案，以提升品牌的温馨感和亲和力。"
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#FDFBF9', 
      display: 'flex',
      color: '#5A5A5A',
      fontFamily: '"Noto Sans SC", sans-serif',
      overflow: 'hidden'
    }}>
      {/* 侧边栏恢复 */}
      <aside style={{ 
        width: '85px', 
        backgroundColor: '#F0E6E1', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '30px 0',
        borderRight: '1px solid #EEDCDB',
        zIndex: 2
      }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: '#BC8F8F', borderRadius: '15px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 10px rgba(188,143,143,0.3)' }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: '#A98080' }}>
          <FileBarChart size={24} style={{ cursor: 'pointer' }} />
          <History size={24} style={{ cursor: 'pointer', opacity: 0.5 }} />
          <Settings size={24} style={{ cursor: 'pointer', opacity: 0.5 }} />
          <HelpCircle size={24} style={{ cursor: 'pointer', opacity: 0.5 }} />
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px', position: 'relative', overflowY: 'auto' }}>
        {/* 四色温馨背景水彩块 */}
        <div style={{ position: 'absolute', top: '5%', right: '10%', width: '300px', height: '300px', background: '#EEDCDB', filter: 'blur(80px)', opacity: 0.4, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '250px', height: '250px', background: '#E1E8EB', filter: 'blur(70px)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '40%', left: '20%', width: '200px', height: '200px', background: '#F9F3D9', filter: 'blur(60px)', opacity: 0.3, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '220px', height: '220px', background: '#E3EDD3', filter: 'blur(75px)', opacity: 0.4, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
          <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '12px' }}><Coffee size={20} color="#BC8F8F" /></div>
            <div>
              <h1 style={{ fontSize: '26px', fontWeight: 'bold', letterSpacing: '0.5px', color: '#4A4A4A', margin: 0 }}>Insight Engine <span style={{ fontWeight: '300', fontSize: '18px', color: '#8E8E8E' }}>/ 萌系工作台</span></h1>
            </div>
          </header>

          {/* 搜索框 (上) */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '10px 15px', 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            marginBottom: '25px',
            border: '2px solid #F3EAE3'
          }}>
            <Search size={20} style={{ color: '#BC8F8F', marginLeft: '10px' }} />
            <input 
              type="text" 
              placeholder="粘贴链接，让 AI 帮你悄悄观察..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '15px 20px', fontSize: '15px', outline: 'none', background: 'transparent' }}
            />
            <button onClick={handleStartAnalysis} style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '15px', cursor: 'pointer', fontWeight: '600', transition: '0.3s' }}>
              分析一下
            </button>
          </div>

          {/* 上传区域 (下) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '25px', marginBottom: '40px' }}>
            <div 
              onClick={() => document.getElementById('file-upload')?.click()}
              style={{ 
                background: 'rgba(255,255,255,0.7)', 
                backdropFilter: 'blur(5px)',
                borderRadius: '24px', 
                padding: '40px', 
                border: '2px dashed #EEDCDB',
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.3s'
              }}
            >
              <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div style={{ fontSize: '35px', marginBottom: '15px' }}><Cloud color="#BC8F8F" style={{ margin: '0 auto' }} /></div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#BC8F8F' }}>上传本地文件</h3>
              <p style={{ color: '#A98080', fontSize: '13px' }}>{file ? `已选: ${file.name}` : '把报表丢给小动物们分析'}</p>
            </div>

            <div style={{ background: '#A9BA9D', borderRadius: '24px', padding: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 20px rgba(169,186,157,0.2)' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>智能实验室 ✨</h4>
              <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.6' }}>
                我会帮你从杂乱的数据中找到共性，不管是发饰的风格还是价格的秘密。
              </p>
            </div>
          </div>

          {/* 结果展示 */}
          {reportData && (
            <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: '0 15px 40px rgba(0,0,0,0.04)', animation: 'popIn 0.5s ease' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '30px', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#BC8F8F', borderRadius: '2px' }} /> 深度诊断洞察
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={reportData.elements} dataKey="value" nameKey="name" innerRadius={55} outerRadius={75} paddingAngle={10}>
                      {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.prices}>
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: '#A98080', fontSize: 12}} />
                    <Bar dataKey="count" fill="#EEDCDB" radius={[8, 8, 8, 8]} barSize={25} />
                    <Tooltip cursor={{fill: '#FDFBF9'}} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FDFBF9', borderRadius: '20px', color: '#666', fontSize: '14px', lineHeight: '1.7', border: '1px solid #F3EAE3' }}>
                {reportData.summary}
              </div>
            </div>
          )}
        </div>
      </main>

      <AnimalFriends />

      <style>{`
        @keyframes animalFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animal { animation: animalFloat 3s infinite ease-in-out; }
        .animal-slow { animation: animalFloat 4s infinite ease-in-out 0.5s; }
        .animal-delay { animation: animalFloat 3.5s infinite ease-in-out 1.2s; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}