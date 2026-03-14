'use client';

import React, { useState } from 'react';
import Head from 'next/head';

// 强制动态渲染，防止在 Vercel 上出现 404 缓存死锁
export const dynamic = 'force-dynamic';

// === 莫兰迪水彩风 UI 组件库 (Inline) ===

// 模拟水彩晕染效果的柔和阴影
const watercolorShadow = '0 10px 40px -10px rgba(119, 136, 153, 0.2), 0 5px 20px -10px rgba(188, 143, 143, 0.2)';

// 通用的带有高级感的卡片容器
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
    className="glass-card-hover"
  >
    {children}
  </div>
);

// 模拟水彩笔触的圆形图标背景
const WatercolorIconBg: React.FC<{ color?: string }> = ({ color = '#EEDCDB' }) => (
  <div
    style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: 0.8,
      filter: 'blur(10px)', // 制造晕染感
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      zIndex: -1,
    }}
  />
);

// 呼吸感的 AI 功能卡片
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

// 主页面渲染
export default function Page() {
  const [competitorUrl, setCompetitorUrl] = useState('');

  return (
    <>
      <Head>
        <title>INSIGHT ENGINE - 电商智能，人文洞察</title>
      </Head>

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#F8F9FA', // 莫兰迪底色
          // 模拟水彩背景晕染
          backgroundImage: 'radial-gradient(circle at 10% 20%, #E1E8EB 0%, rgba(225, 232, 235, 0) 30%), radial-gradient(circle at 90% 80%, #EEDCDB 0%, rgba(238, 220, 219, 0) 30%)',
          color: '#334155',
          fontFamily: "'Noto Sans SC', sans-serif",
          padding: '40px',
        }}
      >
        {/* 全局动效 CSS (Inline) */}
        <style>{`
          .glass-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 50px -10px rgba(119, 136, 153, 0.3), 0 10px 30px -10px rgba(188, 143, 143, 0.3);
          }
          @keyframes breathe {
            0% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.7; transform: scale(1); }
          }
          .breathe-animation {
            animation: breathe 3s infinite ease-in-out;
          }
          /* 莫兰迪色系选中文本颜色 */
          ::selection {
            background: #EEDCDB; 
            color: #334155;
          }
        `}</style>

        {/* 主体卡片 */}
        <GlassCard style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* 状态栏提示 (保留，但增加高级感) */}
          <div style={{ position: 'relative', padding: '16px', backgroundColor: 'rgba(238, 220, 219, 0.3)', borderRadius: '12px', border: '1px solid #F3EAE3', marginBottom: '32px' }}>
            <WatercolorIconBg color="#F3EAE3" />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#BC8F8F', boxShadow: '0 0 10px #BC8F8F' }} className="breathe-animation"></div>
              <p style={{ fontSize: '14px', color: '#BC8F8F' }}>
                <span style={{ fontWeight: '600' }}>Insight Engine</span> 洞察引擎已上线。感受数据的温度。
              </p>
            </div>
          </div>

          {/* 标题 */}
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>INSIGHT ENGINE - 电商智能，人文洞察</h1>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.7' }}>
            不只是冰冷的数据分析。我们通过 AI 解码高销量产品的灵魂，为您提供带有“人文关怀”的店铺提升建议，让您的品牌更懂人心。
          </p>

          {/* 输入区域 */}
          <div style={{ marginBottom: '48px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '12px' }}>输入竞品链接以开始分析 (Enter Competitor Link)</label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input
                type="text"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="https://item.example.com/..."
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  border: '1px solid #E1E8EB',
                  fontSize: '15px',
                  color: '#334155',
                  boxShadow: 'inset 0 2px 5px rgba(119, 136, 153, 0.05)',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#BC8F8F'}
                onBlur={(e) => e.target.style.borderColor = '#E1E8EB'}
              />
              <button
                style={{
                  padding: '16px 32px',
                  backgroundColor: '#BC8F8F', // 莫兰迪粉
                  color: 'white',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  boxShadow: '0 5px 15px -5px rgba(188, 143, 143, 0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#A98080';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#BC8F8F';
                }}
                onClick={() => alert('AI 正在深度诊断中，请稍候...')}
              >
                开始 AI 深度诊断
              </button>
            </div>
          </div>

          {/* 功能展示区 */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#334155', marginBottom: '24px' }}>核心功能 (Core Features)</h2>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <FunctionCard
                icon="🔗"
                title="竞品共性分析"
                desc="自动化扫描同类目高销量产品，解码视觉风格、价格策略和描述文案的共同规律。"
              />
              <FunctionCard
                icon="📊"
                title="高销量解码"
                desc="分析用户评论情感，识别被忽视的痛点，帮助您找到产品差异化的“情感爆点”。"
              />
              <FunctionCard
                icon="💡"
                title="改善建议生成"
                desc="不提供泛泛的建议。AI 生成可立即执行的、带有“温度”的文案与UI优化策略。"
              />
            </div>
          </div>

        </GlassCard>

        'use client';

import React, { useState, useRef } from 'react';
import Head from 'next/head';

// === 莫兰迪水彩风 UI 组件库 (Inline) ===

// 模拟水彩晕染效果的柔和阴影
const watercolorShadow = '0 10px 40px -10px rgba(119, 136, 153, 0.2), 0 5px 20px -10px rgba(188, 143, 143, 0.2)';

// 通用的带有高级感的卡片容器
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
    className="glass-card-hover"
  >
    {children}
  </div>
);

// 模拟水彩笔触的圆形图标背景
const WatercolorIconBg: React.FC<{ color?: string }> = ({ color = '#EEDCDB' }) => (
  <div
    style={{
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: 0.8,
      filter: 'blur(10px)', // 制造晕染感
      position: 'absolute',
      top: '-10px',
      left: '-10px',
      zIndex: -1,
    }}
  />
);

// 呼吸感的 AI 功能卡片
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

// 主页面渲染
export default function Page() {
  const [competitorUrl, setCompetitorUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartAnalysis = async () => {
    if (selectedFile) {
      alert(`AI 正在深度诊断文件: ${selectedFile.name}，请稍候...`);
      // 这里将接入后端上传逻辑
    } else if (competitorUrl) {
      alert(`AI 正在深度诊断链接: ${competitorUrl}，请稍候...`);
    } else {
      alert('请先输入竞品链接或上传分析文件。');
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
          backgroundColor: '#F8F9FA', // 莫兰迪底色
          // 模拟水彩背景晕染
          backgroundImage: 'radial-gradient(circle at 10% 20%, #E1E8EB 0%, rgba(225, 232, 235, 0) 30%), radial-gradient(circle at 90% 80%, #EEDCDB 0%, rgba(238, 220, 219, 0) 30%)',
          color: '#334155',
          fontFamily: "'Noto Sans SC', sans-serif",
          padding: '40px',
        }}
      >
        {/* 全局动效 CSS (Inline) */}
        <style>{`
          .glass-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 50px -10px rgba(119, 136, 153, 0.3), 0 10px 30px -10px rgba(188, 143, 143, 0.3);
          }
          @keyframes breathe {
            0% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.02); }
            100% { opacity: 0.7; transform: scale(1); }
          }
          .breathe-animation {
            animation: breathe 3s infinite ease-in-out;
          }
          /* 莫兰迪色系选中文本颜色 */
          ::selection {
            background: #EEDCDB; 
            color: #334155;
          }
        `}</style>

        {/* 主体卡片 */}
        <GlassCard style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* 状态栏提示 */}
          <div style={{ position: 'relative', padding: '16px', backgroundColor: 'rgba(238, 220, 219, 0.3)', borderRadius: '12px', border: '1px solid #F3EAE3', marginBottom: '32px' }}>
            <WatercolorIconBg color="#F3EAE3" />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#BC8F8F', boxShadow: '0 0 10px #BC8F8F' }} className="breathe-animation"></div>
              <p style={{ fontSize: '14px', color: '#BC8F8F' }}>
                <span style={{ fontWeight: '600' }}>Insight Engine</span> 洞察引擎已上线。感受数据的温度。
              </p>
            </div>
          </div>

          {/* 标题 */}
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1E293B', marginBottom: '16px' }}>INSIGHT ENGINE - 电商智能，人文洞察</h1>
          <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.7' }}>
            不只是冰冷的数据分析。我们通过 AI 解码高销量产品的灵魂，为您提供带有“人文关怀”的店铺提升建议，让您的品牌更懂人心。
          </p>

          {/* === 输入与上传区域 === */}
          <div style={{ display: 'flex', gap: '32px', marginBottom: '48px', flexWrap: 'wrap' }}>
            
            {/* 链接输入 (左侧) */}
            <div style={{ flex: 1, minWidth: '320px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '12px' }}>方式一：输入竞品链接 (Enter Competitor Link)</label>
              <input
                type="text"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="https://item.example.com/..."
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '16px',
                  border: '1px solid #E1E8EB',
                  fontSize: '15px',
                  color: '#334155',
                  boxShadow: 'inset 0 2px 5px rgba(119, 136, 153, 0.05)',
                  transition: 'border-color 0.3s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = '#BC8F8F'}
                onBlur={(e) => e.target.style.borderColor = '#E1E8EB'}
              />
            </div>

            {/* 文件上传 (右侧 - 水彩风高级卡片) */}
            <div style={{ flex: 1, minWidth: '320px', position: 'relative' }}>
               <WatercolorIconBg color="#EEDCDB" />
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#475569', marginBottom: '12px' }}>方式二：上传分析文件 (Upload Analysis File)</label>
              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#FEFCFB',
                  borderRadius: '20px',
                  border: '2px dashed #F3EAE3',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#BC8F8F'; e.currentTarget.style.backgroundColor = 'rgba(238, 220, 219, 0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F3EAE3'; e.currentTarget.style.backgroundColor = '#FEFCFB'; }}
                onClick={handleUploadClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  // 限制常用的文件类型
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation"
                />
                <div style={{ fontSize: '40px', color: '#778899', marginBottom: '12px' }}>📤</div>
                {selectedFile ? (
                  <p style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>已选择: {selectedFile.name}</p>
                ) : (
                  <>
                    <p style={{ fontSize: '15px', color: '#64748B', fontWeight: '500' }}>点击或拖拽文件到此区域上传</p>
                    <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>支持 Excel, PDF, PPT, CSV 等数据分析常用格式</p>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* 统一的开始诊断按钮 */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
             <button
                style={{
                  padding: '16px 48px',
                  backgroundColor: '#BC8F8F', // 莫兰迪粉
                  color: 'white',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  boxShadow: '0 5px 15px -5px rgba(188, 143, 143, 0.4)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A98080'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#BC8F8F'}
                onClick={handleStartAnalysis}
              >
                开始 AI 深度诊断
              </button>
          </div>

          {/* 功能展示区 */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#334155', marginBottom: '24px' }}>核心功能 (Core Features)</h2>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <FunctionCard
                icon="🔗"
                title="竞品共性分析"
                desc="自动化扫描同类目高销量产品，解码视觉风格、价格策略和描述文案的共同规律。"
              />
              <FunctionCard
                icon="📊"
                title="高销量解码"
                desc="分析用户评论情感，识别被忽视的痛点，帮助您找到产品差异化的“情感爆点”。"
              />
              <FunctionCard
                icon="💡"
                title="改善建议生成"
                desc="不提供泛泛的建议。AI 生成可立即执行的、带有“温度”的文案与UI优化策略。"
              />
            </div>
          </div>

        </GlassCard>

        {/* 底部人文关怀 Footer */}
        <div style={{ textAlign: 'center', marginTop: '64px', fontSize: '14px', color: '#94A3B8' }}>
          <p className="breathe-animation" style={{ color: '#BC8F8F', fontWeight: '600', fontSize: '15px' }}>
            我们相信，数据不应冰冷。每一个成功的品牌，都蕴含着对人性的关怀。
          </p>
          <p style={{ marginTop: '8px' }}>Insight Engine. All rights reserved. 2024</p>
        </div>

      </div>
    </>
  );
}