'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';

export const dynamic = 'force-dynamic';

// --- 莫兰迪水彩风 UI 组件 ---

const watercolorShadow = '0 10px 40px -10px rgba(119, 136, 153, 0.2), 0 5px 20px -10px rgba(188, 143, 143, 0.2)';

const GlassCard: React.FC<React.PropsWithChildren<{ style?: React.CSSProperties }>> = ({ children, style }) => (
  <div
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: watercolorShadow,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      ...style,
    }}
  >
    {children}
  </div>
);

const WatercolorIconBg: React.FC<{ color?: string }> = ({ color = '#EEDCDB' }) => (
  <div
    style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: 0.8,
      filter: 'blur(10px)',
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      zIndex: -1,
    }}
  />
);

const FunctionCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div
    style={{
      position: 'relative',
      padding: '24px',
      backgroundColor: '#FEFCFB',
      borderRadius: '20px',
      border: '1px solid #F3EAE3',
      flex: 1,
      minWidth: '280px',
    }}
  >
    <WatercolorIconBg color="#E1E8EB" />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: '32px', color: '#778899', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6' }}>{desc}</p>
    </div>
  </div>
);

// --- 主页面 ---

export default function Page() {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleStartAnalysis = () => {
    if (selectedFile) {
      alert(`AI 正在深度分析文件: ${selectedFile.name}。我们将识别其中的数据共性...`);
    } else if (competitorUrl) {
      alert(`AI 正在分析链接: ${competitorUrl}...`);
    } else {
      alert('请先输入链接或上传分析文件（Excel/PDF/PPT）。');
    }
  };

  return (
    <>
      <Head>
        <title>INSIGHT ENGINE - 电商智能</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F8F9FA',
          backgroundImage: 'radial-gradient(circle at 10% 20%, #E1E8EB 0%, rgba(225, 232, 235, 0) 30%), radial-gradient(circle at 90% 80%, #EEDCDB 0%, rgba(238, 220, 219, 0) 30%)',
          color: '#334155',
          padding: '40px',
        }}
      >
        <style>{`
          @keyframes breathe {
            0% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.7; transform: scale(1); }
          }
          .breathe-animation { animation: breathe 3s infinite ease-in-out; }
        `}</style>

        <GlassCard style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ position: 'relative', padding: '16px', backgroundColor: 'rgba(238, 220, 219, 0.3)', borderRadius: '12px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#BC8F8F' }} className="breathe-animation"></div>
              <p style={{ fontSize: '14px', color: '#BC8F8F' }}><b>Insight Engine</b> 洞察引擎：让数据拥有温度。</p>
            </div>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '40px' }}>高级电商数据洞察</h1>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {/* 链接输入 */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>方式一：输入竞品链接</label>
              <input
                type="text"
                placeholder="https://..."
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #E1E8EB', outline: 'none' }}
              />
            </div>

            {/* 文件上传 */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>方式二：上传工作文件 (Excel/PDF/PPT)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                style={{ 
                  padding: '16px', 
                  border: '2px dashed #F3EAE3', 
                  borderRadius: '12px', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  backgroundColor: selectedFile ? 'rgba(238, 220, 219, 0.1)' : 'transparent'
                }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  style={{ display: 'none' }} 
                  accept=".xlsx,.xls,.pdf,.ppt,.pptx,.csv"
                />
                <span style={{ fontSize: '14px', color: '#64748B' }}>
                  {selectedFile ? `已选择: ${selectedFile.name}` : '点击选择或拖拽分析文件'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <button
              onClick={handleStartAnalysis}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A98080')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#BC8F8F')}
              style={{
                padding: '16px 60px',
                backgroundColor: '#BC8F8F',
                color: 'white',
                borderRadius: '16px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              启动 AI 深度诊断
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <FunctionCard icon="📊" title="多维文件解析" desc="支持解析复杂 Excel 报表与行业 PDF，提取关键销售趋势。" />
            <FunctionCard icon="🔗" title="跨平台对比" desc="通过上传文件与在线链接结合，实现站内外的全维度对比。" />
            <FunctionCard icon="💡" title="人文洞察建议" desc="基于数据共性生成具有品牌温度的改进方案。" />
          </div>
        </GlassCard>
      </div>
    </>
  );
}