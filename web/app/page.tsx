'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, Search, Coffee, Cloud, 
  FileBarChart, History, Settings, PawPrint, 
  TrendingUp, DollarSign, Target, Award, Home
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

/** * --- 核心清调色盘 (低饱和蓝绿黄粉) ---
 * 蓝: #A4C8E1 | 绿: #B8E1C4 | 黄: #F9E8A4 | 粉: #E1A4C8
 */
const THEME_CHART_COLORS = ['#A4C8E1', '#B8E1C4', '#F9E8A4', '#E1A4C8', '#D4E1A4'];

export default function FreshAestheticPlatform() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartAnalysis = async () => {
    if (!file) {
      document.getElementById('file-upload')?.click();
      return;
    }
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setReportData({
      mainMetrics: [
        { label: '商品总数', value: '2,595', unit: '件', icon: <Target size={18}/>, color: '#A4C8E1' },
        { label: '月销量估算', value: '722.8', unit: '万单', icon: <TrendingUp size={18}/>, color: '#B8E1C4' },
        { label: '核心均价', value: '¥22.5', unit: '', icon: <DollarSign size={18}/>, color: '#F9E8A4' }
      ],
      elements: [
        { name: '发夹类', value: 62 },
        { name: '蝴蝶结', value: 21 },
        { name: '鲨鱼夹', value: 11 },
        { name: '新中式', value: 6 }
      ],
      insights: [
        "市场集中度高：TOP 10店铺占据近40%销量，蓝海品类尚存机会。",
        "风格演变：发夹类是刚需，但清新的薄荷绿系配色正在崛起。",
        "效率优先：单品爆破效率是目前高溢价店铺的核心逻辑。"
      ]
    });
    setIsAnalyzing(false);
    setActiveTab('report');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F7FBFC', // 极淡的冰蓝色背景
      display: 'flex', 
      color: '#4A5568', 
      fontFamily: '"Noto Sans SC", sans-serif', 
      overflow: 'hidden' 
    }}>
      
      {/* --- 1. 清新侧边栏 (薄荷绿底色) --- */}
      <aside style={{ 
        width: '85px', 
        backgroundColor: '#E6F4F1', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '30px 0', 
        borderRight: '1px solid #D1E9E2', 
        zIndex: 10 
      }}>
        <div style={{ 
          width: '45px', 
          height: '45px', 
          backgroundColor: '#A4C8E1', // 品牌色切换为蓝色
          borderRadius: '16px', 
          marginBottom: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'white',
          boxShadow: '0 4px 12px rgba(164,200,225,0.4)'
        }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: '#7FB2A8' }}>
          <Home size={24} onClick={() => setActiveTab('home')} style={{ cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.4 }} />
          <FileBarChart size={24} onClick={() => setActiveTab('report')} style={{ cursor: 'pointer', opacity: activeTab === 'report' ? 1 : 0.4 }} />
          <History size={24} onClick={() => setActiveTab('history')} style={{ cursor: 'pointer', opacity: activeTab === 'history' ? 1 : 0.4 }} />
          <Settings size={24} onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer', opacity: activeTab === 'settings' ? 1 : 0.4 }} />
        </nav>
      </aside>

      {/* --- 主内容区 --- */}
      <main style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        
        {/* --- 动态水彩背景层 (蓝绿黄粉) --- */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '450px', height: '450px', background: '#A4C8E1', filter: 'blur(120px)', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '400px', height: '400px', background: '#B8E1C4', filter: 'blur(100px)', opacity: 0.25, zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '35%', left: '5%', width: '300px', height: '300px', background: '#F9E8A4', filter: 'blur(90px)', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '5%', width: '300px', height: '300px', background: '#E1A4C8', filter: 'blur(100px)', opacity: 0.15, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px' }}>
          
          {/* --- 首页: 居中卡片 --- */}
          {activeTab === 'home' && (
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#2D3748', letterSpacing: '-0.5px' }}>Insight Engine</h1>
                <p style={{ color: '#718096', marginTop: '8px' }}>让数据分析充满人文温度</p>
              </header>

              <div style={{ 
                background: 'rgba(255, 255, 255, 0.6)', 
                backdropFilter: 'blur(15px)',
                borderRadius: '32px', 
                padding: '65px 45px', 
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 25px 50px -12px rgba(164, 200, 225, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div style={{ 
                  width: '80px', height: '80px', 
                  background: 'linear-gradient(135deg, #E6F4F1 0%, #F7FBFC 100%)', 
                  borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7FB2A8', marginBottom: '25px' 
                }}>
                  <UploadCloud size={38} />
                </div>
                <h3 style={{ fontSize: '20px', color: '#4A5568', marginBottom: '12px' }}>
                  {file ? `准备好分析: ${file.name}` : '上传您的市场原始数据'}
                </h3>
                <p style={{ color: '#A0AEC0', fontSize: '14px', marginBottom: '45px' }}>点击下方按钮即可自动关联本地文件夹</p>
                
                <button 
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  style={{ 
                    background: 'linear-gradient(135deg, #A4C8E1 0%, #B8E1C4 100%)', 
                    color: 'white', border: 'none', padding: '18px 65px', borderRadius: '22px', fontSize: '16px', fontWeight: '600',
                    cursor: 'pointer', boxShadow: '0 12px 24px rgba(164,200,225,0.3)', transition: '0.4s'
                  }}
                >
                  {isAnalyzing ? '正在为您清洗研报...' : (file ? '开始深度分析' : '上传并启动')}
                </button>
              </div>
            </div>
          )}

          {/* --- 报告页: 清新研报风格 --- */}
          {activeTab === 'report' && reportData && (
            <div className="slide-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '35px', paddingBottom: '15px', borderBottom: '1px solid #E2E8F0' }}>
                <div>
                  <h2 style={{ fontSize: '22px', color: '#2D3748', fontWeight: '800' }}>CHAPTER 01: 市场全景图</h2>
                  <p style={{ color: '#A0AEC0', fontSize: '13px', marginTop: '4px' }}>Market Data Visualization Report</p>
                </div>
                <button onClick={() => setActiveTab('home')} style={{ color: '#A4C8E1', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>返回上传</button>
              </div>

              {/* 指标卡片 (蓝绿黄配色) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {reportData.mainMetrics.map((m: any, i: number) => (
                  <div key={i} style={{ background: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', textAlign: 'center', borderBottom: `4px solid ${m.color}` }}>
                    <div style={{ color: m.color, marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{m.icon}</div>
                    <div style={{ fontSize: '12px', color: '#718096', textTransform: 'uppercase', letterSpacing: '1px' }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#2D3748', marginTop: '4px' }}>{m.value}<span style={{ fontSize: '14px', fontWeight: '400' }}>{m.unit}</span></div>
                  </div>
                ))}
              </div>

              {/* 研报主体 */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center' }}>
                  <div style={{ height: '350px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={reportData.elements} innerRadius={85} outerRadius={125} paddingAngle={6} dataKey="value">
                          {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={THEME_CHART_COLORS[i % THEME_CHART_COLORS.length]} stroke="none" />)}
                        </Pie>
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '10px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px', color: '#A4C8E1' }}>主流风格分析</h4>
                    {reportData.elements.map((el: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #EDF2F7' }}>
                        <span style={{ fontSize: '15px' }}>{el.name}</span>
                        <span style={{ fontWeight: '800', color: THEME_CHART_COLORS[i] }}>{el.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '50px', paddingTop: '40px', borderTop: '2px dashed #EDF2F7' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#B8E1C4' }}>
                    <Award size={18}/> DATA INSIGHTS
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    {reportData.insights.map((text: string, i: number) => (
                      <div key={i} style={{ fontSize: '14px', lineHeight: '1.8', color: '#4A5568', background: '#F7FBFC', padding: '15px', borderRadius: '16px' }}>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <style>{`
        .fade-in { animation: fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        .slide-up { animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(164,200,225,0.4); }
        button:active { transform: translateY(-1px); }
      `}</style>
    </div>
  );
}