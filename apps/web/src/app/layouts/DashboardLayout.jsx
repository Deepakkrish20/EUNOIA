import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

/**
 * DashboardLayout wraps the main administrative console view.
 * Redesigned to 100% replicate the visual aesthetics of titangatequity.com.
 * Embeds the abstract dark 3D sculpture video background, removes all blue boxes,
 * and sets up sharp, zero-radius editorial grid partitions.
 */
export default function DashboardLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Digital Twin', path: '/twin' },
    { name: 'Resume Optimizer', path: '/twin/resume', indent: true },
    { name: 'Learning Roadmap', path: '/twin/roadmap', indent: true },
    { name: 'Vision OS', path: '/vision' },
    { name: 'Legacy System', path: '/legacy' },
    { name: 'Goals', path: '/goals' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Learning Hub', path: '/learning' },
    { name: 'User Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#000000] text-[#FFFFFF] font-mono antialiased relative overflow-hidden selection:bg-white/20 selection:text-white">
      
      {/* 1. ELEGANT 3D BACKGROUND VIDEO FROM TITAN GATE & GLOWING BLUE AURORAS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 opacity-60">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1]"
          >
            <source
              src="https://player.vimeo.com/progressive_redirect/playback/1125882576/rendition/1440p/file.mp4?loc=external&signature=a0067ca78212d9ae569da99e8676f4bac2702af80336b7cdf8cef7ce3ef04388"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Ambient Glowing Blue Objects (Auroras) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[130px] animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-[5%] right-[-10%] w-[65%] h-[65%] rounded-full bg-[#4d66e5]/10 blur-[160px] animate-pulse" style={{ animationDuration: '12s' }}></div>
          <div className="absolute top-[35%] left-[25%] w-[50%] h-[50%] rounded-full bg-[#8898e7]/10 blur-[140px] animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>
      </div>

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-[1] opacity-20">
        <div className="blueprint-line-y left-[20%]"></div>
        <div className="blueprint-line-y left-[50%]"></div>
        <div className="blueprint-line-y left-[80%]"></div>
        <div className="blueprint-line-x top-[20%]"></div>
        <div className="blueprint-line-x top-[65%]"></div>
      </div>

      {/* 2. SIDEBAR NAVIGATION - Sharp Webflow Layout Grid */}
      <aside className="w-64 border-r border-white/10 flex flex-col z-10 bg-black/40 backdrop-blur-md relative">
        {/* Top Header */}
        <div className="flex h-20 items-center px-8 border-b border-white/10">
          <Link to="/" className="text-sm font-extrabold tracking-[0.25em] text-white flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping"></span>
            EUNOIA OS
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-[1px] py-6 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-8 py-3 text-[10px] tracking-[0.12rem] uppercase transition-all duration-300 border-y border-transparent ${
                  item.indent 
                    ? 'pl-12 text-[#6c6c6c] border-l border-white/5 hover:text-white' 
                    : 'text-[#8c8c8c] hover:text-white'
                } ${
                  isActive
                    ? 'text-white border-y-white/10 bg-white/5 font-bold animate-[blink_0.8s_ease-out_1]'
                    : 'hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div className="flex flex-1 flex-col overflow-hidden z-10 bg-black/20 backdrop-blur-sm">
        {/* Kernel Top Header */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 px-8 bg-black/40">
          <div className="text-[10px] font-medium tracking-[0.15em] text-[#8c8c8c] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
            KERNEL ACTIVE
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] tracking-[0.15em] text-[#8c8c8c]">SYS // V1.0.0</span>
            <div className="h-8 w-8 rounded-none border border-white/20 flex items-center justify-center font-bold text-[10px] text-white bg-white/5">
              C
            </div>
          </div>
        </header>

        {/* Main scroll content panel */}
        <main className="flex-1 overflow-y-auto p-12 scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
