import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  onNavigateProjects: () => void;
  onNavigateAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateProjects,
  onNavigateAbout
}) => {
  return (
    <footer className="bg-[#050505] border-t border-[#111111]/60 pt-12 pb-10 px-4 sm:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Top: Logo + Nav + Social in one row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          
          <img
            src="/logos/Horizontal Col 2 (High).png"
            alt="Perez Jesus"
            className="h-5 w-auto opacity-60"
          />

          <nav className="flex flex-wrap items-center gap-6 text-xs font-body text-slate-500">
            <motion.button 
              onClick={onNavigateProjects} 
              className="hover:text-white inline-block"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              Projetos
            </motion.button>
            <motion.button 
              onClick={onNavigateAbout} 
              className="hover:text-white inline-block"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              Sobre
            </motion.button>
          </nav>

          <div className="flex items-center gap-5 text-xs font-body text-slate-600">
            <motion.a
              href="https://www.behance.net/perezjesus"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#05F2F2] inline-flex items-center gap-1"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              Behance <ArrowUpRight className="w-3 h-3" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#05F2F2] inline-flex items-center gap-1"
              whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </motion.a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-6 border-t border-[#111111]/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] text-slate-600 font-body">
          <p className="font-semibold text-slate-400">
            Aberto a novas oportunidades de trabalho (CLT ou remoto).
          </p>
          <p>© 2024–2026 Perez Jesus — Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
};
