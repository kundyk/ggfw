import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Activity, Map as MapIcon, Layers, ChevronRight, DollarSign, TrendingDown, Building2, Info, ArrowRightLeft, ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, CircleDashed, Image as ImageIcon, X } from 'lucide-react';
import { gisData } from '../gisData';
import SimulatedMap from './SimulatedMap';

interface SandboxSimulationProps {
  onClose: () => void;
  streetName: string;
}

export default function SandboxSimulation({ onClose, streetName }: SandboxSimulationProps) {
  const filteredProjects = gisData.gis_projects.filter(p => p.street === streetName);
  const displayProjects = filteredProjects.length > 0 ? filteredProjects : gisData.gis_projects;

  const [year, setYear] = useState<number>(2024);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(displayProjects[0]?.id || null);

  const selectedProject = selectedProjectId 
    ? displayProjects.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen bg-[#050814] text-slate-200 font-sans overflow-hidden flex flex-col selection:bg-cyan-900 selection:text-cyan-100">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-blue-900/30 bg-[#0a0f1c]/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <MapIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            罗湖区公共服务数字孪生 (GIS)
          </h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
          <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"><LayoutDashboard className="w-4 h-4"/> 综合态势</span>
          <span className="flex items-center gap-1 text-cyan-400 cursor-pointer"><Layers className="w-4 h-4"/> 空间穿透</span>
          <span className="flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"><Activity className="w-4 h-4"/> 效能监测</span>
          <div className="w-px h-6 bg-blue-900/50 mx-2"></div>
          <button 
            onClick={onClose}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 hover:bg-red-950/30 px-3 py-1.5 rounded transition-colors border border-red-900/30"
          >
            <X className="w-4 h-4"/> 退出沙盘
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative flex">
        
        {/* Left Panel: District Overview */}
        <div className="w-80 bg-[#0a0f1c]/90 backdrop-blur-xl border-r border-blue-900/30 p-6 flex flex-col gap-6 z-40 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
          <div>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-cyan-500" />
              全区改革成效总览
            </h2>
            
            <div className="space-y-4">
              <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                <div className="text-xs text-slate-400 mb-1">释放空间总面积</div>
                <div className="text-2xl font-mono font-bold text-cyan-400">
                  {gisData.district_overview.total_space_freed_sqm.toLocaleString()} <span className="text-sm text-cyan-600">m²</span>
                </div>
              </div>

              <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                <div className="text-xs text-slate-400 mb-1">累计节省租金</div>
                <div className="text-2xl font-mono font-bold text-emerald-400">
                  {gisData.district_overview.total_rent_saved_w} <span className="text-sm text-emerald-600">万元</span>
                </div>
              </div>

              <div className="bg-purple-950/30 border border-purple-900/50 rounded-xl p-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />
                <div className="text-xs text-slate-400 mb-1">节省建设投入</div>
                <div className="text-2xl font-mono font-bold text-purple-400">
                  {gisData.district_overview.total_construction_saved_w.toLocaleString()} <span className="text-sm text-purple-600">万元</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
              标杆项目列表
            </h2>
            <div className="space-y-2">
              {displayProjects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-300 ${
                    selectedProjectId === project.id 
                      ? 'bg-cyan-950/50 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className={`font-medium text-sm mb-1 ${selectedProjectId === project.id ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {project.project_name}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{project.street}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                      project.status === '建设中' ? 'bg-blue-900/50 text-blue-400' : 'bg-emerald-900/50 text-emerald-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Map Area */}
        <div className="flex-1 relative p-6 pb-32">
          <SimulatedMap 
            year={year} 
            selectedProjectId={selectedProjectId} 
            onSelectProject={setSelectedProjectId} 
            projects={displayProjects}
          />
        </div>

        {/* Right Panel: Project Details (HUD) */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-6 top-6 bottom-32 w-80 bg-[#0a0f1c]/80 backdrop-blur-xl border border-cyan-900/50 rounded-2xl p-6 flex flex-col shadow-[0_0_40px_rgba(0,0,0,0.8)] z-40"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                  <MapIcon className="w-3 h-3" />
                  {selectedProject.coordinates[0].toFixed(4)}, {selectedProject.coordinates[1].toFixed(4)}
                </div>
                <h2 className="text-xl font-bold text-white leading-tight mb-3">
                  {selectedProject.project_name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlight_tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-[10px] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                
                {/* Transition Progress (Only visible in 2025) */}
                {year === 2025 && selectedProject.transition_progress && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-blue-950/30 rounded-xl p-4 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  >
                    <h3 className="text-xs text-blue-300 uppercase tracking-wider mb-3 flex items-center gap-2 font-bold">
                      <Activity className="w-4 h-4" />
                      整合推进过程 ({selectedProject.transition_progress.current_phase})
                    </h3>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>总体进度</span>
                        <span className="text-blue-400 font-mono">{selectedProject.transition_progress.overall_progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedProject.transition_progress.overall_progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                        />
                      </div>
                    </div>

                    {/* Task List */}
                    <div className="space-y-3">
                      {selectedProject.transition_progress.tasks.map((task, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="mt-0.5">
                            {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                            {task.status === 'in_progress' && <Clock className="w-4 h-4 text-blue-400 animate-pulse" />}
                            {task.status === 'pending' && <CircleDashed className="w-4 h-4 text-slate-600" />}
                          </div>
                          <div>
                            <div className={`text-xs font-bold mb-1 ${
                              task.status === 'completed' ? 'text-emerald-400' : 
                              task.status === 'in_progress' ? 'text-blue-300' : 'text-slate-500'
                            }`}>
                              {task.task}
                            </div>
                            <div className="text-[10px] text-slate-400 leading-relaxed">
                              {task.detail}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Migration Stats (Inflow/Outflow) */}
                {selectedProject.migration_stats && year >= 2026 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900/60 rounded-xl p-4 border border-slate-800"
                  >
                    <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                      资源迁移成效 (流入/流出)
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Outflow */}
                      <div>
                        <div className="flex items-center gap-1 text-xs text-red-400 mb-2 font-medium">
                          <ArrowDownRight className="w-3 h-3" /> 资源流出 (减负)
                        </div>
                        <div className="space-y-2">
                          {selectedProject.migration_stats.outflow.map((stat, i) => (
                            <div key={i} className="flex justify-between items-center bg-red-950/20 px-3 py-2 rounded border border-red-900/30">
                              <span className="text-xs text-slate-300">{stat.label}</span>
                              <span className="text-sm font-mono text-red-400 font-bold">-{stat.value}<span className="text-[10px] ml-1 text-red-500/70">{stat.unit}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Inflow */}
                      <div>
                        <div className="flex items-center gap-1 text-xs text-emerald-400 mb-2 font-medium">
                          <ArrowUpRight className="w-3 h-3" /> 资源流入 (增效)
                        </div>
                        <div className="space-y-2">
                          {selectedProject.migration_stats.inflow.map((stat, i) => (
                            <div key={i} className="flex justify-between items-center bg-emerald-950/20 px-3 py-2 rounded border border-emerald-900/30">
                              <span className="text-xs text-slate-300">{stat.label}</span>
                              <span className="text-sm font-mono text-emerald-400 font-bold">+{stat.value}<span className="text-[10px] ml-1 text-emerald-500/70">{stat.unit}</span></span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Financials */}
                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                  <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-yellow-400" />
                    财务节省分析
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-500 mb-1">节省建设成本</div>
                      <div className="text-lg font-mono text-yellow-400">{selectedProject.financials.construction_saved}<span className="text-xs text-yellow-600 ml-1">万</span></div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 mb-1">年运营节省</div>
                      <div className="text-lg font-mono text-yellow-400">{selectedProject.financials.operation_saved_yearly}<span className="text-xs text-yellow-600 ml-1">万/年</span></div>
                    </div>
                  </div>
                </div>

                {/* Building Profile (if available) */}
                {selectedProject.building_floors && (
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                    <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-400" />
                      建筑剖面功能
                    </h3>
                    <div className="space-y-2">
                      {selectedProject.building_floors.map((floor, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded bg-blue-950/50 border border-blue-900/50 flex items-center justify-center text-blue-400 font-mono text-xs">
                            F{floor.floor}
                          </div>
                          <div className="text-slate-300">{floor.function}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedProject.description && (
                  <div className="text-sm text-slate-400 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
                    {selectedProject.description}
                  </div>
                )}

                {/* Photo Achievements */}
                {selectedProject.achievements && (
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
                    <h3 className="text-xs text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-emerald-400" />
                      改革成果图集
                    </h3>
                    <div className="space-y-4">
                      {selectedProject.achievements
                        .filter(achievement => achievement.year <= year)
                        .slice(-1) // Show only the most recent achievement up to the current year
                        .map((achievement, i) => (
                          <motion.div 
                            key={`${achievement.year}-${i}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-2"
                          >
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-700/50">
                              <img 
                                src={achievement.url} 
                                alt={achievement.title}
                                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-white font-mono border border-white/10">
                                {achievement.year}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-200">{achievement.title}</div>
                              <div className="text-xs text-slate-400 mt-1">{achievement.description}</div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Panel: Time Machine Slider */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] bg-[#0a0f1c]/90 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              改革成果空间时光机
            </h3>
            <div className="text-xs text-cyan-400 font-mono bg-cyan-950/50 px-2 py-1 rounded border border-cyan-900/50">
              当前年份: {year}
            </div>
          </div>
          
          <div className="relative py-2">
            {/* Invisible Slider Overlay */}
            <input 
              type="range" 
              min="2024" 
              max="2028" 
              step="1" 
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              title="拖动或点击切换年份"
            />
            {/* Labels acting as the visual track */}
            <div className="flex justify-between text-xs text-slate-500 font-mono relative z-0 pointer-events-none px-1">
              <span className={`transition-all duration-300 ${year === 2024 ? 'text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>2024 (改革前)</span>
              <span className={`transition-all duration-300 ${year === 2025 ? 'text-blue-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : ''}`}>2025 (整合推进中)</span>
              <span className={`transition-all duration-300 ${year === 2026 ? 'text-cyan-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''}`}>2026 (改革后)</span>
              <span className={`transition-all duration-300 ${year === 2027 ? 'text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>2027</span>
              <span className={`transition-all duration-300 ${year === 2028 ? 'text-white font-bold scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>2028</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
