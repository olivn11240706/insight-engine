'use client';

import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, Search, Coffee, Cloud, 
  FileBarChart, History, Settings, PawPrint, 
  TrendingUp, DollarSign, Target, Award, Home
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// 定义治愈系低饱和配色
const THEME_COLORS = ['#EEDCDB', '#E1E8EB', '#F9F3D9', '#E3EDD3', '#DCD3EE'];
const CHART_COLORS = ['#BC8F8F', '#8FA9BC', '#A9BA9D', '#BCA48F', '#9B8FBC'];

export default function AestheticReportPlatform() {
  const [activeTab, setActiveTab] = useState('home'); // home, report, history, settings
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // 模拟 AI 分析过程
  const handleStartAnalysis = async () => {
    if (!file) {
      document.getElementById('file-upload')?.click();
      return;
    }
    setIsAnalyzing(true);
    
    // 模拟 2 秒的清洗与分析时间
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setReportData({
      mainMetrics: [
        { label: '商品总数', value: '2,595', unit: '件', icon: <Target size={18}/> },
        { label: '月销量估算', value: '722.8', unit: '万单', icon: <TrendingUp size={18}/> },
        { label: '核心均价', value: '¥22.5', unit: '', icon: <DollarSign size={18}/> }
      ],
      elements: [
        { name: '发夹类', value: 62 },
        { name: '蝴蝶结', value: 21 },
        { name: '鲨鱼夹', value: 11 },
        { name: '新中式', value: 6 }
      ],
      insights: [
        "市场集中度高：TOP 10店铺占据近40%销量，金华产地占主导。",
        "风格演变：发夹类是刚需（62%），但新中式溢价空间最高。",
        "效率优先：LACELIPS等店铺商品数虽少，但单品爆破效率极高。"
      ]
    });
    setIsAnalyzing(false);
    setActiveTab('report'); // 自动跳转到报告页
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', display: 'flex', color: '#5A5A5A', fontFamily: '"Noto Sans SC", sans-serif', overflow: 'hidden' }}>
      
      {/* --- 1. 专业侧边栏 --- */}
      <aside style={{ width: '85px', backgroundColor: '#F0E6E1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: '1px solid #EEDCDB', zIndex: 10 }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: '#BC8F8F', borderRadius: '15px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: '#A98080' }}>
          <Home size={24} onClick={() => setActiveTab('home')} style={{ cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.4 }} />
          <FileBarChart size={24} onClick={() => setActiveTab('report')} style={{ cursor: 'pointer', opacity: activeTab === 'report' ? 1 : 0.4 }} />
          <History size={24} onClick={() => setActiveTab('history')} style={{ cursor: 'pointer', opacity: activeTab === 'history' ? 1 : 0.4 }} />
          <Settings size={24} onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer', opacity: activeTab === 'settings' ? 1 : 0.4 }} />
        </nav>
      </aside>

      {/* --- 主内容区 --- */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        
        {/* 清新水彩背景装饰 */}
        <div style={{ position: 'absolute', top: '5%', right: '10%', width: '400px', height: '400px', background: '#EEDCDB', filter: 'blur(100px)', opacity: 0.4, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '350px', height: '350px', background: '#E1E8EB', filter: 'blur(90px)', opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '40%', left: '15%', width: '300px', height: '300px', background: '#F9F3D9', filter: 'blur(80px)', opacity: 0.3, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px' }}>
          
          {/* --- 场景 A: 首页 (居中上传卡片) --- */}
          {activeTab === 'home' && (
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#4A4A4A' }}>市场数据深度分析</h1>
                <p style={{ color: '#8E8E8E', marginTop: '10px' }}>生成 PDF 风格的专业诊断报告</p>
              </header>

              {/* 中央上传卡片 */}
              <div style={{ 
                background: 'rgba(255,255,255,0.7)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '32px', 
                padding: '60px 40px', 
                border: '2px dashed #EEDCDB',
                boxShadow: '0 20px 50px rgba(188,143,143,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}>
                <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div style={{ width: '80px', height: '80px', backgroundColor: '#FDFBF9', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#BC8F8F', marginBottom: '20px' }}>
                  <Cloud size={40} />
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
                  {file ? `已选: ${file.name}` : '点击下方按钮上传素材'}
                </h3>
                <p style={{ color: '#A98080', fontSize: '14px', marginBottom: '40px' }}>支持 .pdf, .xlsx, .csv 格式的市场数据</p>
                
                <button 
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  style={{ 
                    backgroundColor: '#BC8F8F', 
                    color: 'white', 
                    border: 'none', 
                    padding: '16px 50px', 
                    borderRadius: '20px', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(188,143,143,0.3)',
                    transition: '0.3s'
                  }}
                >
                  {isAnalyzing ? '正在清洗数据并生成研报...' : (file ? '开始分析' : '上传文件')}
                </button>
              </div>
            </div>
          )}

          {/* --- 场景 B: 分析完成页 (仿 PDF 研报风格) --- */}
          {activeTab === 'report' && reportData && (
            <div className="slide-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '24px', color: '#BC8F8F' }}>CHAPTER 01: 市场概览</h2>
                <button onClick={() => setActiveTab('home')} style={{ color: '#8E8E8E', background: 'none', border: 'none', cursor: 'pointer' }}>重新分析</button>
              </div>

              {/* 1. 核心数据看板 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {reportData.mainMetrics.map((m: any, i: number) => (
                  <div key={i} style={{ background: 'white', padding: '30px', borderRadius: '24px', border: '1px solid #F3EAE3', textAlign: 'center' }}>
                    <div style={{ color: '#BC8F8F', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>{m.icon}</div>
                    <div style={{ fontSize: '12px', color: '#8E8E8E' }}>{m.label}</div>
                    <div style={{ fontSize: '26px', fontWeight: 'bold' }}>{m.value}<span style={{ fontSize: '14px' }}>{m.unit}</span></div>
                  </div>
                ))}
              </div>

              {/* 2. 深度分析页 (左右布局) */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '50px', border: '1px solid #F3EAE3', boxShadow: '0 20px 60px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={reportData.elements} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">
                          {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px', borderLeft: '4px solid #BC8F8F', paddingLeft: '15px' }}>STYLE TRENDS</h4>
                    {reportData.elements.map((el: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #FDFBF9' }}>
                        <span>{el.name}</span>
                        <span style={{ fontWeight: 'bold' }}>{el.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #F3EAE3' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={18} color="#BC8F8F"/> 核心数据洞察
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {reportData.insights.map((text: string, i: number) => (
                      <p key={i} style={{ fontSize: '14px', lineHeight: '1.8', color: '#666' }}>• {text}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 场景 C & D (历史与设置) */}
          {(activeTab === 'history' || activeTab === 'settings') && (
            <div className="fade-in" style={{ textAlign: 'center', padding: '100px' }}>
              <div style={{ opacity: 0.3 }}>
                <Cloud size={48} style={{ margin: '0 auto' }} />
                <p style={{ marginTop: '20px' }}>功能正在接入中，敬请期待...</p>
              </div>
            </div>
          )}

        </div>
      </main>

      <style>{`
        .fade-in { animation: fadeIn 0.6s ease-out; }
        .slide-up { animation: slideUp 0.7s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { transform: translateY(-2px); opacity: 0.9; }
        button:active { transform: translateY(0); }
      `}</style>
    </div>
  );
}