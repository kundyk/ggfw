import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Activity, Maximize, DollarSign, TrendingUp, MapPin, CheckCircle2, Clock, Calendar, Zap, Target, Layers, X, ArrowRight, History } from 'lucide-react';
import SandboxSimulation from './components/SandboxSimulation';
import { motion, AnimatePresence } from 'motion/react';
import { overallMetrics, subDistricts, visionMetrics } from './data';

const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setDisplayValue(start + (end - start) * easeProgress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  const formatted = Number.isInteger(value) ? Math.round(displayValue) : displayValue.toFixed(1);

  return <span>{formatted}</span>;
};

const mapNodes = [
  { id: 'qingshuihe', name: '清水河', cx: 30, cy: 25 },
  { id: 'dongxiao', name: '东晓', cx: 50, cy: 30 },
  { id: 'donghu', name: '东湖', cx: 75, cy: 35 },
  { id: 'sungang', name: '笋岗', cx: 35, cy: 45 },
  { id: 'cuizhu', name: '翠竹', cx: 55, cy: 48 },
  { id: 'guiyuan', name: '桂园', cx: 25, cy: 65 },
  { id: 'dongmen', name: '东门', cx: 45, cy: 62 },
  { id: 'nanhu', name: '南湖', cx: 40, cy: 80 },
  { id: 'huangbei', name: '黄贝', cx: 65, cy: 68 },
  { id: 'liantang', name: '莲塘', cx: 85, cy: 60 },
];

const connections = [
  ['qingshuihe', 'dongxiao'],
  ['dongxiao', 'donghu'],
  ['qingshuihe', 'sungang'],
  ['dongxiao', 'cuizhu'],
  ['sungang', 'cuizhu'],
  ['sungang', 'guiyuan'],
  ['guiyuan', 'dongmen'],
  ['cuizhu', 'dongmen'],
  ['dongmen', 'nanhu'],
  ['dongmen', 'huangbei'],
  ['huangbei', 'liantang'],
  ['donghu', 'liantang'],
  ['cuizhu', 'huangbei']
];

const TechPanel = ({ title, children, className = "" }: { title?: string, children: React.ReactNode, className?: string }) => (
  <div className={`tech-panel flex flex-col p-4 ${className}`}>
    <div className="tech-panel-bottom-left"></div>
    <div className="tech-panel-bottom-right"></div>
    {title && (
      <div className="mb-3 flex items-center gap-2 border-b border-blue-900/50 pb-2 shrink-0">
        <div className="w-1 h-4 bg-cyan-400"></div>
        <h3 className="text-cyan-400 font-bold tracking-wider text-sm glow-text">{title}</h3>
      </div>
    )}
    <div className="flex-1 min-h-0 flex flex-col">
      {children}
    </div>
  </div>
);

const MetricBox = ({ title, value, unit, icon: Icon, color }: { title: string, value: number, unit: string, icon: any, color: string }) => (
  <div className="bg-blue-950/40 border border-blue-900/50 p-3 rounded relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    <div className="flex justify-between items-start mb-2">
      <span className="text-xs text-blue-300">{title}</span>
      <Icon className={`w-4 h-4 ${color} opacity-80`} />
    </div>
    <div className="flex items-baseline gap-1">
      <span className={`text-xl font-bold ${color} glow-text`}>
        <AnimatedNumber value={value} />
      </span>
      <span className="text-xs text-blue-400/60">{unit}</span>
    </div>
  </div>
);

const MapNode = ({ node, selected, onClick, isPast }: { key?: React.Key, node: any, selected: boolean, onClick: (id: string) => void, isPast?: boolean }) => {
  return (
    <g transform={`translate(${node.cx}, ${node.cy})`} onClick={() => onClick(node.id)} className="cursor-pointer group">
      <circle r="6" fill="transparent" className="group-hover:fill-cyan-500/20 transition-colors" />
      <circle r={selected ? (isPast ? 2 : 3) : 1.5} fill={selected ? (isPast ? "#475569" : "#22d3ee") : (isPast ? "#1e293b" : "#60a5fa")} className={selected && !isPast ? "animate-pulse" : ""} style={{ transition: 'all 1.5s ease-in-out' }} />
      {selected && !isPast && <circle r="6" fill="none" stroke="#22d3ee" strokeWidth="0.5" className="animate-ping opacity-75" />}
      <text y={selected ? -6 : -4} textAnchor="middle" fill={selected ? (isPast ? "#94a3b8" : "#67e8f9") : (isPast ? "#334155" : "#94a3b8")} fontSize="3" className={`transition-all duration-1000 ${selected && !isPast ? "font-bold glow-text" : "group-hover:fill-blue-300"}`}>
        {node.name}
      </text>
    </g>
  )
};

const getPastValue = (data: any) => {
  if (data.unit === '%') return Math.floor(data.value * 0.2);
  if (['处', '个', '家', '中心', '项', '批'].includes(data.unit)) return 0;
  if (['万㎡', '㎡', '万', '万元', '年'].includes(data.unit)) return 0;
  if (['人次', '万+'].includes(data.unit)) return Math.floor(data.value * 0.1);
  if (data.unit === '人') return data.value + 10;
  if (['场', '节'].includes(data.unit)) return Math.floor(data.value * 0.3);
  return 0;
};

export default function App() {
  const [selected, setSelected] = useState(subDistricts[0]);
  const [time, setTime] = useState('');
  const [activeTab, setActiveTab] = useState<'vision' | 'achievements'>('achievements');
  const [timeMachine, setTimeMachine] = useState<{ achievement: any, year: 2025 | 2026 } | null>(null);
  const [showSandboxModal, setShowSandboxModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleString('zh-CN', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeMachine?.year === 2025) {
      const timer = setTimeout(() => {
        setTimeMachine(prev => prev ? { ...prev, year: 2026 } : null);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (timeMachine?.year === 2026) {
      const timer = setTimeout(() => {
        setTimeMachine(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [timeMachine?.year]);

  return (
    <div className="h-screen w-screen bg-[#040b14] text-slate-200 font-sans overflow-hidden flex flex-col grid-bg relative">
      <div className="scan-line"></div>
      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 header-bg border-b border-blue-900/50 relative shrink-0">
        <div className="flex-1 flex items-center gap-6">
          <div className="text-cyan-400 text-sm font-mono tracking-widest w-24">{time}</div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('vision')} 
              className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider transition-all ${activeTab === 'vision' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-blue-400/60 border border-transparent hover:text-cyan-400 hover:bg-blue-900/30'}`}
            >
              <Target className="w-4 h-4 inline-block mr-1.5 mb-0.5" />
              改革愿景
            </button>
            <button 
              onClick={() => setActiveTab('achievements')} 
              className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider transition-all ${activeTab === 'achievements' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'text-blue-400/60 border border-transparent hover:text-cyan-400 hover:bg-blue-900/30'}`}
            >
              <Layers className="w-4 h-4 inline-block mr-1.5 mb-0.5" />
              改革成效
            </button>
          </div>
        </div>
        <div className="flex-1 text-center relative">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-200 to-cyan-400 glow-text tracking-widest">
            罗湖区公共服务设施优化改革
          </h1>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 text-cyan-500 bg-cyan-950/30 px-3 py-1 rounded border border-cyan-900/50">
            <Zap className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-mono tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'vision' ? (
        <main className="flex-1 flex flex-col gap-6 p-6 min-h-0 max-w-6xl mx-auto w-full">
          <TechPanel title="改革愿景与目标" className="flex-1">
            <div className="grid grid-cols-2 gap-6 p-6 h-full">
              <div className="bg-blue-950/40 border border-blue-900/50 p-6 rounded-lg flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-50"></div>
                <h4 className="text-cyan-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> 核心理念
                </h4>
                <p className="text-blue-100/80 leading-relaxed">
                  以<strong className="text-cyan-300">民生需求为核心</strong>、<strong className="text-cyan-300">资源集约为路径</strong>、<strong className="text-cyan-300">服务提质为目标</strong>，立足各街道差异，精准提质。
                </p>
              </div>
              
              <div className="bg-blue-950/40 border border-blue-900/50 p-6 rounded-lg flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-50"></div>
                <h4 className="text-emerald-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5" /> 发展格局
                </h4>
                <p className="text-blue-100/80 leading-relaxed">
                  通过设施优化整合与运营模式创新，构建<strong className="text-emerald-300">高质量、高效率、可持续</strong>的基层公共服务新格局。
                </p>
              </div>

              <div className="bg-blue-950/40 border border-blue-900/50 p-6 rounded-lg flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-50"></div>
                <h4 className="text-amber-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" /> 终极目标
                </h4>
                <p className="text-blue-100/80 leading-relaxed">
                  致力于打造<strong className="text-amber-300">“15分钟便民服务圈”</strong>，让改革发展成果更多更公平惠及全体居民。
                </p>
              </div>

              <div className="bg-blue-950/40 border border-blue-900/50 p-6 rounded-lg flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"></div>
                <h4 className="text-purple-400 font-bold text-lg mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5" /> 资源配置
                </h4>
                <p className="text-blue-100/80 leading-relaxed">
                  实现<strong className="text-purple-300">空间资源的最大化利用</strong>与<strong className="text-purple-300">财政投入的最优化配置</strong>，提升整体效能。
                </p>
              </div>
            </div>
          </TechPanel>
          <TechPanel title="核心愿景指标" className="shrink-0">
            <div className="grid grid-cols-4 gap-6 p-6">
              <MetricBox title="目标释放空间" value={visionMetrics.targetSpace} unit="㎡" icon={Maximize} color="text-cyan-400" />
              <MetricBox title="目标节省财政" value={visionMetrics.targetSavings} unit="万元" icon={DollarSign} color="text-emerald-400" />
              <MetricBox title="智慧设施覆盖" value={visionMetrics.smartFacilities} unit="处" icon={Zap} color="text-amber-400" />
              <MetricBox title="服务覆盖率" value={visionMetrics.coverage} unit="%" icon={Activity} color="text-blue-400" />
            </div>
          </TechPanel>
        </main>
      ) : (
        <main className="flex-1 grid grid-cols-12 gap-6 p-6 min-h-0">
          {/* Left Column */}
          <div className="col-span-3 flex flex-col gap-6 min-h-0">
            <TechPanel title="全域核心指标" className="shrink-0">
              <div className="grid grid-cols-2 gap-4 p-2">
                <MetricBox title="累计释放空间" value={overallMetrics.spaceReleased} unit="平方米" icon={Maximize} color="text-cyan-400" />
                <MetricBox title="年度节省财政" value={overallMetrics.annualSavings} unit="万元" icon={DollarSign} color="text-emerald-400" />
                <MetricBox title="预期建设节省" value={overallMetrics.expectedConstructionSavings} unit="万元" icon={TrendingUp} color="text-amber-400" />
                <MetricBox title="整体改革进度" value={overallMetrics.progress} unit="%" icon={Activity} color="text-blue-400" />
              </div>
            </TechPanel>

            <TechPanel title="目标达成进度" className="flex flex-col min-h-0 shrink-0">
              <div className="p-2 flex flex-col gap-3 overflow-y-auto custom-scrollbar">
                
                {/* Space Progress Large Card */}
                <div className="bg-gradient-to-b from-blue-950/40 to-transparent border border-blue-900/30 rounded-xl p-4 flex flex-col justify-center min-h-0">
                  <div className="flex items-center gap-2 mb-3 shrink-0">
                    <div className="p-1.5 bg-cyan-950/50 rounded-lg border border-cyan-800/50">
                      <Maximize className="w-3.5 h-3.5 text-cyan-400"/>
                    </div>
                    <span className="text-cyan-400 font-bold text-sm tracking-wide">空间释放进度</span>
                  </div>
                  
                  <div className="flex items-end gap-2 mb-2 shrink-0">
                    <span className="text-3xl font-black text-cyan-300 glow-text leading-none">{Math.round((overallMetrics.spaceReleased / visionMetrics.targetSpace) * 100)}</span>
                    <span className="text-base text-cyan-500 font-bold mb-0.5">%</span>
                  </div>

                  <div className="h-2.5 bg-[#040b14] rounded-full overflow-hidden border border-blue-900/50 shadow-inner relative mb-3 shrink-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBIMzBMMCAzMHptNDAgMEwwIDBoMTBMMDAgMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative overflow-hidden transition-all duration-1000 ease-out" style={{ width: `${(overallMetrics.spaceReleased / visionMetrics.targetSpace) * 100}%` }}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBIMzBMMCAzMHptNDAgMEwwIDBoMTBMMDAgMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] animate-[slide_2s_linear_infinite]"></div>
                    </div>
                  </div>

                  <div className="space-y-1 mt-auto overflow-y-auto custom-scrollbar pr-1">
                    <div className="flex justify-between items-center py-1 border-b border-blue-900/30">
                      <span className="text-xs text-blue-300/70">已释放空间</span>
                      <span className="text-xs font-bold text-cyan-300">{overallMetrics.spaceReleased} <span className="text-[10px] font-normal text-cyan-500">㎡</span></span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-blue-300/70">规划总目标</span>
                      <span className="text-xs font-bold text-white">{visionMetrics.targetSpace} <span className="text-[10px] font-normal text-blue-400">㎡</span></span>
                    </div>
                  </div>
                </div>

                {/* Savings Progress Large Card */}
                <div className="bg-gradient-to-b from-blue-950/40 to-transparent border border-blue-900/30 rounded-xl p-4 flex flex-col justify-center min-h-0">
                  <div className="flex items-center gap-2 mb-3 shrink-0">
                    <div className="p-1.5 bg-emerald-950/50 rounded-lg border border-emerald-800/50">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400"/>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm tracking-wide">财政节省进度</span>
                  </div>
                  
                  <div className="flex items-end gap-2 mb-2 shrink-0">
                    <span className="text-3xl font-black text-emerald-300 glow-text leading-none">{Math.round((overallMetrics.annualSavings / visionMetrics.targetSavings) * 100)}</span>
                    <span className="text-base text-emerald-500 font-bold mb-0.5">%</span>
                  </div>

                  <div className="h-2.5 bg-[#040b14] rounded-full overflow-hidden border border-blue-900/50 shadow-inner relative mb-3 shrink-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBIMzBMMCAzMHptNDAgMEwwIDBoMTBMMDAgMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
                    <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative overflow-hidden transition-all duration-1000 ease-out" style={{ width: `${(overallMetrics.annualSavings / visionMetrics.targetSavings) * 100}%` }}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBsNDAtNDBIMzBMMCAzMHptNDAgMEwwIDBoMTBMMDAgMTB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMikiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] animate-[slide_2s_linear_infinite]"></div>
                    </div>
                  </div>

                  <div className="space-y-1 mt-auto overflow-y-auto custom-scrollbar pr-1">
                    <div className="flex justify-between items-center py-1 border-b border-blue-900/30">
                      <span className="text-xs text-blue-300/70">已节省资金</span>
                      <span className="text-xs font-bold text-emerald-300">{overallMetrics.annualSavings} <span className="text-[10px] font-normal text-emerald-500">万元</span></span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-xs text-blue-300/70">规划总目标</span>
                      <span className="text-xs font-bold text-white">{visionMetrics.targetSavings} <span className="text-[10px] font-normal text-blue-400">万元</span></span>
                    </div>
                  </div>
                </div>

              </div>
            </TechPanel>
          </div>

          {/* Center Column */}
          <div className="col-span-6 flex flex-col min-h-0">
          <TechPanel className="flex-1 relative" title="罗湖区全域空间分布">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#040b14] to-[#040b14] pointer-events-none"></div>
            
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
              {/* Decorative Background */}
              <g className={`transition-all duration-1000 ${timeMachine?.year === 2025 ? 'opacity-5' : 'opacity-20'}`}>
                <circle cx="50" cy="50" r="30" fill="none" stroke="#06b6d4" strokeWidth="0.2" strokeDasharray="2 4" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: '50px 50px' }} />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" strokeWidth="0.1" strokeDasharray="1 5" className="animate-[spin_30s_linear_infinite_reverse]" style={{ transformOrigin: '50px 50px' }} />
              </g>

              {/* Outline */}
              <polygon points="15,15 60,10 90,20 95,60 80,80 50,95 25,95 10,70" fill="rgba(6, 182, 212, 0.02)" stroke="#1e3a8a" strokeWidth="0.3" strokeDasharray="1 1" />
              
              {/* Connections */}
              {connections.map(([start, end], idx) => {
                const s = mapNodes.find(n => n.id === start);
                const e = mapNodes.find(n => n.id === end);
                if(!s || !e) return null;
                const isPast = timeMachine?.year === 2025;
                return (
                  <line key={idx} x1={s.cx} y1={s.cy} x2={e.cx} y2={e.cy} stroke={isPast ? "#0f172a" : "#1e3a8a"} strokeWidth="0.2" className={isPast ? "" : "animate-pulse"} style={{ transition: 'all 1.5s ease-in-out' }} />
                )
              })}

              {/* Data Streams */}
              {timeMachine?.year !== 2025 && connections.map(([start, end], idx) => {
                const s = mapNodes.find(n => n.id === start);
                const e = mapNodes.find(n => n.id === end);
                if(!s || !e) return null;
                return (
                  <circle key={`stream-${idx}`} r="0.5" fill="#06b6d4" className="opacity-80">
                    <animateMotion dur={`${2 + (idx % 3)}s`} repeatCount="indefinite" path={`M ${s.cx} ${s.cy} L ${e.cx} ${e.cy}`} />
                  </circle>
                )
              })}

              {/* Giant Year Watermark */}
              <text 
                x="50" 
                y="55" 
                textAnchor="middle" 
                fontSize="20" 
                fontWeight="900" 
                fill="rgba(6, 182, 212, 0.15)"
                className="pointer-events-none"
                style={{ 
                  transition: 'all 1.5s ease-in-out',
                  opacity: timeMachine ? 1 : 0,
                  transform: `scale(${timeMachine?.year === 2025 ? 0.8 : 1.1})`,
                  transformOrigin: '50px 55px'
                }}
              >
                {timeMachine?.year === 2025 ? '2025年12月' : '2026年3月'}
              </text>
              <text 
                x="50" 
                y="65" 
                textAnchor="middle" 
                fontSize="4" 
                fontWeight="bold" 
                fill="rgba(6, 182, 212, 0.3)"
                className="pointer-events-none tracking-widest"
                style={{ 
                  transition: 'all 1.5s ease-in-out',
                  opacity: timeMachine ? 1 : 0,
                }}
              >
                {timeMachine?.year === 2025 ? '原公共服务设施现状' : '现有公共服务设施现状'}
              </text>

              {/* Nodes */}
              {mapNodes.map(node => {
                const isPast = timeMachine?.year === 2025;
                return (
                  <MapNode 
                    key={node.id} 
                    node={node} 
                    selected={selected.id === node.id} 
                    onClick={(id) => {
                      const found = subDistricts.find(sd => sd.id === id);
                      if(found) {
                        setSelected(found);
                        setTimeMachine(null);
                      }
                    }} 
                    isPast={isPast}
                  />
                )
              })}

              {/* Facilities */}
              {subDistricts.flatMap(sd => sd.facilities.map((f, idx) => {
                const isSelectedDistrict = selected.id === sd.id;
                const isPast = timeMachine?.year === 2025;
                
                // Scatter effect in the past for the selected district
                const offsetX = isPast && isSelectedDistrict ? (Math.sin(idx * 45) * 12) : 0;
                const offsetY = isPast && isSelectedDistrict ? (Math.cos(idx * 45) * 12) : 0;
                
                const currentCx = f.cx + offsetX;
                const currentCy = f.cy + offsetY;

                const color = isPast ? '#64748b' : (f.status === 'completed' ? '#10b981' : f.status === 'ongoing' ? '#f59e0b' : '#3b82f6');
                const showPulse = isSelectedDistrict && !isPast;
                
                return (
                  <g key={f.id} className={`${isSelectedDistrict ? 'opacity-100' : 'opacity-30'}`}>
                    <circle 
                      cx={currentCx} 
                      cy={currentCy} 
                      r={isSelectedDistrict ? (isPast ? "1.2" : "1.5") : "0.8"} 
                      fill={color} 
                      className={showPulse ? "animate-pulse" : ""} 
                      style={{ transition: 'all 1.5s ease-in-out' }} 
                    />
                    {showPulse && (
                      <circle 
                        cx={currentCx} 
                        cy={currentCy} 
                        r="3" 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="0.2" 
                        className="animate-ping opacity-50" 
                        style={{ transition: 'all 1.5s ease-in-out' }}
                      />
                    )}
                    {isPast && isSelectedDistrict && (
                       <text 
                         x={currentCx} 
                         y={currentCy - 2} 
                         textAnchor="middle" 
                         fill="#94a3b8" 
                         fontSize="1.5" 
                         className="opacity-70"
                         style={{ transition: 'all 1.5s ease-in-out' }}
                       >
                         原分散设施
                       </text>
                    )}
                  </g>
                );
              }))}
            </svg>
            
            {/* Map Legend */}
            <div className={`absolute top-4 left-4 flex flex-col gap-1.5 z-20 bg-blue-950/60 p-2 rounded border border-blue-900/50 backdrop-blur-sm transition-opacity duration-500 ${timeMachine?.year === 2025 ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                <span className="text-[10px] text-blue-200">已完成项目</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]"></div>
                <span className="text-[10px] text-blue-200">在建项目</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
                <span className="text-[10px] text-blue-200">筹划项目</span>
              </div>
            </div>
            
            {/* 5 Dimensions */}
            <div className={`absolute bottom-4 left-4 right-4 grid grid-cols-5 gap-2 z-20 transition-opacity duration-500 ${timeMachine ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              {[
                { title: '空间资源', val: '1.5万㎡' },
                { title: '财政成本', val: '2000万+' },
                { title: '服务品质', val: '全覆盖' },
                { title: '运营模式', val: '社会化40%' },
                { title: '阵地功能', val: '100%合署' }
              ].map((dim, idx) => (
                <div key={idx} className="bg-blue-950/80 border border-cyan-900/50 p-2 text-center backdrop-blur-sm rounded">
                  <div className="text-[10px] text-blue-300 mb-1">{dim.title}</div>
                  <div className="text-xs text-cyan-400 font-bold glow-text">{dim.val}</div>
                </div>
              ))}
            </div>
          </TechPanel>
          </div>

          {/* Right Column */}
          <div className="col-span-3 flex flex-col min-h-0">
            <TechPanel title="街道详细数据" className="flex-1">
                <div className="p-5 flex flex-col h-full min-h-0">
                  <div className="flex items-center gap-3 mb-5 shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center bg-cyan-950/50 shadow-[0_0_10px_rgba(6,182,212,0.5)] shrink-0">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-wider">{selected.name}</h3>
                      <p className="text-xs text-cyan-400 mt-1 opacity-80">{selected.tagline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6 shrink-0">
                    <div className="bg-gradient-to-br from-[#0a1931] to-[#0d2142] border border-[#254897]/60 p-3 text-center rounded-lg shadow-lg">
                      <div className="text-[10px] text-blue-300 mb-1">释放空间</div>
                      <div className="text-xl font-bold text-cyan-300 glow-text">
                        <AnimatedNumber value={selected.space} />
                        <span className="text-xs font-normal ml-1 text-cyan-500">平方米</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-[#0a1931] to-[#0d2142] border border-[#254897]/60 p-3 text-center rounded-lg shadow-lg">
                      <div className="text-[10px] text-blue-300 mb-1">节省财政</div>
                      <div className="text-xl font-bold text-emerald-400 glow-text">
                        <AnimatedNumber value={selected.savings} />
                        <span className="text-xs font-normal ml-1 text-emerald-500">万元</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                    {/* Core Achievements */}
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-cyan-400">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-bold">亮点成果</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {selected.coreAchievements.map((achievement: any, i: number) => {
                          const isTimeMachineTarget = timeMachine?.achievement.label === achievement.label;
                          const displayValue = (isTimeMachineTarget && timeMachine.year === 2025) ? getPastValue(achievement) : achievement.value;
                          const isBenchmark = achievement.isBenchmark;
                          
                          return (
                            <div 
                              key={i} 
                              className={`bg-blue-950/30 border p-3 text-center rounded-lg transition-all relative overflow-hidden ${isTimeMachineTarget ? 'border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-blue-900/40'} ${isBenchmark ? 'cursor-pointer hover:bg-cyan-900/40 hover:border-cyan-500/50 group' : ''}`}
                              onClick={() => isBenchmark && setShowSandboxModal(true)}
                            >
                              {isBenchmark && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                              <div className="relative z-10">
                                <div className={`text-[10px] mb-1 transition-colors flex items-center justify-center gap-1 ${isTimeMachineTarget ? 'text-cyan-300' : (isBenchmark ? 'text-cyan-400/80 group-hover:text-cyan-300' : 'text-blue-300')}`}>
                                  {achievement.label}
                                  {isBenchmark && <span className="inline-block px-1 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded text-[8px] leading-none">标杆项目</span>}
                                </div>
                                <div className={`text-lg font-bold glow-text transition-colors ${isTimeMachineTarget ? 'text-white' : (isBenchmark ? 'text-cyan-300 group-hover:text-cyan-200' : 'text-blue-100')}`}>
                                  <AnimatedNumber value={displayValue} />
                                  <span className={`text-[10px] font-normal ml-1 transition-colors ${isTimeMachineTarget ? 'text-cyan-300' : (isBenchmark ? 'text-cyan-500 group-hover:text-cyan-400' : 'text-blue-400')}`}>{achievement.unit === '㎡' ? '平方米' : achievement.unit}</span>
                                </div>
                                {isBenchmark && (
                                  <div className={`mt-1.5 text-[10px] flex items-center justify-center gap-1 transition-all duration-300 ${isTimeMachineTarget ? 'text-cyan-300 opacity-100' : 'text-cyan-400/60 opacity-0 group-hover:opacity-100'}`}>
                                    <Layers className="w-3 h-3" /> 
                                    点击进入沙盘模拟
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Portfolio */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 text-blue-400">
                        <Layers className="w-4 h-4" />
                        <span className="text-sm font-bold">项目矩阵</span>
                      </div>
                      <div className="space-y-2">
                        
                        {/* Completed */}
                        {selected.completed.map((item, i) => (
                          <div key={`comp-${i}`} className="flex justify-between items-center bg-blue-950/20 border border-blue-900/30 p-3 rounded-lg hover:bg-blue-900/30 transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]"></div>
                              <span className="text-xs text-blue-200 group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                            <div className="text-sm font-bold text-emerald-400 glow-text">
                              <AnimatedNumber value={item.value} />
                              <span className="text-[10px] font-normal ml-1 text-emerald-600">{item.unit === '㎡' ? '平方米' : item.unit}</span>
                            </div>
                          </div>
                        ))}

                        {/* Ongoing */}
                        {selected.ongoing.map((item, i) => (
                          <div key={`ong-${i}`} className="flex justify-between items-center bg-blue-950/20 border border-blue-900/30 p-3 rounded-lg hover:bg-blue-900/30 transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_#f59e0b]"></div>
                              <span className="text-xs text-blue-200 group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                            <div className="text-sm font-bold text-amber-400 glow-text">
                              <AnimatedNumber value={item.value} />
                              <span className="text-[10px] font-normal ml-1 text-amber-600">{item.unit === '㎡' ? '平方米' : item.unit}</span>
                            </div>
                          </div>
                        ))}

                        {/* Planned */}
                        {selected.planned.map((item, i) => (
                          <div key={`plan-${i}`} className="flex justify-between items-center bg-blue-950/20 border border-blue-900/30 p-3 rounded-lg hover:bg-blue-900/30 transition-colors group">
                            <div className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
                              <span className="text-xs text-blue-200 group-hover:text-white transition-colors">{item.label}</span>
                            </div>
                            <div className="text-sm font-bold text-blue-400 glow-text">
                              <AnimatedNumber value={item.value} />
                              <span className="text-[10px] font-normal ml-1 text-blue-600">{item.unit === '㎡' ? '平方米' : item.unit}</span>
                            </div>
                          </div>
                        ))}
                        
                      </div>
                    </div>
                  </div>
                </div>
            </TechPanel>
          </div>
        </main>
      )}
      
      {/* Sandbox Simulation Overlay */}
      {showSandboxModal && (
        <SandboxSimulation onClose={() => setShowSandboxModal(false)} streetName={selected.name} />
      )}
    </div>
  );
}
