'use client';

import React, { useState } from 'react';
import { 
  UploadCloud, FileBarChart, History, PawPrint, 
  Home, RefreshCw, ChevronLeft, Award, TrendingUp, DollarSign, MapPin, Tag, Lightbulb
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// 保留你最满意的清新配色方案，并增加几个辅助色
const THEME_COLORS = {
  blue: '#A4C8E1',
  green: '#B8E1C4',
  yellow: '#F9E8A4',
  pink: '#E1A4C8',
  lime: '#D4E1A4',
  text: '#4A5568',
  subText: '#A0AEC0',
  bg: '#F7FBFC',
  sidebar: '#E6F4F1',
};

const CHART_COLORS = [THEME_COLORS.blue, THEME_COLORS.green, THEME_COLORS.yellow, THEME_COLORS.pink, THEME_COLORS.lime];

export default function DeepInsightPlatform() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  // --- 核心更新：极度深化的动态模拟逻辑 ---
  const generateDeepInsights = (fileName: string) => {
    // 简单的关键词识别，用于切换特定品类的深度报告
    const isSneakers = fileName.includes('鞋') || fileName.includes('跑鞋');
    const isDress = fileName.includes('裙') || fileName.includes('连衣裙');

    if (isSneakers) {
      return {
        title: "运动鞋服市场深度竞争研报",
        summaryMetrics: [
          { label: '核心价格带', value: '¥150-299', icon: DollarSign, color: THEME_COLORS.blue },
          { label: '产地集中度', value: '福建晋江 (45%)', icon: MapPin, color: THEME_COLORS.green },
          { label: '爆款主特征', value: '厚底/极简', icon: Tag, color: THEME_COLORS.yellow },
        ],
        // 1. 价格分析：区间分布
        priceDist: [
          { name: '0-99', value: 15 },
          { name: '100-199', value: 30 },
          { name: '200-299', value: 45 },
          { name: '300+', value: 10 },
        ],
        // 2. 地域分布：产地特征
        regionData: [
          { name: '福建', value: 45, fill: THEME_COLORS.blue },
          { name: '浙江', value: 25, fill: THEME_COLORS.green },
          { name: '广东', value: 15, fill: THEME_COLORS.yellow },
          { name: '其他', value: 15, fill: THEME_COLORS.pink },
        ],
        // 3. 热销特征 & 4. 风格趋势：标签化展示
        featureTags: ['轻量化', '透气网面', '老爹鞋型', '学院风', '极简白', '联名款'],
        styleEvolution: "流行元素从‘复古老爹’向‘流线型极简’演变，‘山系机能’风格作为新兴势力增长强劲。",
        // 5. 建议发展方向
        recommendations: [
          "深化 ¥200-299 价格段布局，推出高性价比机能风鞋款。",
          "强化线上视觉呈现的‘轻盈感’与‘生活场景化’，提升转换。",
          "关注新兴品类：户外徒步鞋与休闲通勤鞋的跨界融合点。"
        ]
      };
    } else if (isDress) {
      return {
        title: "女性连衣裙风格趋势与市场研报",
        summaryMetrics: [
          { label: '核心价格带', value: '¥399-699', icon: DollarSign, color: THEME_COLORS.pink },
          { label: '产地集中度', value: '江苏苏州 (35%)', icon: MapPin, color: THEME_COLORS.blue },
          { label: '爆款主特征', value: '法式/碎花', icon: Tag, color: THEME_COLORS.green },
        ],
        priceDist: [
          { name: '0-199', value: 10 },
          { name: '200-399', value: 25 },
          { name: '400-699', value: 50 },
          { name: '700+', value: 15 },
        ],
        regionData: [
          { name: '江苏', value: 35, fill: THEME_COLORS.blue },
          { name: '浙江', value: 30, fill: THEME_COLORS.green },
          { name: '广东', value: 20, fill: THEME_COLORS.yellow },
          { name: '其他', value: 15, fill: THEME_COLORS.pink },
        ],
        featureTags: ['泡泡袖', '法式复古', '小碎花', '醋酸面料', '名媛风', '收腰设计'],
        styleEvolution: "‘法式碎花’热度不减，但‘新中式国风’连衣裙在近一个季度搜索量暴增，成为最大的Emerging Style。",
        recommendations: [
          "聚焦 400-699 价格段，主打‘面料高级感’与‘剪裁修身’。",
          "将‘法式复古’与‘新中式’元素进行创新融合，打造差异化爆款。",
          "拓展‘轻婚纱’或‘通勤礼服’等特定场景，挖掘小众蓝海。"
        ]
      };
    }
    
    // 默认兜底逻辑：针对全品类的深度分析
    return {
      title: "品类市场竞争态势与特征洞察",
      summaryMetrics: [
        { label: '主流价格带', value: '¥100-199', icon: DollarSign, color: THEME_COLORS.blue },
        { label: '集中产地', value: '广东/浙江 (60%+)', icon: MapPin, color: THEME_COLORS.green },
        { label: '爆款关键词', value: '性价比/简约', icon: Tag, color: THEME_COLORS.yellow },
      ],
      priceDist: [
        { name: '0-49', value: 20 },
        { name: '50-99', value: 25 },
        { name: '100-199', value: 40 },
        { name: '200+', value: 15 },
      ],
      regionData: [
        { name: '广东', value: 35, fill: THEME_COLORS.blue },
        { name: '浙江', value: 25, fill: THEME_COLORS.green },
        { name: '江苏', value: 20, fill: THEME_COLORS.yellow },
        { name: '其他', value: 20, fill: THEME_COLORS.pink },
      ],
      featureTags: ['简约', '高性价比', '百搭', '基础款', '莫代尔', '透气'],
      styleEvolution: "市场整体向‘实用主义’和‘悦己消费’靠拢，极度繁复的设计热度下降，简约高质量的基础款受到追捧。",
      recommendations: [
        "加强核心 ¥100-199 价格段的基础款布局，确保供应链优势。",
        "通过社交媒体强化品牌‘高性价比’与‘高质量’的认知。",
        "探索定制化或个性化小服务，提升用户粘性。"
      ]
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
    setReportData(generateDeepInsights(file.name));
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
    <div style={{ minHeight: '100vh', backgroundColor: THEME_COLORS.bg, display: 'flex', color: THEME_COLORS.text, fontFamily: '"Noto Sans SC", sans-serif', overflow: 'hidden' }}>
      
      {/* 侧边栏：UI 保持不变 */}
      <aside style={{ width: '85px', backgroundColor: THEME_COLORS.sidebar, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', borderRight: `1px solid #D1E9E2`, zIndex: 10 }}>
        <div style={{ width: '45px', height: '45px', backgroundColor: THEME_COLORS.blue, borderRadius: '16px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <PawPrint size={22} />
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px', color: '#7FB2A8' }}>
          <Home size={24} onClick={handleReset} style={{ cursor: 'pointer', opacity: activeTab === 'home' ? 1 : 0.4 }} />
          <FileBarChart size={24} style={{ cursor: 'pointer', opacity: activeTab === 'report' ? 1 : 0.4 }} />
          <History size={24} style={{ cursor: 'pointer', opacity: 0.4 }} />
        </nav>
      </aside>

      <main style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', padding: '40px 40px 100px 40px', overflowY: 'auto' }}>
        
        {/* 背景水彩氛围色块：保留原本审美 */}
        <div style={{ position: 'absolute', top: '10%', right: '15%', width: '450px', height: '450px', background: THEME_COLORS.blue, filter: 'blur(120px)', opacity: 0.2, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '400px', height: '400px', background: THEME_COLORS.green, filter: 'blur(100px)', opacity: 0.25, zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '5%', width: '300px', height: '300px', background: THEME_COLORS.pink, filter: 'blur(100px)', opacity: 0.15, zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1100px' }}>
          
          {/* 主页上传状态：保持不变 */}
          {activeTab === 'home' && (
            <div className="fade-in" style={{ textAlign: 'center', marginTop: '100px' }}>
              <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2D3748' }}>Insight Engine</h1>
                <p style={{ color: THEME_COLORS.subText, marginTop: '8px' }}>让数据分析充满人文温度</p>
              </header>

              <div style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '70px 45px', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 25px 50px -12px rgba(164, 200, 225, 0.15)' }}>
                <input id="file-upload" type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div style={{ width: '80px', height: '80px', background: `linear-gradient(135deg, ${THEME_COLORS.sidebar} 0%, ${THEME_COLORS.bg} 100%)`, borderRadius: '24px', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7FB2A8' }}>
                  <UploadCloud size={38} />
                </div>
                <h3 style={{ fontSize: '20px', color: THEME_COLORS.text, marginBottom: '12px' }}>
                  {file ? `识别成功: ${file.name}` : '上传您的市场原始数据'}
                </h3>
                <p style={{ color: THEME_COLORS.subText, fontSize: '14px', marginBottom: '45px' }}>点击下方按钮即可自动关联本地文件夹</p>
                
                <button 
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  style={{ background: `linear-gradient(135deg, ${THEME_COLORS.blue} 0%, ${THEME_COLORS.green} 100%)`, color: 'white', border: 'none', padding: '18px 65px', borderRadius: '22px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 12px 24px rgba(164,200,225,0.3)' }}
                >
                  {isAnalyzing ? '正在进行全方位特征洞察...' : (file ? '开始深度研报分析' : '上传并分析')}
                </button>
              </div>
            </div>
          )}

          {/* --- 深度研报页：彻底重构报告维度 --- */}
          {activeTab === 'report' && reportData && (
            <div className="slide-up">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <button onClick={handleReset} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>
                  <ChevronLeft size={20} /> 返回重传
                </button>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '20px', color: '#2D3748', fontWeight: '800' }}>{reportData.title}</h2>
                  <p style={{ color: THEME_COLORS.subText, fontSize: '12px' }}>数据源: {file?.name}</p>
                </div>
              </div>

              {/* 1. 深度指标卡：展示核心维度总结 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
                {reportData.summaryMetrics.map((m: any, i: number) => (
                  <div key={i} style={{ background: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderBottom: `4px solid ${m.color}`, display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: m.color, background: `${m.color}15`, padding: '15px', borderRadius: '18px' }}><m.icon size={26} /></div>
                    <div>
                      <div style={{ fontSize: '12px', color: THEME_COLORS.subText, letterSpacing: '1px' }}>{m.label}</div>
                      <div style={{ fontSize: '20px', fontWeight: '800', color: '#2D3748', marginTop: '4px' }}>{m.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 分析主体 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', marginBottom: '30px' }}>
                
                {/* 左侧：价格与地域 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  {/* 1. 价格区间分布（原本的饼图位置，改为直观的柱状图） */}
                  <div style={{ background: 'white', borderRadius: '32px', padding: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '25px', color: THEME_COLORS.blue, display: 'flex', alignItems: 'center', gap: '8px' }}><DollarSign size={18}/> 价格区间分布与消费特征解析</h4>
                    <div style={{ height: '220px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={reportData.priceDist} barSize={40}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#F0F4F8" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: THEME_COLORS.subText }} />
                          <YAxis hide={true} />
                          <Tooltip cursor={{ fill: `${THEME_COLORS.blue}10` }} contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }} />
                          <Bar dataKey="value" fill={THEME_COLORS.blue} radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* 2. 地域分布与产地特征（使用饼图可视化呈现） */}
                  <div style={{ background: 'white', borderRadius: '32px', padding: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '25px', color: THEME_COLORS.green, display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={18}/> 产地集中度与区域特征可视化呈现</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'center' }}>
                      <div style={{ height: '180px' }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie data={reportData.regionData} innerRadius={50} outerRadius={80} paddingAngle={8} dataKey="value">
                              {reportData.regionData.map((el: any, i: number) => <Cell key={i} fill={el.fill} stroke="none" />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {reportData.regionData.map((el: any, i: number) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: el.fill }} />{el.name}</span>
                            <span style={{ fontWeight: '700', color: el.fill }}>{el.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：热销特征与风格趋势 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  
                  {/* 3. 热销特征与爆款商品洞察（标签云） */}
                  <div style={{ background: 'white', borderRadius: '32px', padding: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.02)', flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px', color: THEME_COLORS.yellow, display: 'flex', alignItems: 'center', gap: '8px' }}><Tag size={18}/> 爆款商品特征与消费偏好洞察</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                      {reportData.featureTags.map((tag: string, i: number) => (
                        <div key={i} style={{ fontSize: '13px', background: `${THEME_COLORS.yellow}20`, color: '#BF8E0A', padding: '10px 20px', borderRadius: '14px', fontWeight: '500' }}>
                          #{tag}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 4. 风格趋势与流行元素演变 */}
                  <div style={{ background: 'white', borderRadius: '32px', padding: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: THEME_COLORS.pink, display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={18}/> 流行元素演变与新兴风格</h4>
                    <p style={{ fontSize: '14px', lineHeight: '1.7', color: THEME_COLORS.subText, background: THEME_COLORS.bg, padding: '20px', borderRadius: '16px' }}>{reportData.styleEvolution}</p>
                  </div>
                </div>
              </div>

              {/* 5. 建议发展方向（底部的关键行动项） */}
              <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', marginBottom: '40px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '25px', color: '#6A9D92', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lightbulb size={22}/> 智能全链路发展建议
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                  {reportData.recommendations.map((text: string, i: number) => (
                    <div key={i} style={{ fontSize: '14px', lineHeight: '1.6', color: THEME_COLORS.text, background: `${CHART_COLORS[i % CHART_COLORS.length]}10`, padding: '20px', borderRadius: '20px', borderLeft: `5px solid ${CHART_COLORS[i % CHART_COLORS.length]}`, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '40px', fontWeight: '800', color: `${CHART_COLORS[i % CHART_COLORS.length]}20`, fontStyle: 'italic' }}>{i+1}</div>
                      {text}
                    </div>
                  ))}
                </div>

                {/* 保留原本：循环上传的按钮 */}
                <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={handleReset}
                    style={{ background: THEME_COLORS.bg, color: THEME_COLORS.blue, border: `1px solid ${THEME_COLORS.blue}`, padding: '12px 30px', borderRadius: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: '600' }}
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
        aside nav * { transition: opacity 0.3s; }
      `}</style>
    </div>
  );
}