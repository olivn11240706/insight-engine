'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { UploadCloud, Link, BrainCircuit, FileText, BarChart3, Download } from 'lucide-react';

// --- 结果展示弹窗组件 (优化版，带有导出图标) ---
const ResultModal: React.FC<{ content: string; onClose: () => void }> = ({ content, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
    <div style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px', maxWidth: '800px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', position: 'relative', border: '1px solid #F3EAE3' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#BC8F8F' }}>×</button>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #F8F9FA', paddingBottom: '15px' }}>
        <h2 style={{ color: '#BC8F8F', margin: 0, fontSize: '22px' }}>AI 深度诊断报告</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', backgroundColor: 'white', color: '#BC8F8F', borderRadius: '8px', border: '1px solid #EEDCDB', cursor: 'pointer', fontSize: '13px' }}>
          <Download size={14} /> 导出 PDF
        </button>
      </div>
      <div style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap', fontSize: '15px' }}>
        {content}
      </div>
    </div>
  </div>
);

// --- 莫兰迪水彩风主页面 ---
export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'url' | 'file'>('url');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const formData = new FormData();
      if (activeTab === 'file' && selectedFile) {
        formData.append('file', selectedFile);
      }
      const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.result) setAnalysisResult(data.result);
      else alert('诊断遇到波折，请重试');
    } catch (e) {
      alert('网络连接错误');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 通用输入框样式
  const inputStyle = {
    width: '100%',
    padding: '18px',
    borderRadius: '16px',
    border: '1px solid #EEDCDB',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    fontSize: '15px',
    color: '#4A4A4A',
    outline: 'none',
    transition: 'all 0.3s'
  };

  return (
    <>
      <Head>
        <title>Insight Engine | 莫兰迪水彩风诊断面板</title>
      </Head>

      <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', padding: '40px', fontFamily: '"Noto Sans SC", sans-serif', position: 'relative' }}>
        {/* 背景水彩晕染装饰 (CSS 绘制) */}
        <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '40%', height: '50%', background: 'radial-gradient(circle, #EEDCDB 0%, rgba(238,220,219,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
        <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '30%', height: '40%', background: 'radial-gradient(circle, #E1E8EB 0%, rgba(225,232,235,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />

        {analysisResult && <ResultModal content={analysisResult} onClose={() => setAnalysisResult(null)} />}

        <main style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <header style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeInDown 1s' }}>
            <h1 style={{ fontSize: '32px', color: '#4A4A4A', fontWeight: '300', letterSpacing: '2px' }}>
              INSIGHT <span style={{ color: '#BC8F8F', fontWeight: '600' }}>ENGINE</span>
            </h1>
            <p style={{ color: '#8E8E8E', marginTop: '10px' }}>让数据拥有温度，让品牌更懂人心</p>
          </header>

          <section style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.5)', transition: 'transform 0.3s' }}>
            {/* 模拟加载遮罩 */}
            {isAnalyzing && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.85)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '30px', transition: '0.5s' }}>
                <BrainCircuit size={40} className="breathe" style={{ color: '#BC8F8F' }} />
                <p style={{ color: '#BC8F8F', marginTop: '15px', fontWeight: '500' }}>正在解析数据共性...</p>
              </div>
            )}

            {/* 选项卡导航 */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'center' }}>
              <button onClick={() => setActiveTab('url')} style={{ padding: '10px 25px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'url' ? '#BC8F8F' : 'transparent', color: activeTab === 'url' ? 'white' : '#8E8E8E', transition: '0.3s' }}>
                <Link size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 粘贴链接
              </button>
              <button onClick={() => setActiveTab('file')} style={{ padding: '10px 25px', borderRadius: '12px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'file' ? '#BC8F8F' : 'transparent', color: activeTab === 'file' ? 'white' : '#8E8E8E', transition: '0.3s' }}>
                <UploadCloud size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 上传文件
              </button>
            </div>

            {/* 输入内容区 */}
            {activeTab === 'url' ? (
              <input type="text" placeholder="输入竞品链接，AI将自动抓取..." style={inputStyle} />
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ ...inputStyle, border: '2px dashed #EEDCDB', textAlign: 'center', cursor: 'pointer', color: '#8E8E8E', padding: '40px 20px' }}
              >
                <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} style={{ display: 'none' }} />
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>🎨</div>
                <p>{selectedFile ? `已选文件: ${selectedFile.name}` : '上传分析文件 (Excel/PDF)'}</p>
                <p style={{ fontSize: '12px', marginTop: '5px' }}>支持莫兰迪风格的数据报告</p>
              </div>
            )}

            <button 
              onClick={handleStartAnalysis}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#A98080'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#BC8F8F'}
              style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '16px', border: 'none', backgroundColor: '#BC8F8F', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 10px 20px rgba(188,143,143,0.3)' }}
            >
              启动深度诊断
            </button>
          </section>

          {/* 装饰图标行 */}
          <footer style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '30px', color: '#E1E8EB' }}>
            <FileText size={24} />
            <BrainCircuit size={24} />
            <BarChart3 size={24} />
          </footer>

        </main>
      </div>

      {/* 呼吸动画 CSS */}
      <style>{`
        @keyframes breathe { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .breathe { animation: breathe 3s infinite; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}