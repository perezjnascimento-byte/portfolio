import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeTab: 'home' | 'projects' | 'about';
  setActiveTab: (tab: 'home' | 'projects' | 'about') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: 'home' | 'projects' | 'about'; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'projects', label: 'Projetos' },
    { id: 'about', label: 'Sobre' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6 py-8 flex justify-between items-start">
      {/* Top Left: Logo */}
      <div className="pointer-events-auto">
        <motion.button
          onClick={() => setActiveTab('home')}
          className="flex items-center group focus:outline-none"
          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        >
          <img
            src="/logos/Horizontal Col 2 (High).png"
            alt="Perez Jesus"
            className="h-8 w-auto opacity-100"
          />
        </motion.button>
      </div>

      {/* Top Center: Floating Pill Navigation (Matheus Ferreira style) */}
      <div className="pointer-events-auto hidden md:flex items-center bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl">
        <nav className="flex items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-6 py-2.5 text-[13px] uppercase tracking-widest font-bold rounded-full ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Top Right: Status/Badge */}
      <div className="pointer-events-auto hidden lg:flex items-center gap-3 bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-full px-5 py-2.5 shadow-xl text-[10px] tracking-widest text-slate-300 font-bold uppercase">
        <span>RJ / BR</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#05F2F2] animate-pulse shadow-[0_0_8px_#05F2F2]"></span>
      </div>

      {/* Mobile Hamburger */}
      <div className="pointer-events-auto md:hidden bg-[#111111]/80 backdrop-blur-xl border border-white/5 rounded-full p-2 shadow-xl">
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white focus:outline-none"
          whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-4 bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-2 pointer-events-auto shadow-2xl">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-center px-4 py-4 text-[13px] uppercase tracking-[0.2em] font-bold rounded-xl ${
                activeTab === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      )}
    </header>
  );
};
