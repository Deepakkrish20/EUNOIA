import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsoleLoader from '../../components/ConsoleLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAppStore } from '../store/useAppStore.js';
import { Target } from 'lucide-react';
import { 
  Button, 
  Input, 
  Table, 
  Loader, 
  Skeleton, 
  EmptyState 
} from '../../components/ui';

// --- PREMIUM CARDLESS EDITORIAL VIEW STUBS (Business-Logic Free) ---

import { DashboardView } from '../../features/dashboard';
import { GoalsView } from '../../features/goals';
import { TasksView } from '../../features/tasks';

const TwinView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-12 ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
      <div className={theme === 'dark-design' ? 'pb-2 border-b border-white/5' : ''}>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Digital Twin Console</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Optimize resume models and generate skill roadmaps.</p>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 py-8 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none gap-8' : 'border-y border-white/10'
      }`}>
        <div className={`space-y-4 transition-all duration-300 ${
          theme === 'dark-design' ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl' : 'pr-0 md:pr-12'
        }`}>
          <h3 className="text-lg font-bold text-white uppercase">Resume Optimizer</h3>
          <p className={`text-[10px] text-[#6c6c6c] tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Scan and format documents against target roles.</p>
          <p className={`text-xs text-[#a0a0a0] leading-relaxed ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : ''}`}>
            Upload your professional credentials to evaluate alignment and get instant optimization suggestions from the Gemini parser.
          </p>
          <Button variant="outline" className={`border-white/20 text-white hover:bg-white/5 text-[10px] ${theme === 'dark-design' ? 'rounded-xl font-sans font-semibold' : 'rounded-none'}`}>Open Resume Panel</Button>
        </div>
        
        <div className={`space-y-4 transition-all duration-300 ${
          theme === 'dark-design' ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl' : 'pl-0 md:pl-12 md:border-l md:border-white/10'
        }`}>
          <h3 className="text-lg font-bold text-white uppercase">Career Roadmap Builder</h3>
          <p className={`text-[10px] text-[#6c6c6c] tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>AI-generated pathways to target skills.</p>
          <p className={`text-xs text-[#a0a0a0] leading-relaxed ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : ''}`}>
            Input a goal or technical domain to structure learning steps, milestones, and resource recommendations.
          </p>
          <Button variant="outline" className={`border-white/20 text-white hover:bg-white/5 text-[10px] ${theme === 'dark-design' ? 'rounded-xl font-sans font-semibold' : 'rounded-none'}`}>Open Roadmap Panel</Button>
        </div>
      </div>
    </div>
  );
};

const TwinResumeView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 max-w-4xl transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Resume Analyzer</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Upload and align documents against target positions</p>
      </div>
      <div className={`space-y-6 py-4 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none' : 'border-l-2 border-[#8898e7] pl-8'
      }`}>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>Document File</label>
          <Input type="file" className={`border-dashed cursor-pointer text-xs ${theme === 'dark-design' ? 'rounded-xl border-white/10' : ''}`} />
        </div>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>Target Role</label>
          <Input placeholder="Enter Target Role (e.g. Senior Staff Engineer)" className={`text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
        </div>
        <div className="pt-4">
          <Button className={`bg-white text-black border-white hover:bg-white/90 ${theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : ''}`}>Analyze Credentials</Button>
        </div>
      </div>
    </div>
  );
};

const TwinRoadmapView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Adaptive Learning Roadmap</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Configure target milestone path</p>
      </div>
      <div className={`py-12 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none bg-white/[0.01] rounded-xl' : 'border-y border-white/10'
      }`}>
        <EmptyState 
          title="No Active Roadmap Found" 
          description="Enter a technical subject or target career goal to build an AI learning pathway."
          action={<Button className={`bg-white text-black border-white hover:bg-white/90 ${theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : ''}`}>Create Roadmap</Button>}
        />
      </div>
    </div>
  );
};

const VisionView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Vision OS Board</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Review alignment statistics and goals timeline.</p>
      </div>
      <div className={`space-y-4 py-8 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none bg-white/[0.01] p-6 rounded-xl' : 'border-y border-white/10'
      }`}>
        <div className={`text-xs tracking-widest uppercase mb-4 animate-pulse ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#8c8c8c]'}`}>Establishing secure connection...</div>
        <Skeleton className={`h-6 w-full bg-white/5 ${theme === 'dark-design' ? 'rounded-lg' : ''}`} />
        <Skeleton className={`h-6 w-5/6 bg-white/5 ${theme === 'dark-design' ? 'rounded-lg' : ''}`} />
        <Skeleton className={`h-6 w-4/5 bg-white/5 ${theme === 'dark-design' ? 'rounded-lg' : ''}`} />
      </div>
    </div>
  );
};

const LegacyView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Legacy Connector</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Legacy database sync indicators</p>
      </div>
      <div className={`flex flex-col items-center justify-center py-16 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none bg-white/[0.01] rounded-xl' : 'border-y border-white/10'
      }`}>
        <Loader size="lg" className={`mb-4 ${theme === 'dark-design' ? 'text-white' : 'text-[#8898e7]'}`} />
        <p className={`text-xs tracking-widest uppercase animate-pulse ${theme === 'dark-design' ? 'text-neutral-400 font-sans' : 'text-[#8c8c8c]'}`}>Establishing remote sync tunnels...</p>
      </div>
    </div>
  );
};

const LearningView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 max-w-2xl transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Learning Hub</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Progress tracking for active curricula</p>
      </div>
      <div className={`space-y-6 py-6 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none' : 'border-y border-white/10'
      }`}>
        <div>
          <div className="flex justify-between text-xs mb-1.5 uppercase font-bold tracking-wide text-white">
            <span>Prisma Database Adapters</span>
            <span className={theme === 'dark-design' ? 'text-green-400' : 'text-[#8898e7]'}>100%</span>
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
          <div className="flex justify-between text-xs mb-1.5 uppercase font-bold tracking-wide text-white">
            <span>Zustand State Stores</span>
            <span className={theme === 'dark-design' ? 'text-neutral-400' : ''}>40%</span>
          </div>
          <div className={`h-1.5 w-full bg-white/10 overflow-hidden border transition-all duration-300 ${
            theme === 'dark-design' ? 'rounded-full border-transparent bg-neutral-800' : 'border-white/5'
          }`}>
            <div className={`h-full transition-all duration-300 ${
              theme === 'dark-design' ? 'bg-white rounded-full' : 'bg-white'
            }`} style={{ width: '40%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 max-w-xl transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>User Profile</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Update your contact info and metadata</p>
      </div>
      <div className={`space-y-4 py-4 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none' : 'border-l-2 border-[#8898e7] pl-8'
      }`}>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>Full Name</label>
          <Input placeholder="Full Name" defaultValue="User" className={`text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
        </div>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>Email Address</label>
          <Input placeholder="Email Address" defaultValue="user@eunoia.os" disabled className={`text-xs opacity-50 cursor-not-allowed ${theme === 'dark-design' ? 'rounded-xl border-white/10 font-sans' : ''}`} />
        </div>
        <div className="pt-4">
          <Button className={`bg-white text-black border-white hover:bg-white/90 ${theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : ''}`}>Save Profile</Button>
        </div>
      </div>
    </div>
  );
};

const SettingsView = () => {
  const { theme } = useAppStore();
  return (
    <div className={`space-y-8 max-w-xl transition-all duration-300 ${
      theme === 'dark-design'
        ? 'bg-[#09090b] border border-white/5 p-8 rounded-2xl shadow-xl font-sans'
        : 'font-mono'
    }`}>
      <div>
        <h1 className={`text-3xl font-extrabold tracking-tight ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>System Settings</h1>
        <p className={`text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Adjust environment configurations and defaults</p>
      </div>
      <div className={`space-y-4 py-4 transition-all duration-300 ${
        theme === 'dark-design' ? 'border-none' : 'border-l-2 border-[#8898e7] pl-8'
      }`}>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>Core Server Port</label>
          <Input placeholder="Core Server Port" defaultValue="5000" className={`text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
        </div>
        <div className="space-y-2">
          <label className={`text-[9px] text-[#6c6c6c] uppercase tracking-wider block ${theme === 'dark-design' ? 'font-sans font-bold' : ''}`}>AI Engine Version</label>
          <Input placeholder="OpenAI / Gemini Model Version" defaultValue="gemini-1.5-flash" className={`text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
        </div>
        <div className="pt-4">
          <Button className={`bg-white text-black border-white hover:bg-white/90 ${theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : ''}`}>Apply Adjustments</Button>
        </div>
      </div>
    </div>
  );
};

const SignInView = () => {
  const { theme } = useAppStore();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 aurora relative z-10">
      <div className={`w-full max-w-sm p-10 border bg-black/60 backdrop-blur-md glow-white transition-all duration-300 ${
        theme === 'dark-design'
          ? 'border-white/10 rounded-2xl font-sans'
          : 'border-[#8898e7]/30 rounded-none font-mono'
      }`}>
        <div className="text-center pb-8">
          <span className={`text-2xl font-black tracking-[0.25em] text-white ${theme === 'dark-design' ? 'font-sans' : ''}`}>
            EUNOIA OS
          </span>
          <p className={`text-[9px] text-[#8c8c8c] mt-2 uppercase tracking-widest ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>Futuristic AI operating system dashboard</p>
        </div>
        <div className="space-y-4">
          <Input placeholder="Email Address" className={`bg-black border-white/20 text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
          <Input type="password" placeholder="Password" className={`bg-black border-white/20 text-xs focus:border-[#8898e7]/50 ${theme === 'dark-design' ? 'rounded-xl border-white/10 focus:border-white/30 font-sans' : ''}`} />
          <Button className={`w-full mt-4 bg-white text-black border-white hover:bg-white/90 ${theme === 'dark-design' ? 'rounded-xl font-sans font-bold' : ''}`}>Sign In</Button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN ROUTER ---

export default function AppRouter() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <ConsoleLoader onFinished={() => setShowLoader(false)} />}
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route path="/auth" element={<SignInView />} />

          {/* Console layout routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardView />} />
            
            {/* Nested Digital Twin Routes */}
            <Route path="twin">
              <Route index element={<TwinView />} />
              <Route path="resume" element={<TwinResumeView />} />
              <Route path="roadmap" element={<TwinRoadmapView />} />
            </Route>

            <Route path="vision" element={<VisionView />} />
            <Route path="legacy" element={<LegacyView />} />
            <Route path="goals" element={<GoalsView />} />
            <Route path="tasks" element={<TasksView />} />
            <Route path="learning" element={<LearningView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
