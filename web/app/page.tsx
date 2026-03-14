'use client';

import React, { useState, useRef } from 'react';
import { 
  UploadCloud, Link as LinkIcon, Search, Sparkles, 
  FileBarChart, History, Settings, HelpCircle, ChevronRight
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

export default function AdvancedInsightEngine() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleStartAnalysis = async () => {
    if (!url && !file) return alert('请先输入链接或上传文件');
    setIsAnalyzing(true);
    // 模拟请求...
    setTimeout(() => {
      setReportData({
        elements: [{ name: '法式复古', value: 40 }, { name: '极简主义', value: 30 }, { name: '多巴胺', value: 30 }],
        prices: [{ range: '¥0-50', count: 12 }, { range: '¥50-100', count: 28 }, { range: '¥100+', count: 8 }],
        summary: "分析结果：当前品类呈现明显的“情感化”趋势。高客单价产品主要集中在具备特定风格标签的单品中。"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F7F3F0', 
      display: 'flex',
      color: '#4A4A4A',
      fontFamily: 'Inter, "Noto Sans SC", sans-serif' 
    }}>
      {/* --- 左侧精致导航装饰栏 --- */}
      <aside style={{ 
        width: '80px', 
        backgroundColor: '#F0E6E1', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '30px 0',
        borderRight: '1px solid #EEDCDB'
      }}>
        <div style={{ width: '40px', height: '40px', backgroundColor: '#BC8F8F', borderRadius: '12px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Sparkles size={20} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '25px', color: '#A98080' }}>
          <FileBarChart size={22} style={{ cursor: 'pointer' }} />
          <History size={22} style={{ cursor: 'pointer', opacity: 0.5 }} />
          <Settings size={22} style={{ cursor: 'pointer', opacity: 0.5 }} />
          <HelpCircle size={22} style={{ cursor: 'pointer', opacity: 0.5 }} />
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px', position: 'relative', overflowY: 'auto' }}>
        {/* 背景动态水彩球 */}
        <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, #EEDCDB 0%, rgba(238,220,219,0) 70%)', filter: 'blur(80px)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '1px' }}>数据洞察工作台</h1>
            <p style={{ color: '#8E8E8E', fontSize: '14px' }}>INSIGHT ENGINE PRO / 行业趋势深度解析</p>
          </header>

          {/* --- 搜索框区域 (上) --- */}
          <div style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '10px 15px', 
            display: 'flex', 
            alignItems: 'center', 
            boxShadow: '0 10px 30px rgba(188,143,143,0.1)',
            marginBottom: '25px',
            border: '1px solid rgba(238,220,219,0.5)'
          }}>
            <Search size={20} style={{ color: '#BC8F8F', marginLeft: '10px' }} />
            <input 
              type="text" 
              placeholder="粘贴竞品店铺或产品链接进行 AI 抓取..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, border: 'none', padding: '15px 20px', fontSize: '16px', outline: 'none', color: '#4A4A4A' }}
            />
            <button onClick={handleStartAnalysis} style={{ backgroundColor: '#BC8F8F', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              分析链接 <ChevronRight size={16} />
            </button>
          </div>

          {/* --- 文件上传区域 (下) --- */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '25px', marginBottom: '40px' }}>
            <div 
              onClick={() => document.getElementById('file-upload')?.click()}
              style={{ 
                background: 'rgba(255,255,255,0.6)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '24px', 
                padding: '40px', 
                border: '2px dashed #EEDCDB',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div style={{ width: '60px', height: '60px', backgroundColor: '#FDFBF9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#BC8F8F' }}>
                <UploadCloud size={30} />
              </div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>本地文件诊断</h3>
              <p style={{ color: '#8E8E8E', fontSize: '14px' }}>{file ? `已选: ${file.name}` : '拖拽或点击上传销售报表 (Excel/PDF)'}</p>
            </div>

            <div style={{ background: '#BC8F8F', borderRadius: '24px', padding: '30px', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '20px', marginBottom: '15px' }}>智能模式已开启</h4>
              <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.6' }}>
                系统将自动根据文件内容识别行业属性（如：发饰风格占比、IP衍生品种类）。
              </p>
              <div style={{ marginTop: '20px', fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '10px' }}>
                当前引擎: Gemini 1.5 Flash 
              </div>
            </div>
          </div>

          {/* --- 结果展示区 (分析后显示) --- */}
          {reportData && (
            <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', animation: 'fadeInUp 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h3 style={{ borderLeft: '4px solid #BC8F8F', paddingLeft: '15px' }}>行业属性深度分析</h3>
                <div style={{ color: '#BC8F8F', display: 'flex', gap: '15px', fontSize: '14px' }}>
                  <span>风格占比</span><span>|</span><span>价格区间</span>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={reportData.elements} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.prices}>
                    <XAxis dataKey="range" axisLine={false} tickLine={false} fontSize={12} />
                    <Bar dataKey="count" fill="#A9BA9D" radius={[6, 6, 0, 0]} barSize={30} />
                    <Tooltip />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ marginTop: '40px', padding: '25px', backgroundColor: '#FDFBF9', borderRadius: '20px', color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                <p>{reportData.summary}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}