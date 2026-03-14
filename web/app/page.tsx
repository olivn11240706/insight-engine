'use client';

import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- 结果展示弹窗组件 ---
const ResultModal: React.FC<{ content: string; onClose: () => void }> = ({ content, onClose }) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Insight_Engine_诊断报告_${new Date().getTime()}.pdf`);
    } catch (e) {
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <div ref={reportRef} style={{ backgroundColor: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#BC8F8F', marginBottom: '20px' }}>AI 深度诊断报告</h2>
          <div style={{ lineHeight: '1.8', color: '#475569', whiteSpace: 'pre-wrap' }}>{content}</div>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={downloadPDF} disabled={isExporting} style={{ padding: '12px 24px', backgroundColor: '#BC8F8F', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
            {isExporting ? '生成中...' : '下载 PDF 报告'}
          </button>
          <button onClick={onClose} style={{ padding: '12px 24px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E1E8EB', cursor: 'pointer' }}>关闭预览</button>
        </div>
      </div>
    </div>
  );
};

// --- 主页面 ---
export default function Page() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 修复 image_c1098d.jpg 中的类型错误：明确指定 currentTarget 的类型
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#A98080';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#BC8F8F';
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return alert('请先上传文件');
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      if (data.result) setAnalysisResult(data.result);
      else alert('诊断失败');
    } catch (e) {
      alert('网络连接错误');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8F9FA', padding: '40px' }}>
      <style>{`
        @keyframes breathe { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .breathe { animation: breathe 3s infinite; }
      `}</style>

      {analysisResult && <ResultModal content={analysisResult} onClose={() => setAnalysisResult(null)} />}

      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '24px', position: 'relative', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(20px)' }}>
        {isAnalyzing && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>
            <div className="breathe" style={{ fontSize: '40px' }}>🧠</div>
            <p style={{ color: '#BC8F8F', marginTop: '10px', fontWeight: '600' }}>正在解析数据共性...</p>
          </div>
        )}

        <h1 style={{ color: '#1E293B', marginBottom: '30px', fontSize: '28px' }}>Insight Engine 诊断面板</h1>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          style={{ padding: '40px', border: '2px dashed #F3EAE3', borderRadius: '20px', textAlign: 'center', cursor: 'pointer', marginBottom: '30px', transition: '0.3s' }}
        >
          <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} style={{ display: 'none' }} accept=".xlsx,.xls,.pdf,.ppt,.pptx" />
          <p style={{ color: '#64748B' }}>{selectedFile ? `已选择: ${selectedFile.name}` : '点击上传分析文件 (Excel/PDF)'}</p>
        </div>

        <button 
          onClick={handleStartAnalysis}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ width: '100%', padding: '16px', backgroundColor: '#BC8F8F', color: 'white', borderRadius: '16px', border: 'none', fontWeight: '600', cursor: 'pointer', transition: '0.3s' }}
        >
          开始 AI 深度诊断
        </button>
      </div>
    </div>
  );
}