import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRightCircle, Info } from 'lucide-react';
import { gisData } from '../gisData';

interface SimulatedMapProps {
  year: number;
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  projects: any[];
}

// Pre-defined positions for projects
const projectPositions: Record<string, { top: number, left: number }> = {
  'p1': { top: 35, left: 40 },
  'p2': { top: 50, left: 45 },
  'p3': { top: 40, left: 45 },
  'p4': { top: 60, left: 35 },
  'p5': { top: 25, left: 50 },
  'p6': { top: 60, left: 45 },
  'p7': { top: 45, left: 25 },
  'p8': { top: 30, left: 55 },
  'p9': { top: 55, left: 50 },
  'p10': { top: 25, left: 25 }
};

export default function SimulatedMap({ year, selectedProjectId, onSelectProject, projects }: SimulatedMapProps) {
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  const selectedProjectData = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId) 
    : null;

  return (
    <div className="w-full h-full bg-[#040b14] rounded-2xl border border-blue-900/50 relative overflow-hidden flex items-center justify-center">
      {/* Electronic Map Background (OSM with Dark/GIS Filter) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <iframe 
          title="Electronic Map"
          width="100%" 
          height="100%" 
          src="https://www.openstreetmap.org/export/embed.html?bbox=114.05%2C22.52%2C114.20%2C22.60&layer=mapnik" 
          style={{ 
            border: 0,
            filter: 'invert(100%) hue-rotate(180deg) brightness(80%) contrast(120%) saturate(150%)',
            pointerEvents: 'none',
            transform: 'scale(1.05)' // Hide iframe borders
          }}
        />
        {/* Overlay to blend with the dark GIS theme */}
        <div className="absolute inset-0 bg-[#040b14]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color pointer-events-none" />
      </div>

      {/* Grid Background (Faint) */}
      <div 
        className="absolute inset-0 opacity-10 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* SVG Flow Lines Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <AnimatePresence>
          {year >= 2025 && selectedProjectData && selectedProjectData.old_locations && (
            selectedProjectData.old_locations.map((oldLoc, i) => {
              const target = projectPositions[selectedProjectData.id] || { top: 50, left: 50 };
              // Calculate a curved path (quadratic bezier)
              const startX = `${oldLoc.left}%`;
              const startY = `${oldLoc.top}%`;
              const endX = `${target.left}%`;
              const endY = `${target.top}%`;
              const cpX = `${(oldLoc.left + target.left) / 2}%`;
              const cpY = `${Math.min(oldLoc.top, target.top) - 10}%`; // Curve upwards
              
              const pathD = `M ${oldLoc.left} ${oldLoc.top} Q ${(oldLoc.left + target.left) / 2} ${Math.min(oldLoc.top, target.top) - 15} ${target.left} ${target.top}`;

              return (
                <motion.g key={`flow-${selectedProjectData.id}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                  {/* Base Path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#flowGradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-50"
                    vectorEffect="non-scaling-stroke"
                    // We use percentage coordinates in SVG by scaling the viewBox, but since we use absolute %, we can't directly use % in path d.
                    // Instead, we'll use a trick: SVG width/height 100%, viewBox 0 0 100 100, preserveAspectRatio="none"
                  />
                  {/* Animated Flow Line */}
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    filter="url(#glow)"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                  />
                </motion.g>
              );
            })
          )}
        </AnimatePresence>
      </svg>

      {/* Re-render SVG with viewBox for accurate percentage-based paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <AnimatePresence>
          {year >= 2025 && selectedProjectData && selectedProjectData.old_locations && (
            selectedProjectData.old_locations.map((oldLoc, i) => {
              const target = projectPositions[selectedProjectData.id] || { top: 50, left: 50 };
              const pathD = `M ${oldLoc.left} ${oldLoc.top} Q ${(oldLoc.left + target.left) / 2} ${Math.min(oldLoc.top, target.top) - 10} ${target.left} ${target.top}`;

              return (
                <motion.g key={`flow-path-${selectedProjectData.id}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <path
                    d={pathD}
                    fill="none"
                    stroke="url(#flowGradient)"
                    strokeWidth="0.5"
                    strokeDasharray="1 1"
                    className="opacity-50"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="0.8"
                    filter="url(#glow)"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                </motion.g>
              );
            })
          )}
        </AnimatePresence>
      </svg>

      {/* Map Nodes Layer */}
      <div className="absolute inset-0 w-full h-full z-30">
        {/* Render "Old" Locations */}
        <AnimatePresence>
          {year >= 2024 && projects.flatMap(project => {
            const isSelected = selectedProjectId === project.id;
            // In 2024, show ALL old locations. In 2025+, show ONLY selected project's old locations.
            if (year > 2024 && !isSelected) return [];

            return (project.old_locations || []).map((oldLoc: any, i: number) => (
              <motion.div
                key={`old-${project.id}-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: year >= 2026 ? 0.3 : (isSelected ? 1 : 0.5), 
                  scale: isSelected ? 1 : 0.8 
                }}
                exit={{ opacity: 0, scale: 0 }}
                className={`absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-help ${isSelected ? 'z-40' : 'z-20'}`}
                style={{ top: `${oldLoc.top}%`, left: `${oldLoc.left}%` }}
                onMouseEnter={() => setHoveredNode({ ...oldLoc, isOld: true })}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`w-3 h-3 rounded-full ${isSelected ? 'bg-red-500/80 border border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)] animate-pulse' : 'bg-red-900/50 border border-red-800/50'}`} />
                {isSelected && (
                  <div className="mt-1 px-1.5 py-0.5 text-[10px] text-red-200 bg-red-950/60 border border-red-900/50 rounded whitespace-nowrap backdrop-blur-sm flex items-center gap-1">
                    {oldLoc.label}
                    <Info className="w-3 h-3 text-red-400" />
                  </div>
                )}
              </motion.div>
            ));
          })}
        </AnimatePresence>

        {/* Main Project Nodes */}
        {projects.map((project) => {
          const isSelected = selectedProjectId === project.id;
          const pos = projectPositions[project.id] || { top: 50, left: 50 };

          return (
            <motion.div
              key={project.id}
              className="absolute cursor-pointer group -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              onClick={() => onSelectProject(project.id)}
              onMouseEnter={() => {
                if (project.new_location_detail) {
                  setHoveredNode({ ...project.new_location_detail, label: project.project_name, isOld: false, top: pos.top, left: pos.left });
                }
              }}
              onMouseLeave={() => setHoveredNode(null)}
              whileHover={{ scale: 1.1 }}
              animate={{
                scale: isSelected ? 1.2 : 1,
                zIndex: isSelected ? 50 : 10,
                opacity: year === 2024 ? (isSelected ? 0.8 : 0.4) : 1
              }}
            >
              {/* Pulse Effect for Selected */}
              {isSelected && year > 2024 && (
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-full animate-ping" />
              )}
              
              <div className={`relative flex flex-col items-center transition-all ${isSelected ? 'text-cyan-300' : 'text-blue-400 group-hover:text-cyan-400'}`}>
                <MapPin className={`w-8 h-8 drop-shadow-[0_0_10px_currentColor] ${isSelected ? 'fill-cyan-900/50' : ''}`} />
                <div className={`mt-2 px-2 py-1 text-xs font-bold rounded backdrop-blur-md whitespace-nowrap border flex items-center gap-1 ${
                  isSelected 
                    ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                    : 'bg-blue-950/50 border-blue-900/50 text-blue-300'
                }`}>
                  {year === 2024 ? `(规划) ${project.project_name}` : project.project_name}
                  <Info className="w-3 h-3 opacity-70" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] w-64 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/50 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden pointer-events-none"
            style={{
              top: `calc(${hoveredNode.top}% - 10px)`,
              left: `calc(${hoveredNode.left}% + 30px)`,
              transform: 'translateY(-50%)' // center vertically relative to the node
            }}
          >
            <div className="h-32 w-full relative">
              <img src={hoveredNode.photo} alt={hoveredNode.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              <div className="absolute bottom-2 left-3 right-3">
                <div className="text-sm font-bold text-white shadow-black drop-shadow-md">{hoveredNode.label}</div>
              </div>
            </div>
            <div className="p-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-700/50 pb-1">
                <span className="text-slate-400">面积</span>
                <span className="text-cyan-300 font-mono">{hoveredNode.area}</span>
              </div>
              <div className="flex justify-between border-b border-slate-700/50 pb-1">
                <span className="text-slate-400">租金/成本</span>
                <span className="text-yellow-400 font-mono">{hoveredNode.rent}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400 block mb-1">当前状态</span>
                <span className={`inline-block px-2 py-1 rounded text-[10px] ${hoveredNode.isOld ? 'bg-red-950/50 text-red-300 border border-red-900/50' : 'bg-emerald-950/50 text-emerald-300 border border-emerald-900/50'}`}>
                  {hoveredNode.status}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Year Indicator Overlay */}
      <div className="absolute top-6 left-6 text-6xl font-bold text-white/5 font-mono pointer-events-none select-none z-10">
        {year}
      </div>
    </div>
  );
}
