import React, { useEffect } from 'react';
import { useActivityStore } from '../../app/store/activityStore.js';
import { useGoalStore } from '../../app/store/goalStore.js';
import { useAppStore } from '../../app/store/useAppStore.js';

// Helper to format relative time for audit trail
function formatRelativeTime(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';
  
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHr / 24);

  if (diffSec < 10) return 'Just Now';
  if (diffSec < 60) return `${diffSec} secs ago`;
  if (diffMin < 60) return `${diffMin} mins ago`;
  if (diffHr < 24) return `${diffHr} hours ago`;
  return `${diffDays} days ago`;
}
import { 
  Button, 
  Input, 
  Table 
} from '../../components/ui';
import SplitText from '../../components/SplitText';

/**
 * DashboardView Component.
 * Overhauled to present EUNOIA OS as a premium cardless editorial grid.
 * Replicates the pure monochrome, white-text, blueprint wireframe style of titangatequity.com.
 * All Card component boxes are removed in favor of clean spaced layouts and fine dividing lines.
 */
export function DashboardView() {
  const { recentActivities, fetchRecentActivities } = useActivityStore();
  const { goals, fetchGoals } = useGoalStore();
  const { theme } = useAppStore();

  useEffect(() => {
    fetchRecentActivities();
    fetchGoals();
  }, [fetchRecentActivities, fetchGoals]);

  const activityRows = recentActivities.map((act) => [
    act.action,
    formatRelativeTime(act.createdAt),
    act.entityId ? `/api/${act.entityType || 'goals'}/${act.entityId}` : 'N/A',
    `${act.userId} (USER)`
  ]);

  const displayGoals = goals.slice(0, 3);

  return (
    <div className={`space-y-16 pb-24 ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
      
      {/* 1. HERO SHOWCASE SECTION - Absolute Editorial Grid */}
      <section className={`space-y-6 py-12 border-b relative transition-all duration-300 ${
        theme === 'dark-design' ? 'border-white/5' : 'border-white/10'
      }`}>
        <div className={`inline-flex items-center gap-2 px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-white/5 border border-white/10 text-white rounded-full'
            : 'bg-[#8898e7]/5 border border-[#8898e7]/20 text-[#8898e7]'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${
            theme === 'dark-design' ? 'bg-green-400' : 'bg-[#8898e7] animate-pulse'
          }`}></span>
          EUNOIA KERNEL v1.0.0 ACTIVE
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white font-sans mt-6 leading-[1.05] max-w-4xl uppercase">
          <SplitText text="EMPOWERING YOUR" variant="char" delay={0.05} stagger={0.02} />{' '}
          <span className="text-white block md:inline relative">
            <SplitText text="COGNITIVE TWIN." variant="char" delay={0.35} stagger={0.02} />
          </span>
        </h1>

        <p className={`text-sm md:text-base text-[#8c8c8c] max-w-2xl leading-relaxed mt-6 tracking-wide ${
          theme === 'dark-design' ? 'font-sans' : 'font-mono'
        }`}>
          EUNOIA OS is a luxury, automated AI operating system that aggregates your skills, synchronizes active learning roadmaps, and prepares your career profile for the future.
        </p>

        <div className="flex gap-4 pt-6">
          <Button variant="primary" size="lg" className={`bg-white text-black border-white hover:bg-white/90 ${
            theme === 'dark-design' ? 'rounded-xl font-sans font-bold shadow-2xl shadow-white/5' : 'rounded-none'
          }`}>
            CALIBRATE TWIN
          </Button>
          <Button variant="outline" size="lg" className={`border-white/20 text-white hover:bg-white/5 ${
            theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : 'rounded-none'
          }`}>
            VIEW PREDICTIONS
          </Button>
        </div>
      </section>

      {/* SECTORS FLOW SHOWCASE */}
      <section className={`border-b py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-300 ${
        theme === 'dark-design' ? 'border-white/5' : 'border-white/10'
      }`}>
        <div className="space-y-4">
          <span className={`text-[9px] px-2 py-0.5 border font-bold tracking-widest uppercase transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/10 text-white bg-white/5 rounded-full'
              : 'border-[#8898e7]/30 text-[#8898e7] bg-[#8898e7]/5'
          }`}>
            SECTOR CALIBRATION LOGS
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">
            Active Calibrated Sectors
          </h2>
          <p className={`text-[11px] text-[#8c8c8c] leading-relaxed max-w-md ${
            theme === 'dark-design' ? 'font-sans' : 'font-mono'
          }`}>
            EUNOIA OS continuously index-scans and aligns your cognitive twin against rapid developments in high-value, high-complexity target sectors.
          </p>
        </div>
        <div className="flex flex-col space-y-2 text-2xl md:text-3xl font-extrabold tracking-tighter text-white font-sans uppercase">
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Artificial Intelligence" variant="char" delay={0.1} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Financial Technology" variant="char" delay={0.25} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Space Exploration" variant="char" delay={0.4} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Enterprise Infrastructure" variant="char" delay={0.55} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Healthcare" variant="char" delay={0.7} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Biotech" variant="char" delay={0.85} stagger={0.012} />
          </div>
          <div className={`border-l pl-6 py-1 transition-all duration-300 ${
            theme === 'dark-design'
              ? 'border-white/20 hover:border-white hover:pl-8'
              : 'border-white/10 hover:border-[#8898e7]'
          }`}>
            <SplitText text="Next-Gen Defense" variant="char" delay={1.0} stagger={0.012} />
          </div>
        </div>
      </section>

      {/* 2. STATS & INTERACTION SECTION */}
      <section className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none gap-8' : 'border-b border-white/10'
      }`}>
        
        {/* Human Potential Score */}
        <div className={`flex flex-col justify-between transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pr-0 lg:pr-12'
        }`}>
          <div className="pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">Human Potential Score</h3>
                <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Overall calibration assessment index</p>
              </div>
              <span className={`text-[9px] px-2 py-0.5 border text-white font-bold tracking-wider uppercase bg-white/5 transition-all duration-300 ${
                theme === 'dark-design' ? 'border-white/10 rounded-full font-sans' : 'border-white/20 font-mono text-[#8898e7] bg-[#8898e7]/5'
              }`}>
                CALIBRATED
              </span>
            </div>
          </div>
          <div className={`py-6 flex items-center justify-between border-y ${
            theme === 'dark-design' ? 'border-white/5' : 'border-white/5'
          }`}>
            <div className="space-y-3">
              <div className="text-5xl font-extrabold tracking-tighter text-white font-sans">
                842
              </div>
              <p className="text-[10px] text-[#8c8c8c] tracking-wide uppercase">
                Top 5% of staff systems developers globally
              </p>
            </div>
            <div className={`h-20 w-20 border flex items-center justify-center font-bold text-[10px] text-white bg-white/5 transition-all duration-300 ${
              theme === 'dark-design' ? 'rounded-2xl border-white/10 font-sans' : 'rounded-none border-white/20 font-mono'
            }`}>
              <span className="tracking-widest">LEVEL 4</span>
            </div>
          </div>
          <div className={`pt-4 text-[9px] text-[#6c6c6c] flex gap-2 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : ''}`}>
            <span>Core Focus:</span>
            <span className="text-white font-bold">Systems Architecture / ML Integration</span>
          </div>
        </div>

        {/* AI Assistant Preview */}
        <div className={`flex flex-col justify-between transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pl-0 lg:pl-12 lg:border-l lg:border-white/10'
        }`}>
          <div className="pb-6">
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">AI Assistant Chat</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Instant prompt calibration and cognitive query checks</p>
          </div>
          <div className={`py-6 space-y-6 border-y ${theme === 'dark-design' ? 'border-white/5' : 'border-white/5'}`}>
            <div className={`p-4 border text-[10px] leading-relaxed transition-all duration-300 ${
              theme === 'dark-design'
                ? 'bg-white/[0.02] border-white/5 text-neutral-300 font-sans rounded-xl border-l-2 border-l-white'
                : 'bg-white/5 border-white/10 text-[#a0a0a0] font-mono border-l-2 border-l-[#8898e7]'
            }`}>
              "How would you like to calibrate your learning path? I have detected new ML modules active in your backend package."
            </div>
            <div className="flex gap-3">
              <Input 
                placeholder="Ask Eunoia Assistant..." 
                className={`bg-black border-white/20 text-white text-[10px] tracking-wide rounded-none focus:border-[#8898e7]/50 ${
                  theme === 'dark-design' ? 'rounded-xl border-white/10 bg-[#060608] focus:border-white/30 focus:ring-0 font-sans' : 'rounded-none font-mono'
                }`} 
              />
              <Button size="md" className={`bg-white text-black border-white hover:bg-white/90 rounded-none ${
                theme === 'dark-design' ? 'rounded-xl font-sans font-bold px-6' : 'rounded-none'
              }`}>
                SEND
              </Button>
            </div>
          </div>
          <div className={`pt-4 text-[9px] text-[#6c6c6c] tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : ''}`}>
            Powered by Google Gemini Flash API Model
          </div>
        </div>

      </section>

      {/* 3. GOALS & PROGRESS SECTION */}
      <section className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none gap-8' : 'border-b border-white/10'
      }`}>
        
        {/* Goals Overview */}
        <div className={`space-y-6 transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pr-0 lg:pr-12'
        }`}>
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">Goals Overview</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Active strategic milestones tracking</p>
          </div>
          <div className="space-y-4">
            {displayGoals.length === 0 ? (
              <div className={`text-[10px] text-[#6c6c6c] uppercase py-4 border border-dashed text-center ${
                theme === 'dark-design' ? 'border-white/5 rounded-xl font-sans' : 'border-white/10 font-mono'
              }`}>
                No active objectives initialized
              </div>
            ) : (
              displayGoals.map((goal) => {
                const percentageMap = {
                  active: '80% ACTIVE',
                  completed: '100% DONE',
                  archived: 'ARCHIVED'
                };
                const statusText = percentageMap[goal.status] || 'ACTIVE';
                const isCompleted = goal.status === 'completed';
                return (
                  <div key={goal.id} className={`flex items-center justify-between p-4 transition-all duration-300 ${
                    theme === 'dark-design'
                      ? 'bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 hover:bg-white/[0.04]'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                  }`}>
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold text-white uppercase tracking-wider ${theme === 'dark-design' ? 'font-sans' : ''}`}>{goal.title}</h4>
                      <p className={`text-[10px] text-[#6c6c6c] uppercase ${theme === 'dark-design' ? 'font-sans' : ''}`}>{goal.description || goal.category}</p>
                    </div>
                    <span className={`text-[9px] font-bold tracking-wider ${
                      isCompleted ? (theme === 'dark-design' ? 'text-green-400' : 'text-[#8898e7]') : 'text-white'
                    } ${goal.status === 'active' ? 'animate-pulse' : ''}`}>
                      {statusText}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Learning Progress */}
        <div className={`space-y-6 transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pl-0 lg:pl-12 lg:border-l lg:border-white/10'
        }`}>
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">Learning Progress</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Calibrated curriculum modules tracker</p>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-white mb-2 uppercase tracking-wide">
                <span>Distributed Ledger Architecture</span>
                <span className={theme === 'dark-design' ? 'text-green-400' : 'text-[#8898e7]'}>100% Complete</span>
              </div>
              <div className={`h-1.5 w-full bg-white/10 overflow-hidden border transition-all duration-300 ${
                theme === 'dark-design' ? 'rounded-full border-transparent bg-neutral-800' : 'border-white/5'
              }`}>
                <div className={`h-full transition-all duration-300 ${
                  theme === 'dark-design' ? 'bg-gradient-to-r from-emerald-400 to-green-500 rounded-full' : 'bg-[#8898e7]'
                }`} style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold text-white mb-2 uppercase tracking-wide">
                <span>AI Prompts Orchestration</span>
                <span>45% In Progress</span>
              </div>
              <div className={`h-1.5 w-full bg-white/10 overflow-hidden border transition-all duration-300 ${
                theme === 'dark-design' ? 'rounded-full border-transparent bg-neutral-800' : 'border-white/5'
              }`}>
                <div className={`h-full transition-all duration-300 ${
                  theme === 'dark-design' ? 'bg-white rounded-full' : 'bg-white'
                }`} style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-bold text-white mb-2 uppercase tracking-wide">
                <span>Database Read Replicas Scaling</span>
                <span className="text-[#6b6b6b]">12% Started</span>
              </div>
              <div className={`h-1.5 w-full bg-white/10 overflow-hidden border transition-all duration-300 ${
                theme === 'dark-design' ? 'rounded-full border-transparent bg-neutral-800' : 'border-white/5'
              }`}>
                <div className={`h-full transition-all duration-300 ${
                  theme === 'dark-design' ? 'bg-neutral-600 rounded-full' : 'bg-white/30'
                }`} style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 4. CAREER TWIN & VISION PREDICTIONS */}
      <section className={`grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none gap-8' : 'border-b border-white/10'
      }`}>
        
        {/* Career Twin Summary */}
        <div className={`space-y-6 transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pr-0 lg:pr-12'
        }`}>
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">Career Twin Summary</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Resume scanner and milestone synchronization state</p>
          </div>
          <div className="space-y-6">
            <div className={`p-4 flex items-center justify-between transition-all duration-300 ${
              theme === 'dark-design'
                ? 'bg-white/[0.02] border border-white/5 rounded-xl'
                : 'bg-white/5 border border-white/10'
            }`}>
              <div className="space-y-1">
                <span className={`text-[9px] font-semibold uppercase tracking-wider ${
                  theme === 'dark-design' ? 'text-green-400' : 'text-[#8898e7]'
                }`}>ACTIVE PROFILE</span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Senior Full Stack Engineer</h4>
              </div>
              <Button variant="outline" size="sm" className={`border-white/20 text-white hover:bg-white/5 text-[9px] px-3 py-1 ${
                theme === 'dark-design' ? 'rounded-lg font-sans font-semibold' : 'rounded-none'
              }`}>MODIFY</Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-4 text-center transition-all duration-300 ${
                theme === 'dark-design'
                  ? 'bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10'
                  : 'bg-white/5 border border-white/10 hover:border-white/30'
              }`}>
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-[9px] text-[#6c6c6c] mt-2 tracking-wider uppercase">Verified Skills</div>
              </div>
              <div className={`p-4 text-center transition-all duration-300 ${
                theme === 'dark-design'
                  ? 'bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10'
                  : 'bg-white/5 border border-white/10 hover:border-white/30'
              }`}>
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-[9px] text-[#6c6c6c] mt-2 tracking-wider uppercase">Active Resumes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Predictions */}
        <div className={`space-y-6 transition-all duration-300 ${
          theme === 'dark-design'
            ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl'
            : 'pl-0 lg:pl-12 lg:border-l lg:border-white/10'
        }`}>
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">Vision Predictions</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>AI-generated industry and technology trend models</p>
          </div>
          <div className="space-y-4 text-[10px] leading-relaxed text-[#a0a0a0] font-mono">
            <div className={`flex gap-4 items-start border-l pl-4 py-1 transition-all duration-300 ${
              theme === 'dark-design' ? 'border-white/20' : 'border-[#8898e7]/30'
            }`}>
              <span className={theme === 'dark-design' ? 'text-white' : 'text-[#8898e7]'}>//</span>
              <p className={theme === 'dark-design' ? 'font-sans text-neutral-300' : ''}>
                **Node API Shifting:** Transition of core Node.js server architectures to Bun/Deno runtimes predicted to peak in Q4 2026.
              </p>
            </div>
            <div className={`flex gap-4 items-start border-l pl-4 py-1 transition-all duration-300 ${
              theme === 'dark-design' ? 'border-white/20' : 'border-[#8898e7]/30'
            }`}>
              <span className={theme === 'dark-design' ? 'text-white' : 'text-[#8898e7]'}>//</span>
              <p className={theme === 'dark-design' ? 'font-sans text-neutral-300' : ''}>
                **AI Agents Integration:** Demand for staff engineers with verified AI prompt orchestration credentials has expanded by **42%** over the last 90 days.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 5. RECENT ACTIVITIES LOG */}
      <section className={`space-y-6 py-12 transition-all duration-300 ${
        theme === 'dark-design' ? 'bg-[#09090b] border border-white/5 rounded-2xl p-8 hover:border-white/10 shadow-xl' : ''
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold tracking-[0.15em] text-white uppercase">System Audit Log</h3>
            <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Telemetry execution audit trails</p>
          </div>
          <Button variant="ghost" size="sm" className="text-[9px] text-[#6c6c6c] hover:text-white p-0 uppercase tracking-widest">
            CLEAR AUDIT LOGS
          </Button>
        </div>
        <div className={`border p-0 overflow-hidden transition-all duration-300 ${
          theme === 'dark-design' ? 'border-white/5 rounded-xl bg-white/[0.01]' : 'border-white/10'
        }`}>
          <Table 
            headers={['Event Log Action', 'Timestamp', 'Target Scope Path', 'Authorization Context']}
            rows={activityRows.length > 0 ? activityRows : [
              ['AUTH_SESSION_VALIDATE', 'Just Now', '/api/auth/session', 'user_clerk_admin_123 (ADMIN)'],
              ['TWIN_SKILL_EXPANDED', '12 mins ago', '/api/twin/state', 'user_clerk_standard_123 (USER)'],
              ['AI_PROMPT_OPTIMIZE', '45 mins ago', '/api/assistant/chat', 'user_clerk_standard_123 (USER)'],
              ['LEGACY_DB_SYNC', '1 hour ago', '/api/legacy/data', 'user_clerk_admin_123 (ADMIN)']
            ]}
            className="text-[10px]"
          />
        </div>
      </section>

    </div>
  );
}
