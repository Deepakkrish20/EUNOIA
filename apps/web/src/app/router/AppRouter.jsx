import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ConsoleLoader from '../../components/ConsoleLoader';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Input, 
  Table, 
  Loader, 
  Skeleton, 
  EmptyState 
} from '../../components/ui';

// --- PREMIUM VISUAL VIEW STUBS (Business-Logic Free) ---

import { DashboardView } from '../../features/dashboard';

const TwinView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Digital Twin Console</h1>
    <p className="text-sm text-muted">Optimize resume models and generate skill roadmaps.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Resume Optimizer</CardTitle>
          <CardDescription>Scan and format documents against target roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary leading-relaxed mb-6">
            Upload your professional credentials to evaluate alignment and get instant optimization suggestions from the Gemini parser.
          </p>
          <Button variant="outline">Open Resume Panel</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Career Roadmap Builder</CardTitle>
          <CardDescription>AI-generated pathways to target skills.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-secondary leading-relaxed mb-6">
            Input a goal or technical domain to structure learning steps, milestones, and resource recommendations.
          </p>
          <Button variant="outline">Open Roadmap Panel</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

const TwinResumeView = () => (
  <div className="space-y-6 max-w-4xl">
    <h1 className="text-3xl font-extrabold tracking-tight">Resume Analyzer</h1>
    <Card>
      <CardHeader>
        <CardTitle>Upload Document</CardTitle>
        <CardDescription>Supported formats: PDF, DOCX (JSON Schema extraction)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="file" className="border-dashed cursor-pointer" />
        <Input placeholder="Enter Target Role (e.g. Senior Staff Engineer)" />
      </CardContent>
      <CardFooter>
        <Button>Analyze Credentials</Button>
      </CardFooter>
    </Card>
  </div>
);

const TwinRoadmapView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Adaptive Learning Roadmap</h1>
    <Card>
      <CardHeader>
        <CardTitle>Path Generation</CardTitle>
        <CardDescription>Configure target milestone path</CardDescription>
      </CardHeader>
      <CardContent>
        <EmptyState 
          title="No Active Roadmap Found" 
          description="Enter a technical subject or target career goal to build an AI learning pathway."
          action={<Button>Create Roadmap</Button>}
        />
      </CardContent>
    </Card>
  </div>
);

const VisionView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Vision OS Board</h1>
    <p className="text-sm text-muted">Review alignment statistics and goals timeline.</p>
    <Card>
      <CardHeader>
        <CardTitle>Loading Metrics...</CardTitle>
        <CardDescription>Establishing secure connection</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/5" />
      </CardContent>
    </Card>
  </div>
);

const LegacyView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Legacy Connector</h1>
    <Card>
      <CardHeader>
        <CardTitle>System Bridge</CardTitle>
        <CardDescription>Legacy database sync indicators</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Loader size="lg" className="mb-4" />
        <p className="text-sm text-muted">Establishing remote sync tunnels...</p>
      </CardContent>
    </Card>
  </div>
);

const GoalsView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Strategic Goals</h1>
    <EmptyState 
      title="Create Your First Goal"
      description="Define milestone targets to calibrate task boards and learning pathways."
      action={<Button>Create Goal</Button>}
    />
  </div>
);

const TasksView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Operational Tasks</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="bg-popover/40 border-b border-border/60 pb-3">
          <CardTitle className="text-sm uppercase tracking-wider text-muted">To Do</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="p-3 bg-secondary/15 border border-border/80 rounded-lg text-xs">Verify Clerk JWKS JWT decoding</div>
          <div className="p-3 bg-secondary/15 border border-border/80 rounded-lg text-xs">Configure PostgreSQL schema seeds</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-popover/40 border-b border-border/60 pb-3">
          <CardTitle className="text-sm uppercase tracking-wider text-muted">In Progress</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="p-3 bg-secondary/15 border border-primary/20 rounded-lg text-xs">Overhaul design system layouts</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-popover/40 border-b border-border/60 pb-3">
          <CardTitle className="text-sm uppercase tracking-wider text-muted">Completed</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="p-3 bg-secondary/15 border border-border/80 rounded-lg text-xs line-through opacity-55">Setup monorepo directories</div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const LearningView = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-extrabold tracking-tight">Learning Hub</h1>
    <Card>
      <CardHeader>
        <CardTitle>Verified Skills Progress</CardTitle>
        <CardDescription>Progress tracking for active curricula</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span>Prisma Database Adapters</span>
            <span className="text-primary font-bold">100%</span>
          </div>
          <div className="h-2 w-full bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '100%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span>Zustand State Stores</span>
            <span className="text-primary font-bold">40%</span>
          </div>
          <div className="h-2 w-full bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '40%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ProfileView = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-3xl font-extrabold tracking-tight">User Profile</h1>
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Update your contact info and metadata</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Full Name" defaultValue="User" />
        <Input placeholder="Email Address" defaultValue="user@eunoia.os" disabled />
      </CardContent>
      <CardFooter>
        <Button>Save Profile</Button>
      </CardFooter>
    </Card>
  </div>
);

const SettingsView = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
    <Card>
      <CardHeader>
        <CardTitle>Configuration Options</CardTitle>
        <CardDescription>Adjust environment configurations and defaults</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Core Server Port" defaultValue="5000" />
        <Input placeholder="OpenAI / Gemini Model Version" defaultValue="gemini-1.5-flash" />
      </CardContent>
      <CardFooter>
        <Button>Apply Adjustments</Button>
      </CardFooter>
    </Card>
  </div>
);

const SignInView = () => (
  <div className="min-h-screen bg-background flex items-center justify-center p-6 aurora">
    <Card className="w-full max-w-sm p-8 shadow-2xl border border-primary/20 glow-blue">
      <div className="text-center pb-6">
        <span className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          EUNOIA OS
        </span>
        <p className="text-xs text-muted mt-2">Futuristic AI operating system dashboard</p>
      </div>
      <div className="space-y-4">
        <Input placeholder="Email Address" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full mt-2">Sign In</Button>
      </div>
    </Card>
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
