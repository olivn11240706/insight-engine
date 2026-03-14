'use client';

import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, Sparkles } from 'lucide-react';
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

  const handleStartAnalysis = async () => {
    // 关键修复：确保有文件或 URL
    if (!file && !url) return alert('请上传有效数据文件 (Excel/PDF) 或输入链接');
    setIsAnalyzing(true);
    setReport(null); // 清空旧报告

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      } else {
        formData.append('url', url);
      }

      // 注意：后端此时不处理文件内容，仅返回模拟 JSON 用于测试
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.elements && data.prices) {
        setElementsData(data.elements);
        setPricesData(data.prices);
        setReport(data.summary);
      } else {
        alert(data.error || '分析失败，请检查后端 API 配置');
      }
    } catch (e) {
      alert('无法连接分析引擎，请检查 API 路由设置');
    } finally {
      setIsAnalyzing(false);
    }
  };

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', padding: '40px' }}>
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#4A4A4A', marginBottom: '40px', fontWeight: '300' }}>INSIGHT ENGINE</h1>
        
        <div style={{ background: 'white', borderRadius: '30px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
            <button onClick={() => setActiveTab('link')} style={{ padding: '10px 25px', borderRadius: '15px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'link' ? '#BC8F8F' : '#F3EAE3', color: activeTab === 'link' ? 'white' : '#8E8E8E' }}>粘贴链接</button>
            <button onClick={() => setActiveTab('file')} style={{ padding: '10px 25px', borderRadius: '15px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'file' ? '#BC8F8F' : '#F3EAE3', color: activeTab === 'file' ? 'white' : '#8E8E8E' }}>上传文件</button>
          </div>

          {activeTab === 'link' ? (
            <input 
              type="text" 
              placeholder="输入竞品链接..." 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              style={{ width: '100%', padding: '20px', borderRadius: '20px', border: '1px solid #EEDCDB' }} 
            />
          ) : (
            <div 
              onClick={() => document.getElementById('file-upload')?.click()} 
              style={{ border: '2px dashed #EEDCDB', borderRadius: '20px', padding: '40px', textAlign: 'center', cursor: 'pointer' }}
            >
              <input 
                id="file-upload" 
                type="file" 
                hidden 
                // 关键修复：确保文件状态被正确设置
                onChange={(e) => setFile(e.target.files?.[0] || null)} 
              />
              <p style={{ color: '#8E8E8E' }}>{file ? `已选: ${file.name}` : '点击这里上传文件 (Excel/PDF)'}</p>
            </div>
          )}

          <button 
            onClick={handleStartAnalysis} 
            disabled={isAnalyzing}
            style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '20px', border: 'none', backgroundColor: '#BC8F8F', color: 'white', fontWeight: '600', cursor: 'pointer' }}
          >
            {isAnalyzing ? 'AI 正在工笔细描...' : '启动诊断'}
          </button>
        </div>

        {report && (
          <div ref={reportRef} style={{ marginTop: '50px', background: 'white', borderRadius: '30px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <h2 style={{ color: '#4A4A4A' }}>诊断洞察报告</h2>
              <button onClick={downloadPDF} style={{ background: 'none', border: '1px solid #BC8F8F', color: '#BC8F8F', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer' }}>
                <Download size={16} style={{ marginRight: '5px' }} /> 导出 PDF
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', height: '350px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={elementsData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={5}>
                    {elementsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pricesData}>
                  <XAxis dataKey="range" axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#FDFBF9' }} />
                  <Bar dataKey="count" fill="#A9BA9D" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#FDFBF9', borderRadius: '20px', borderLeft: '4px solid #BC8F8F' }}>
              <h3 style={{ color: '#BC8F8F', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
                <Sparkles size={18} style={{ marginRight: '8px' }} /> AI 深度总结
              </h3>
              <p style={{ lineHeight: '1.8', color: '#666', whiteSpace: 'pre-wrap' }}>{report}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}