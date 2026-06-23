import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';

/**
 * DashboardLayout wraps the main administrative console view.
 * Redesigned to 100% replicate the visual aesthetics of titangatequity.com.
 * Embeds the abstract dark 3D sculpture video background, removes all blue boxes,
 * and sets up sharp, zero-radius editorial grid partitions.
 */
export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, setTheme } = useAppStore();

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
    <div className={`flex min-h-screen bg-[#000000] text-[#FFFFFF] ${theme === 'dark-design' ? 'font-sans theme-dark-design' : 'font-mono theme-blueprint'} antialiased relative overflow-hidden selection:bg-white/20 selection:text-white`}>
      
      {/* 1. ELEGANT 3D BACKGROUND VIDEO FROM TITAN GATE */}
      {theme !== 'dark-design' && (
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
        </div>
      )}

      {/* 2. SIDEBAR NAVIGATION - Collapsible Grid Layout */}
      <aside 
        className={`flex flex-col z-10 backdrop-blur-md relative transition-all duration-300 ease-in-out ${
          theme === 'dark-design'
            ? 'bg-[#09090b]/95 border-r border-white/5 shadow-2xl'
            : 'bg-black/40 border-r border-white/10'
        } ${
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden border-r-0'
        }`}
      >
        <div className="w-64 flex flex-col h-full">
          {/* Top Header */}
          <div className={`flex h-20 items-center px-8 border-b ${theme === 'dark-design' ? 'border-white/5' : 'border-white/10'}`}>
            <Link to="/" className={`text-sm font-extrabold tracking-[0.25em] text-white flex items-center gap-2 ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>
              <span className={`h-1.5 w-1.5 bg-white rounded-full ${theme === 'dark-design' ? '' : 'animate-ping'}`}></span>
              EUNOIA OS
            </Link>
          </div>

          {/* Navigation list */}
          <nav className={`flex-1 py-6 overflow-y-auto ${theme === 'dark-design' ? 'space-y-1.5 px-4' : 'space-y-[1px]'}`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              if (theme === 'dark-design') {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center py-2.5 px-4 text-xs tracking-wide rounded-xl transition-all duration-300 ${
                      item.indent ? 'pl-8 text-neutral-400' : 'text-neutral-300'
                    } ${
                      isActive
                        ? 'bg-white text-black font-extrabold shadow-lg shadow-white/10'
                        : 'hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }
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
        </div>
      </aside>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <div 
        className={`flex flex-1 flex-col overflow-hidden z-10 transition-all duration-300 relative ${
          theme === 'dark-design' ? 'bg-[#030303]' : 'bg-black/20 backdrop-blur-sm'
        }`}
      >

        {/* Kernel Top Header */}
        <header className={`flex h-20 items-center justify-between border-b px-8 backdrop-blur-md transition-all duration-300 z-10 ${
          theme === 'dark-design'
            ? 'bg-[#09090b]/80 border-white/5'
            : 'bg-black/40 border-white/10'
        }`}>
          <div className="flex items-center gap-4">
            {/* STYLIZED BURGER TOGGLE BUTTON */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 px-3 border transition-all duration-300 flex items-center gap-3 text-[9px] tracking-[0.15em] uppercase text-white ${
                theme === 'dark-design'
                  ? 'border-white/5 hover:border-white/20 hover:bg-white/5 rounded-full font-sans font-bold'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5 rounded-none font-mono'
              }`}
              aria-label="Toggle Console Navigation Menu"
            >
              <div className="flex flex-col gap-[3px] w-3.5">
                <span className={`h-[1px] bg-white transition-all duration-300 origin-left ${isSidebarOpen ? 'rotate-45 translate-y-[0.5px] translate-x-[1px]' : ''}`}></span>
                <span className={`h-[1px] bg-white transition-all duration-300 ${isSidebarOpen ? 'opacity-0 scale-0' : ''}`}></span>
                <span className={`h-[1px] bg-white transition-all duration-300 origin-left ${isSidebarOpen ? '-rotate-45 -translate-y-[0.5px] translate-x-[1px]' : ''}`}></span>
              </div>
              <span>Console Menu</span>
            </button>

            <div className={`text-[10px] font-medium tracking-[0.15em] text-[#8c8c8c] flex items-center gap-2 border-l pl-4 h-6 ${
              theme === 'dark-design' ? 'border-white/5' : 'border-white/10'
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full ${theme === 'dark-design' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-white animate-pulse'}`}></span>
              KERNEL ACTIVE
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setTheme(theme === 'blueprint' ? 'dark-design' : 'blueprint')}
              className={`p-2 px-3 border transition-all duration-300 flex items-center gap-2 text-[9px] tracking-[0.15em] uppercase text-white ${
                theme === 'dark-design'
                  ? 'border-white/5 hover:border-white/20 hover:bg-white/5 rounded-full font-sans font-bold'
                  : 'border-white/10 hover:border-white/30 hover:bg-white/5 rounded-none font-mono'
              }`}
            >
              <span>{theme === 'blueprint' ? 'Blueprint Mode' : 'Minimalist Mode'}</span>
            </button>
            <span className={`text-[10px] tracking-[0.15em] text-[#8c8c8c] ${theme === 'dark-design' ? 'font-sans' : 'font-mono'}`}>SYS // V1.0.0</span>
            <div className={`h-8 w-8 border flex items-center justify-center font-bold text-[10px] text-white bg-white/5 transition-all duration-300 ${
              theme === 'dark-design'
                ? 'rounded-full border-white/10 font-sans bg-white/10 hover:bg-white/20'
                : 'rounded-none border-white/20 font-mono'
            }`}>
              C
            </div>
          </div>
        </header>

        {/* Main scroll content panel */}
        <main className="flex-1 overflow-y-auto p-12 scroll-smooth z-10 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
