'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, Link as LinkIcon, Search, Sparkles, 
  FileBarChart, History, Settings, HelpCircle, ChevronRight,
  PawPrint, Coffee, Cloud, Gift
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

// --- 萌系互动特区组件 (超级放大+多重互动) ---
const AnimalInteractionZone = () => (
  <div style={{ position: 'fixed', bottom: 0, left: '100px', right: '40px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', pointerEvents: 'none', zIndex: 10, paddingBottom: '10px' }}>
    {/* 小猫：探头互动 */}
    <div className="interactive-animal cat" style={{ fontSize: '80px', cursor: 'pointer', pointerEvents: 'auto', transformOrigin: 'bottom center' }}>🐱</div>
    {/* 小企鹅：害羞摇晃 */}
    <div className="interactive-animal penguin" style={{ fontSize: '70px', cursor: 'pointer', pointerEvents: 'auto', marginBottom: '5px' }}>🐧</div>
    {/* 小狗：开心摇尾 (旋转) */}
    <div className="interactive-animal dog" style={{ fontSize: '82px', cursor: 'pointer', pointerEvents: 'auto', marginBottom: '-5px' }}>🐶</div>
    {/* 小兔子：耳朵动弹 */}
    <div className="interactive-animal rabbit" style={{ fontSize: '75px', cursor: 'pointer', pointerEvents: 'auto', marginBottom: '-2px' }}>🐰</div>
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
    // 模拟数据...
    setTimeout(() => {
      setReportData({
        elements: [{ name: '温柔粉蓝', value: 40 }, { name: '治愈草木', value: 35 }, { name: '暖阳黄', value: 25 }],
        prices: [{ range: '¥0-50', count: 15 }, { range: '¥50-100', count: 30 }, { range: '¥100+', count: 12 }],
        summary: "分析报告：基于上传数据，我们发现“情感化营销”是核心共性。建议在产品设计中引入圆润、Q弹的视觉元素，并通过增加“互动惊喜”来提升亲和力。"
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', display: 'flex', color: '#5A5A5A', fontFamily: '"Noto Sans SC", sans-serif', overflow: 'hidden' }}>
      {/* 侧边栏保持不变 */}
      <aside style={{ width: '85px', backgroundColor: '#F0E6E1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: '1px solid #EEDCDB', zIndex: 2 }}>
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
        {/* 温馨四色水彩块 (微调位置以增加环抱感) */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '280px', height: '280px', background: '#EEDCDB', filter: 'blur(75px)', opacity: 0.35 }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '8%', width: '230px', height: '230px', background: '#E1E8EB', filter: 'blur(65px)', opacity: 0.45 }} />
        <div style={{ position: 'absolute', top: '45%', left: '25%', width: '190px', height: '190px', background: '#F9F3D9', filter: 'blur(55px)', opacity: 0.25 }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '25%', width: '210px', height: '210px', background: '#E3EDD3', filter: 'blur(70px)', opacity: 0.35 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', paddingBottom: '120px' }}>
          <header style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ padding: '8px', backgroundColor: 'white', borderRadius: '12px' }}><Coffee size={20} color="#BC8F8F" /></div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#4A4A4A', margin: 0 }}>Insight Engine <span style={{ fontWeight: '300', fontSize: '18px', color: '#8E8E8E' }}>/ 治愈互动特区</span></h1>
          </header>

          {/* 搜索框 (上) */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '10px 15px', display: 'flex', alignItems: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', marginBottom: '25px', border: '2px solid #F3EAE3' }}>
            <Search size={20} style={{ color: '#BC8F8F', marginLeft: '10px' }} />
            <input 
              type="text" 
              placeholder="粘贴链接，小动物们都在看着你哦..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '15px 20px', fontSize: '15px', outline: 'none', background: 'transparent' }}
            />
            <button onClick={handleStartAnalysis} className="jelly-button" style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '15px', cursor: 'pointer', fontWeight: '600' }}>
              分析一下
            </button>
          </div>

          {/* 上传区域 (下) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '25px', marginBottom: '40px' }}>
            <div onClick={() => document.getElementById('file-upload')?.click()} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(5px)', borderRadius: '24px', padding: '40px', border: '2px dashed #EEDCDB', textAlign: 'center', cursor: 'pointer' }}>
              <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div style={{ fontSize: '35px', marginBottom: '15px' }}><Cloud color="#BC8F8F" style={{ margin: '0 auto' }} /></div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#BC8F8F' }}>上传本地文件</h3>
              <p style={{ color: '#A98080', fontSize: '13px' }}>{file ? `已选: ${file.name}` : '把报表丢给小动物们分析'}</p>
            </div>
            <div style={{ background: '#A9BA9D', borderRadius: '24px', padding: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>智能实验室 ✨</h4>
              <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.6' }}>我会帮你从杂乱的数据中找到共性，不管是发饰的风格还是价格的秘密。</p>
            </div>
          </div>

          {/* 结果展示与图表设计保持治愈感 */}
          {reportData && (
            <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: '0 15px 40px rgba(0,0,0,0.03)', animation: 'popIn 0.5s ease' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '30px', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '18px', backgroundColor: '#BC8F8F', borderRadius: '2px' }} /> 深度诊断洞察
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={reportData.elements} innerRadius={55} outerRadius={75} paddingAngle={10} dataKey="value">
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
              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FDFBF9', borderRadius: '20px', color: '#666', fontSize: '14px', border: '1px solid #F3EAE3' }}>
                {reportData.summary}
              </div>
            </div>
          )}
        </div>
      </main>

      <AnimalInteractionZone />

      {/* 核心互动动画 CSS */}
      <style>{`
        /* 1. 小猫互动：探头 */
        .interactive-animal.cat:hover {
          animation: peekaboo 1s forwards;
        }
        @keyframes peekaboo {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(-5px) rotate(0); }
        }

        /* 2. 小企鹅互动：害羞摇晃 */
        .interactive-animal.penguin:hover {
          animation: shyShake 1.5s forwards ease-in-out;
        }
        @keyframes shyShake {
          0% { transform: rotate(0); }
          30% { transform: rotate(-15deg); }
          60% { transform: rotate(10deg); }
          100% { transform: rotate(0); }
        }

        /* 3. 小狗互动：开心摇尾 (Q弹旋转) */
        .interactive-animal.dog:hover {
          animation: happyWag 0.8s forwards;
        }
        @keyframes happyWag {
          0% { transform: scale(1) rotate(0); }
          50% { transform: scale(1.1) rotate(15deg); }
          100% { transform: scale(1) rotate(0); }
        }

        /* 4. 小兔子互动：耳朵动弹 (上下Q弹) */
        .interactive-animal.rabbit:hover {
          animation: earWiggle 1.2s forwards ease-out;
        }
        @keyframes earWiggle {
          0% { transform: scaleY(1); }
          40% { transform: scaleY(0.9) translateY(10px); }
          100% { transform: scaleY(1) translateY(0); }
        }

        /* 通用呼吸动画 (差异化时间错开) */
        .interactive-animal { animation: breathe 4s infinite ease-in-out; }
        .interactive-animal.penguin { animation: breathe 5s infinite ease-in-out 0.5s; }
        .interactive-animal.dog { animation: breathe 4.5s infinite ease-in-out 1.2s; }
        .interactive-animal.rabbit { animation: breathe 4.2s infinite ease-in-out 0.8s; }
        
        @keyframes breathe { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .jelly-button:active { transform: scale(0.95); }
      `}</style>
    </div>
  );
}