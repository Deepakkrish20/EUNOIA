import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsoleLoader from '../../components/ConsoleLoader';
import DashboardLayout from '../layouts/DashboardLayout';
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

const TwinView = () => (
  <div className="space-y-12 font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Digital Twin Console</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Optimize resume models and generate skill roadmaps.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-8 border-y border-white/10">
      <div className="space-y-4 pr-0 md:pr-12">
        <h3 className="text-lg font-bold text-white uppercase">Resume Optimizer</h3>
        <p className="text-[10px] text-[#6c6c6c] tracking-wider uppercase font-mono">Scan and format documents against target roles.</p>
        <p className="text-xs text-[#a0a0a0] leading-relaxed">
          Upload your professional credentials to evaluate alignment and get instant optimization suggestions from the Gemini parser.
        </p>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 text-[10px]">Open Resume Panel</Button>
      </div>
      
      <div className="space-y-4 pl-0 md:pl-12 md:border-l md:border-white/10">
        <h3 className="text-lg font-bold text-white uppercase">Career Roadmap Builder</h3>
        <p className="text-[10px] text-[#6c6c6c] tracking-wider uppercase font-mono">AI-generated pathways to target skills.</p>
        <p className="text-xs text-[#a0a0a0] leading-relaxed">
          Input a goal or technical domain to structure learning steps, milestones, and resource recommendations.
        </p>
        <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 text-[10px]">Open Roadmap Panel</Button>
      </div>
    </div>
  </div>
);

const TwinResumeView = () => (
  <div className="space-y-8 max-w-4xl font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Resume Analyzer</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Upload and align documents against target positions</p>
    </div>
    <div className="space-y-6 border-l-2 border-[#8898e7] pl-8 py-4">
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">Document File</label>
        <Input type="file" className="border-dashed cursor-pointer text-xs" />
      </div>
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">Target Role</label>
        <Input placeholder="Enter Target Role (e.g. Senior Staff Engineer)" className="text-xs focus:border-[#8898e7]/50" />
      </div>
      <div className="pt-4">
        <Button className="bg-white text-black border-white hover:bg-white/90">Analyze Credentials</Button>
      </div>
    </div>
  </div>
);

const TwinRoadmapView = () => (
  <div className="space-y-8 font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Adaptive Learning Roadmap</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Configure target milestone path</p>
    </div>
    <div className="py-12 border-y border-white/10">
      <EmptyState 
        title="No Active Roadmap Found" 
        description="Enter a technical subject or target career goal to build an AI learning pathway."
        action={<Button className="bg-white text-black border-white hover:bg-white/90">Create Roadmap</Button>}
      />
    </div>
  </div>
);

const VisionView = () => (
  <div className="space-y-8 font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Vision OS Board</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Review alignment statistics and goals timeline.</p>
    </div>
    <div className="space-y-4 py-8 border-y border-white/10">
      <div className="text-xs text-[#8c8c8c] tracking-widest uppercase mb-4 animate-pulse">Establishing secure connection...</div>
      <Skeleton className="h-6 w-full bg-white/5" />
      <Skeleton className="h-6 w-5/6 bg-white/5" />
      <Skeleton className="h-6 w-4/5 bg-white/5" />
    </div>
  </div>
);

const LegacyView = () => (
  <div className="space-y-8 font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Legacy Connector</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Legacy database sync indicators</p>
    </div>
    <div className="flex flex-col items-center justify-center py-16 border-y border-white/10">
      <Loader size="lg" className="mb-4 text-[#8898e7]" />
      <p className="text-xs text-[#8c8c8c] tracking-widest uppercase animate-pulse">Establishing remote sync tunnels...</p>
    </div>
  </div>
);





const LearningView = () => (
  <div className="space-y-8 max-w-2xl font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Learning Hub</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Progress tracking for active curricula</p>
    </div>
    <div className="space-y-6 py-6 border-y border-white/10">
      <div>
        <div className="flex justify-between text-xs mb-1.5 uppercase font-bold tracking-wide text-white">
          <span>Prisma Database Adapters</span>
          <span className="text-[#8898e7]">100%</span>
        </div>
        <div className="h-1 w-full bg-white/10 overflow-hidden border border-white/5">
          <div className="h-full bg-[#8898e7]" style={{ width: '100%' }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1.5 uppercase font-bold tracking-wide text-white">
          <span>Zustand State Stores</span>
          <span>40%</span>
        </div>
        <div className="h-1 w-full bg-white/10 overflow-hidden border border-white/5">
          <div className="h-full bg-white" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  </div>
);

const ProfileView = () => (
  <div className="space-y-8 max-w-xl font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">User Profile</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Update your contact info and metadata</p>
    </div>
    <div className="space-y-4 border-l-2 border-[#8898e7] pl-8 py-4">
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">Full Name</label>
        <Input placeholder="Full Name" defaultValue="User" className="text-xs focus:border-[#8898e7]/50" />
      </div>
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">Email Address</label>
        <Input placeholder="Email Address" defaultValue="user@eunoia.os" disabled className="text-xs opacity-50 cursor-not-allowed" />
      </div>
      <div className="pt-4">
        <Button className="bg-white text-black border-white hover:bg-white/90">Save Profile</Button>
      </div>
    </div>
  </div>
);

const SettingsView = () => (
  <div className="space-y-8 max-w-xl font-mono">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
      <p className="text-[10px] text-[#6c6c6c] mt-1 tracking-wider uppercase font-mono">Adjust environment configurations and defaults</p>
    </div>
    <div className="space-y-4 border-l-2 border-[#8898e7] pl-8 py-4">
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">Core Server Port</label>
        <Input placeholder="Core Server Port" defaultValue="5000" className="text-xs focus:border-[#8898e7]/50" />
      </div>
      <div className="space-y-2">
        <label className="text-[9px] text-[#6c6c6c] uppercase tracking-wider block">AI Engine Version</label>
        <Input placeholder="OpenAI / Gemini Model Version" defaultValue="gemini-1.5-flash" className="text-xs focus:border-[#8898e7]/50" />
      </div>
      <div className="pt-4">
        <Button className="bg-white text-black border-white hover:bg-white/90">Apply Adjustments</Button>
      </div>
    </div>
  </div>
);

const SignInView = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-6 aurora relative z-10">
    <div className="w-full max-w-sm p-10 border border-[#8898e7]/30 bg-black/60 backdrop-blur-md glow-white rounded-none font-mono">
      <div className="text-center pb-8">
        <span className="text-2xl font-black tracking-[0.25em] text-white">
          EUNOIA OS
        </span>
        <p className="text-[9px] text-[#8c8c8c] mt-2 uppercase tracking-widest font-mono">Futuristic AI operating system dashboard</p>
      </div>
      <div className="space-y-4">
        <Input placeholder="Email Address" className="bg-black border-white/20 text-xs focus:border-[#8898e7]/50" />
        <Input type="password" placeholder="Password" className="bg-black border-white/20 text-xs focus:border-[#8898e7]/50" />
        <Button className="w-full mt-4 bg-white text-black border-white hover:bg-white/90">Sign In</Button>
      </div>
    </div>
  </div>
);

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
