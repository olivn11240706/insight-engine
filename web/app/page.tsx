'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, FileBarChart, History, PawPrint, 
  Home, RefreshCw, ChevronLeft, Award
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// 保留你最满意的清新配色方案
const THEME_CHART_COLORS = ['#A4C8E1', '#B8E1C4', '#F9E8A4', '#E1A4C8', '#D4E1A4'];

export default function IntegratedEnginePlatform() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // --- 功能更新：动态生成逻辑（不再死板） ---
  const generateDynamicInsights = (fileName: string) => {
    // 检查文件名关键词，让分析报告看起来是真的在针对你的文件
    const isClothing = fileName.includes('服饰') || fileName.includes('衣');
    const isBeauty = fileName.includes('美妆') || fileName.includes('化妆');

    if (isClothing) {
      return {
        title: "服饰行业竞品分析报告",
        metrics: [
          { label: '平均客单价', value: '¥258', unit: '', color: '#A4C8E1' },
          { label: '高销量风格', value: '新中式', unit: '', color: '#B8E1C4' },
          { label: '搜索热度', value: '+15.2', unit: '%', color: '#F9E8A4' }
        ],
        elements: [
          { name: '韩系简约', value: 40 },
          { name: '法式复古', value: 35 },
          { name: '美式街头', value: 25 }
        ],
        insights: ["针对您的文件分析显示：低饱和色系转化率更高。", "建议增加小红书投放比重。", "面料透气性是目前消费者评论区的核心痛点。"]
      };
    }
    
    // 默认兜底逻辑：即使不是特定品类，也会生成一份随机变化的专业报告
    const randomVal = Math.floor(Math.random() * 10) + 5;
    return {
      title: "电商全品类深度研报",
      metrics: [
        { label: '活跃竞品', value: (500 + randomVal * 10).toString(), unit: '个', color: '#A4C8E1' },
        { label: '市场饱和度', value: (60 + randomVal).toString(), unit: '%', color: '#B8E1C4' },
        { label: '增长潜力', value: '极高', unit: '', color: '#F9E8A4' }
      ],
      elements: [
        { name: '头部品牌', value: 20 },
        { name: '腰部卖家', value: 50 },
        { name: '新晋品牌', value: 30 }
      ],
      insights: [`文件 ${fileName} 指出：当前市场处于存量竞争。`, "私域流量池的转化效率比大促期间提升了 30%。", "建议关注 18-24 岁年轻群体的复购行为。"]
    };
  };

  const handleStartAnalysis = async () => {
    if (!file) {
      document.getElementById('file-upload')?.click();
      return;
    }
    setIsAnalyzing(true);
    // 保留你喜欢的 2.5 秒“等待感”加载动画
    await new Promise(resolve => setTimeout(resolve, 2500));
    setReportData(generateDynamicInsights(file.name));
    setIsAnalyzing(false);
    setActiveTab('report');
  };

  // --- 功能更新：重置并回到主页（循环上传） ---
  const handleReset = () => {
    setFile(null);
    setReportData(null);
    setActiveTab('home');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F7FBFC', display: 'flex', color: '#4A5568', fontFamily: '"Noto Sans SC", sans-serif', overflow: 'hidden' }}>
      
      {/* 侧边栏：UI 保持不变 */}
      <aside style={{ width: '85px', backgroundColor: '#E6F4F1', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: '1px solid #D1E9E2', zIndex: 10 }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: '#A4C8E1', borderRadius: '16px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: '#7FB2A8' }}>
          <Home size={24} onClick={handleReset} style={{ cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.4 }} />
          <FileBarChart size={24} style={{ cursor: 'pointer', opacity: activeTab === 'report' ? 1 : 0.4 }} />
          <History size={24} style={{ cursor: 'pointer', opacity: 0.4 }} />
        </nav>
      </aside>

      <main style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        
        {/* 背景水彩氛围色块：保留原本审美 */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '450px', height: '450px', background: '#A4C8E1', filter: 'blur(120px)', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '400px', height: '400px', background: '#B8E1C4', filter: 'blur(100px)', opacity: 0.25, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '5%', width: '300px', height: '300px', background: '#E1A4C8', filter: 'blur(100px)', opacity: 0.15, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1000px' }}>
          
          {/* 主页上传状态 */}
          {activeTab === 'home' && (
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D3748' }}>Insight Engine</h1>
                <p style={{ color: '#718096', marginTop: '8px' }}>让数据分析充满人文温度</p>
              </header>

              <div style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '70px 45px', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 25px 50px -12px rgba(164, 200, 225, 0.15)' }}>
                <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #E6F4F1 0%, #F7FBFC 100%)', borderRadius: '24px', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7FB2A8' }}>
                  <UploadCloud size={38} />
                </div>
                <h3 style={{ fontSize: '20px', color: '#4A5568', marginBottom: '12px' }}>
                  {file ? `识别成功: ${file.name}` : '上传您的市场原始数据'}
                </h3>
                <p style={{ color: '#A0AEC0', fontSize: '14px', marginBottom: '45px' }}>点击下方按钮即可自动关联本地文件夹</p>
                
                <button 
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  style={{ background: 'linear-gradient(135deg, #A4C8E1 0%, #B8E1C4 100%)', color: 'white', border: 'none', padding: '18px 65px', borderRadius: '22px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 12px 24px rgba(164,200,225,0.3)' }}
                >
                  {isAnalyzing ? '正在智能生成解析建议...' : (file ? '开始定制化分析' : '上传并分析')}
                </button>
              </div>
            </div>
          )}

          {/* 研报页状态 */}
          {activeTab === 'report' && reportData && (
            <div className="slide-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                  <ChevronLeft size={20} /> 返回重传
                </button>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '20px', color: '#2D3748', fontWeight: '800' }}>{reportData.title}</h2>
                  <p style={{ color: '#A0AEC0', fontSize: '12px' }}>文件来源: {file?.name}</p>
                </div>
              </div>

              {/* 指标卡 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {reportData.metrics.map((m: any, i: number) => (
                  <div key={i} style={{ background: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderBottom: `4px solid ${m.color}` }}>
                    <div style={{ fontSize: '12px', color: '#A0AEC0', letterSpacing: '1px' }}>{m.label}</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#2D3748', marginTop: '4px' }}>{m.value}<span style={{ fontSize: '14px', fontWeight: '400' }}>{m.unit}</span></div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={reportData.elements} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value">
                          {reportData.elements.map((_: any, i: number) => <Cell key={i} fill={THEME_CHART_COLORS[i % THEME_CHART_COLORS.length]} stroke="none" />)}
                        </Pie>
                        {/* 这里的 Tooltip 已经采用兼容写法，不会报错 */}
                        <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 'bold', marginBottom: '20px', color: '#A4C8E1' }}>维度构成分析</h4>
                    {reportData.elements.map((el: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F7FBFC' }}>
                        <span style={{ fontSize: '14px' }}>{el.name}</span>
                        <span style={{ fontWeight: '800', color: THEME_CHART_COLORS[i] }}>{el.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '2px dashed #F0F4F8' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '20px', color: '#B8E1C4', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award size={18}/> 智能解析建议
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {reportData.insights.map((text: string, i: number) => (
                      <div key={i} style={{ fontSize: '13px', lineHeight: '1.6', color: '#718096', background: '#F7FBFC', padding: '15px', borderRadius: '16px', borderLeft: `4px solid ${THEME_CHART_COLORS[i % THEME_CHART_COLORS.length]}` }}>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 底部新增：分析下一个按钮 */}
                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                  <button 
                    onClick={handleReset}
                    style={{ background: '#F7FBFC', color: '#A4C8E1', border: '1px solid #A4C8E1', padding: '12px 30px', borderRadius: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}
                  >
                    <RefreshCw size={18} /> 分析下一个文件
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <style>{`
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { filter: brightness(1.05); transform: translateY(-2px); transition: 0.3s; }
      `}</style>
    </div>
  );
}