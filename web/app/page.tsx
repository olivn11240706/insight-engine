'use client';

import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Upload, Link as LinkIcon, Download, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

export default function InsightEngine() {
  const [activeTab, setActiveTab] = useState<'link' | 'file'>('link');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [elementsData, setElementsData] = useState<any[]>([]);
  const [pricesData, setPricesData] = useState<any[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`诊断报告_${new Date().getTime()}.pdf`);
  };

  const handleStartAnalysis = async () => {
    if (!file && !url) return alert('请提供链接或上传文件');
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      else formData.append('url', url);

      const response = await fetch('/api/analyze', { method: 'POST', body: formData });
      const data = await response.json();

      if (data.elements) {
        setElementsData(data.elements);
        setPricesData(data.prices);
        setReport(data.summary);
      }
    } catch (e) {
      alert('分析遇到波折');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', padding: '40px' }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#4A4A4A', marginBottom: '40px' }}>INSIGHT ENGINE</h1>
        
        <div style={{ background: 'white', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
            <button onClick={() => setActiveTab('link')} style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'link' ? '#BC8F8F' : '#F3EAE3', color: activeTab === 'link' ? 'white' : '#8E8E8E' }}>粘贴链接</button>
            <button onClick={() => setActiveTab('file')} style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'file' ? '#BC8F8F' : '#F3EAE3', color: activeTab === 'file' ? 'white' : '#8E8E8E' }}>上传文件</button>
          </div>

          {activeTab === 'link' ? (
            <input type="text" placeholder="输入链接..." value={url} onChange={(e) => setUrl(e.target.value)} style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #EEDCDB' }} />
          ) : (
            <div onClick={() => document.getElementById('file-upload')?.click()} style={{ border: '2px dashed #EEDCDB', borderRadius: '15px', padding: '30px', textAlign: 'center', cursor: 'pointer' }}>
              <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <p>{file ? file.name : '点击上传数据文件'}</p>
            </div>
          )}

          <button onClick={handleStartAnalysis} style={{ width: '100%', marginTop: '20px', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#BC8F8F', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
            {isAnalyzing ? 'AI 正在深度解析...' : '启动诊断'}
          </button>
        </div>

        {report && (
          <div ref={reportRef} style={{ marginTop: '40px', background: 'white', borderRadius: '24px', padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ color: '#BC8F8F' }}>分析报告</h2>
              <button onClick={downloadPDF} style={{ padding: '5px 15px', border: '1px solid #BC8F8F', borderRadius: '8px', color: '#BC8F8F', background: 'none', cursor: 'pointer' }}>导出 PDF</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={elementsData} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={5}>
                    {elementsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pricesData}>
                  <XAxis dataKey="range" hide />
                  <Tooltip />
                  <Bar dataKey="count" fill="#A9BA9D" radius={[5,5,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FDFBF9', borderRadius: '15px', borderLeft: '4px solid #BC8F8F' }}>
              <p style={{ lineHeight: '1.8', color: '#4A4A4A', whiteSpace: 'pre-wrap' }}>{report}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}