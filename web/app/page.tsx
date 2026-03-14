'use client';

import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

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
      transition: 'all 0.3s ease',
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

// --- 高级加载 UI 组件 ---

const AnalysisLoading: React.FC<{ fileName: string }> = ({ fileName }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '24px', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', zIndex: 10, borderRadius: '24px' }}>
    <WatercolorIconBg color="#EEDCDB" />
    <div style={{ fontSize: '48px', color: '#BC8F8F' }} className="breathe-animation">🧠</div>
    <div style={{ width: '80%', height: '8px', backgroundColor: '#F3EAE3', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '0%', height: '100%', backgroundColor: '#BC8F8F', borderRadius: '4px' }} className="loading-bar-animation"></div>
    </div>
    <p style={{ fontSize: '16px', color: '#334155', fontWeight: '500', textAlign: 'center', padding: '0 20px' }}>
      正在深度诊断：<span style={{ color: '#BC8F8F', fontWeight: '600' }}>{fileName}</span>。<br />
      AI 引擎正在从复杂文件中提取品牌共性与增长基因...
    </p>
    <p style={{ fontSize: '12px', color: '#94A3B8' }} className="breathe-animation">稍等，我们正在让数据展现温度。</p>
  </div>
);

// --- 主页面 ---

export default function Page() {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (selectedFile) {
      // 启动加载状态
      setIsAnalyzing(true);
      
      // 模拟 AI 处理过程 (4秒后自动结束，这部分将来会被真实的 API 请求替换)
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // 结束加载，并弹窗提示 (将来这里会显示分析结果 UI)
      setIsAnalyzing(false);
      alert(`成功读取文件: ${selectedFile.name}。\n\n我们将基于数据共性，为您生成带有“温度”的改进方案。`);
      
    } else if (competitorUrl) {
      alert(`AI 正在深度抓取并诊断链接: ${competitorUrl}...`);
    } else {
      alert('请先输入链接或上传分析文件（Excel/PDF/PPT）。');
    }
  };

  return (
    <>
      <Head>
        <title>INSIGHT ENGINE - 电商智能，人文洞察</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F8F9FA',
          backgroundImage: 'radial-gradient(circle at 10% 20%, #E1E8EB 0%, rgba(225, 232, 235, 0) 30%), radial-gradient(circle at 90% 80%, #EEDCDB 0%, rgba(238, 220, 219, 0) 30%)',
          color: '#334155',
          fontFamily: "'Noto Sans SC', sans-serif",
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
          
          @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .loading-bar-animation { animation: loadingBar 4s infinite linear; }

          /* 防止选择文件时的默认提示文字抖动 */
          ::selection { background: #EEDCDB; color: #334155; }
        `}</style>

        <GlassCard style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          
          {/* 当正在分析时，显示高级加载 UI (优雅地覆盖) */}
          {isAnalyzing && selectedFile && <AnalysisLoading fileName={selectedFile.name} />}

          {/* 状态栏提示 */}
          <div style={{ position: 'relative', padding: '16px', backgroundColor: 'rgba(238, 220, 219, 0.3)', borderRadius: '12px', border: '1px solid #F3EAE3', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#BC8F8F' }} className="breathe-animation"></div>
              <p style={{ fontSize: '14px', color: '#BC8F8F' }}><b>Insight Engine</b> 洞察引擎：让数据拥有温度。</p>
            </div>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '40px' }}>高级电商数据洞察</h1>

          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
            {/* 链接输入 */}
            <div style={{ flex: 1, minWidth: '320px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '12px' }}>方式一：输入竞品链接</label>
              <input
                type="text"
                placeholder="https://..."
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                style={{ width: '100%', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '16px', border: '1px solid #E1E8EB', outline: 'none', transition: 'border-color 0.3s' }}
                onFocus={(e) => e.target.style.borderColor = '#BC8F8F'}
                onBlur={(e) => e.target.style.borderColor = '#E1E8EB'}
              />
            </div>

            {/* 文件上传 */}
            <div style={{ flex: 1, minWidth: '320px', position: 'relative' }}>
               <WatercolorIconBg color="#EEDCDB" />
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '12px' }}>方式二：上传工作文件 (Excel/PDF/PPT)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#BC8F8F'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = '#F3EAE3'}
                style={{ padding: '24px', backgroundColor: '#FEFCFB', borderRadius: '20px', border: '2px dashed #F3EAE3', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".xlsx,.xls,.pdf,.ppt,.pptx,.csv" />
                <div style={{ fontSize: '40px', color: '#778899', marginBottom: '12px' }}>📤</div>
                {selectedFile ? (
                  <p style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>已选择: {selectedFile.name}</p>
                ) : (
                  <span style={{ fontSize: '15px', color: '#64748B', fontWeight: '500' }}>点击选择或拖拽分析文件</span>
                )}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <button
              onClick={handleStartAnalysis}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A98080')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#BC8F8F')}
              style={{ padding: '16px 60px', backgroundColor: '#BC8F8F', color: 'white', borderRadius: '16px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 5px 15px -5px rgba(188, 143, 143, 0.4)' }}
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