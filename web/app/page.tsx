'use client';

import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, Search, Sparkles, Coffee, Cloud, 
  FileBarChart, History as HistoryIcon, Settings, HelpCircle, PawPrint, Trash2
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

export default function IntegratedWorkstation() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  // 初始化时从 LocalStorage 读取历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('insight_history');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const handleStartAnalysis = async () => {
    if (!url && !file) return alert('小动物们需要素材才能分析哦~');
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, fileName: file?.name }),
      });
      const data = await response.json();
      
      setReportData(data);
      
      // 保存到历史记录
      const newRecord = { ...data, id: Date.now(), timestamp: new Date().toLocaleString(), target: url || file?.name };
      const updatedHistory = [newRecord, ...history];
      setHistory(updatedHistory);
      localStorage.setItem('insight_history', JSON.stringify(updatedHistory));
      
    } catch (error) {
      alert('分析遇到了点小麻烦，稍后再试吧');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearHistory = () => {
    if(confirm('确定要清空所有治愈记忆吗？')) {
      setHistory([]);
      localStorage.removeItem('insight_history');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', display: 'flex', color: '#5A5A5A', fontFamily: '"Noto Sans SC", sans-serif', overflow: 'hidden' }}>
      
      {/* --- 侧边栏 --- */}
      <aside style={{ width: '85px', backgroundColor: '#F0E6E1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: '1px solid #EEDCDB', zIndex: 10 }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: '#BC8F8F', borderRadius: '15px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          <FileBarChart size={24} onClick={() => setActiveTab('analyze')} style={{ cursor: 'pointer', color: activeTab === 'analyze' ? '#BC8F8F' : '#A98080', opacity: activeTab === 'analyze' ? 1 : 0.5 }} />
          <HistoryIcon size={24} onClick={() => setActiveTab('history')} style={{ cursor: 'pointer', color: activeTab === 'history' ? '#BC8F8F' : '#A98080', opacity: activeTab === 'history' ? 1 : 0.5 }} />
          <Settings size={24} onClick={() => setActiveTab('settings')} style={{ cursor: 'pointer', color: activeTab === 'settings' ? '#BC8F8F' : '#A98080', opacity: activeTab === 'settings' ? 1 : 0.5 }} />
        </nav>
      </aside>

      {/* --- 主体舞台区 --- */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: activeTab === 'analyze' ? 'center' : 'flex-start', position: 'relative', padding: '60px 20px', overflowY: 'auto' }}>
        
        {/* 背景水彩块保持 */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '400px', height: '400px', background: '#EEDCDB', filter: 'blur(100px)', opacity: 0.3, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '350px', height: '350px', background: '#E1E8EB', filter: 'blur(90px)', opacity: 0.4, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', width: '100%' }}>
          
          {activeTab === 'analyze' && (
            <div className="fade-in">
              <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ display: 'inline-flex', padding: '10px', backgroundColor: 'white', borderRadius: '15px', marginBottom: '20px' }}><Coffee size={24} color="#BC8F8F" /></div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>AI 深度诊断</h1>
              </header>

              <div style={{ background: 'white', borderRadius: '24px', padding: '10px 15px', display: 'flex', alignItems: 'center', border: '2px solid #F3EAE3', marginBottom: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <Search size={20} color="#BC8F8F" style={{ marginLeft: '10px' }} />
                <input type="text" placeholder="粘贴竞品链接..." value={url} onChange={(e) => setUrl(e.target.value)} style={{ flex: 1, border: 'none', padding: '15px 20px', outline: 'none', background: 'transparent' }} />
                <button onClick={handleStartAnalysis} disabled={isAnalyzing} style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '15px', cursor: 'pointer', fontWeight: '600' }}>
                  {isAnalyzing ? '分析中...' : '开始分析'}
                </button>
              </div>

              <div onClick={() => document.getElementById('file-upload')?.click()} style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', borderRadius: '28px', padding: '50px', border: '2px dashed #EEDCDB', textAlign: 'center', cursor: 'pointer', marginBottom: reportData ? '40px' : '0' }}>
                <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <Cloud size={32} color="#BC8F8F" style={{ margin: '0 auto 15px' }} />
                <h3 style={{ fontSize: '18px' }}>{file ? `已选: ${file.name}` : '上传销售数据文件'}</h3>
              </div>

              {reportData && (
                <div className="slide-up" style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.04)', marginTop: '30px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', height: '260px', marginBottom: '30px' }}>
                    <ResponsiveContainer><PieChart><Pie data={reportData.elements} innerRadius={55} outerRadius={75} paddingAngle={10} dataKey="value">{reportData.elements.map((_:any, i:number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
                    <ResponsiveContainer><BarChart data={reportData.prices}><XAxis dataKey="range" axisLine={false} tickLine={false} /><Bar dataKey="count" fill="#EEDCDB" radius={[8,8,8,8]} barSize={25} /><Tooltip /></BarChart></ResponsiveContainer>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: '#FDFBF9', borderRadius: '20px', fontSize: '14px', lineHeight: '1.8' }}>{reportData.summary}</div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '22px' }}>诊断历史</h2>
                <button onClick={clearHistory} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#A98080', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18}/> 清空历史</button>
              </div>
              {history.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>还没有历史记录哦~</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {history.map((item) => (
                    <div key={item.id} onClick={() => {setReportData(item); setActiveTab('analyze');}} style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #F3EAE3', cursor: 'pointer', transition: '0.2s' }} className="history-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <strong style={{ color: '#BC8F8F' }}>{item.target}</strong>
                        <span style={{ fontSize: '12px', color: '#AAA' }}>{item.timestamp}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style>{`
        .fade-in { animation: fadeIn 0.4s ease-out; }
        .slide-up { animation: slideUp 0.5s ease-out; }
        .history-card:hover { transform: translateX(10px); border-color: #BC8F8F; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}