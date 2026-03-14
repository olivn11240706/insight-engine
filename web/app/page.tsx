'use client';

import React, { useState, useRef } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Upload, Link as LinkIcon, Download, Sparkles, FileText, BarChart3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// --- 莫兰迪水彩调色盘 ---
const COLORS = ['#BC8F8F', '#A9BA9D', '#8FA9BC', '#BCA48F', '#9B8FBC'];

// --- 模拟数据解析（实际由 AI 返回后处理） ---
const mockData = {
  elements: [{ name: '视觉元素', value: 40 }, { name: '文案逻辑', value: 30 }, { name: '价格竞争力', value: 20 }, { name: '其他', value: 10 }],
  prices: [{ range: '0-50', count: 12 }, { range: '50-100', count: 25 }, { range: '100-200', count: 18 }, { range: '200+', count: 5 }],
  trends: [{ m: '1月', val: 400 }, { m: '2月', val: 300 }, { m: '3月', val: 600 }, { m: '4月', val: 800 }]
};

export default function InsightEngine() {
  const [activeTab, setActiveTab] = useState<'link' | 'file'>('link');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleStartAnalysis = async () => {
    setIsAnalyzing(true);
    // 模拟 AI 处理时间
    setTimeout(() => {
      setReport("基于您提供的数据，我们发现该品类的核心热销逻辑在于‘情感溢价’。视觉元素占比高达40%，价格区间集中在50-100元，呈现出极高的性价比共鸣...");
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FDFBF9', padding: '40px', fontFamily: '"Noto Sans SC", sans-serif' }}>
      {/* 水彩背景装饰 */}
      <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: '40%', height: '50%', background: 'radial-gradient(circle, #EEDCDB 0%, rgba(238,220,219,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '30%', height: '40%', background: 'radial-gradient(circle, #E1E8EB 0%, rgba(225,232,235,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />

      <main style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '36px', color: '#4A4A4A', fontWeight: '300', letterSpacing: '2px' }}>
            INSIGHT <span style={{ color: '#BC8F8F', fontWeight: '600' }}>ENGINE</span>
          </h1>
          <p style={{ color: '#8E8E8E', marginTop: '10px' }}>数据是有温度的，让我们听听它在说什么</p>
        </header>

        {/* 输入区卡片 */}
        <section style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' }}>
            <button onClick={() => setActiveTab('link')} style={{ padding: '10px 25px', borderRadius: '15px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'link' ? '#BC8F8F' : 'transparent', color: activeTab === 'link' ? 'white' : '#8E8E8E', transition: '0.3s' }}>
              <LinkIcon size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 粘贴链接
            </button>
            <button onClick={() => setActiveTab('file')} style={{ padding: '10px 25px', borderRadius: '15px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'file' ? '#BC8F8F' : 'transparent', color: activeTab === 'file' ? 'white' : '#8E8E8E', transition: '0.3s' }}>
              <Upload size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> 上传文件
            </button>
          </div>

          {activeTab === 'link' ? (
            <input 
              type="text" 
              placeholder="请输入竞品链接，AI 将自动抓取..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ width: '100%', padding: '20px', borderRadius: '20px', border: '1px solid #EEDCDB', outline: 'none', fontSize: '16px', backgroundColor: 'rgba(255,255,255,0.5)' }}
            />
          ) : (
            <div style={{ border: '2px dashed #EEDCDB', borderRadius: '20px', padding: '40px', textAlign: 'center', cursor: 'pointer' }} onClick={() => document.getElementById('file-upload')?.click()}>
              <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎨</div>
              <p style={{ color: '#8E8E8E' }}>{file ? `已选文件: ${file.name}` : '上传 Excel、PDF 或数据报告，开启深度解析'}</p>
            </div>
          )}

          <button 
            onClick={handleStartAnalysis}
            style={{ width: '100%', marginTop: '30px', padding: '18px', borderRadius: '20px', border: 'none', backgroundColor: '#BC8F8F', color: 'white', fontSize: '18px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 10px 20px rgba(188,143,143,0.3)' }}
          >
            {isAnalyzing ? 'AI 正在工笔细描...' : '启动深度诊断'}
          </button>
        </section>

        {/* 分析报告展示区 */}
        {report && (
          <section ref={reportRef} style={{ marginTop: '50px', background: 'white', borderRadius: '30px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              <h2 style={{ color: '#4A4A4A', fontSize: '24px' }}>深度洞察分析报告</h2>
              <button style={{ background: 'none', border: '1px solid #BC8F8F', color: '#BC8F8F', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer' }}>
                <Download size={16} /> 导出 PDF
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginBottom: '40px' }}>
              {/* 各类元素占比 - 饼图 */}
              <div style={{ height: '300px', textAlign: 'center' }}>
                <p style={{ color: '#8E8E8E', marginBottom: '20px' }}>核心元素占比分析</p>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockData.elements} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {mockData.elements.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 价格区间占比 - 柱状图 */}
              <div style={{ height: '300px', textAlign: 'center' }}>
                <p style={{ color: '#8E8E8E', marginBottom: '20px' }}>价格分布区间 (元)</p>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.prices}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#FDFBF9'}} />
                    <Bar dataKey="count" fill="#A9BA9D" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 总结文本 */}
            <div style={{ padding: '30px', backgroundColor: '#FDFBF9', borderRadius: '20px', borderLeft: '4px solid #BC8F8F' }}>
              <h3 style={{ color: '#BC8F8F', marginBottom: '15px' }}><Sparkles size={18} /> AI 总结报告</h3>
              <p style={{ lineHeight: '1.8', color: '#666' }}>{report}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}