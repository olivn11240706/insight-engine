'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';

// --- 莫兰迪水彩风 UI 组件 ---
const GlassCard: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 10px 40px -10px rgba(119, 136, 153, 0.2)', transition: 'all 0.3s ease', ...style }}>
    {children}
  </div>
);

// --- 结果展示弹窗 ---
const ResultModal: React.FC<{ content: string; onClose: () => void }> = ({ content, onClose }) => (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
    <GlassCard style={{ maxWidth: '700px', width: '100%', maxHeight: '80vh', overflowY: 'auto', position: 'relative', border: '1px solid #BC8F8F' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#94A3B8' }}>×</button>
      <h2 style={{ color: '#BC8F8F', marginBottom: '20px', fontSize: '22px' }}>AI 深度诊断报告</h2>
      <div style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>{content}</div>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button onClick={onClose} style={{ padding: '12px 32px', backgroundColor: '#BC8F8F', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>确认并关闭</button>
      </div>
    </GlassCard>
  </div>
);

export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStartAnalysis = async () => {
    if (!selectedFile) return alert('请先上传文件');
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();

      if (data.result) {
        setAnalysisResult(data.result);
      } else {
        alert('诊断失败：' + (data.error || '未知错误'));
      }
    } catch (e) {
      alert('网络连接失败');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', padding: '40px' }}>
      <style>{`
        @keyframes breathe { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .loading-bar { width: 0%; height: 100%; backgroundColor: #BC8F8F; animation: load 3s infinite linear; }
        @keyframes load { from { width: 0%; } to { width: 100%; } }
      `}</style>

      {/* 结果弹窗 */}
      {analysisResult && <ResultModal content={analysisResult} onClose={() => setAnalysisResult(null)} />}

      <GlassCard style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* 加载遮罩 */}
        {isAnalyzing && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 10, borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '40px' }} className="breathe">🧠</div>
            <p style={{ marginTop: '20px', color: '#BC8F8F', fontWeight: '600' }}>AI 正在深度解析数据共性...</p>
            <div style={{ width: '60%', height: '4px', backgroundColor: '#F3EAE3', marginTop: '20px', borderRadius: '2px', overflow: 'hidden' }}>
              <div className="loading-bar"></div>
            </div>
          </div>
        )}

        <h1 style={{ fontSize: '28px', color: '#1E293B', marginBottom: '32px' }}>Insight Engine 诊断面板</h1>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '40px', border: '2px dashed #F3EAE3', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '32px' }}
        >
          <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} style={{ display: 'none' }} accept=".xlsx,.xls,.pdf,.ppt,.pptx" />
          <p style={{ color: '#64748B' }}>{selectedFile ? `已选择: ${selectedFile.name}` : '点击此处上传分析文件 (Excel/PDF/PPT)'}</p>
        </div>

        <button 
          onClick={handleStartAnalysis}
          style={{ width: '100%', padding: '16px', backgroundColor: '#BC8F8F', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '600', cursor: 'pointer' }}
        >
          开始 AI 深度诊断
        </button>
      </GlassCard>
    </div>
  );
}