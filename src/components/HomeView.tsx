import React from 'react';
import type { Project } from '../types/portfolio';
import { ProjectCard } from './ProjectCard';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

interface HomeViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigateProjects: () => void;
  onNavigateAbout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  projects,
  onSelectProject,
  onNavigateProjects,
}) => {
  // 4 Specific projects for the Home Showcase
  const showcaseOrder = [
    'estacio-ai-concept-retouching',
    'smurfs-bus-wrap',
    'toy-story-5-concept-ooh',
    'super-mario-galaxy-concept',
    'oh-boy-rebranding',
    'eu-na-fju-night'
  ];

  const featuredProjects = showcaseOrder
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => p !== undefined);

  return (
    <div className="pb-24 text-left">

      {/* ═══════════════════════════════════════════════
          HERO — FALL FALCI STYLE (IMMERSIVE)
      ═══════════════════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* High-Definition Identity Background Animation */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 animate-slow-pan"
          style={{ backgroundImage: "url('/animacao-fundo-portfolio.gif')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />

        {/* Massive Animated Name */}
        <div className="relative z-20 w-full flex justify-center items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
            className="text-6xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-bold font-heading text-white leading-none tracking-tighter whitespace-nowrap opacity-90"
          >
            PEREZ JESUS
          </motion.h1>
        </div>

        {/* Bottom Bar: Role */}
        <div className="absolute bottom-10 left-0 right-0 px-6 sm:px-12 flex justify-end items-end z-20 pointer-events-auto">

          {/* Role (Bottom Right) */}
          <div className="text-right">
            <h2 className="text-xl sm:text-3xl font-bold font-heading text-white tracking-tight leading-tight">
              <span className="text-[#05F2F2] mr-2">//</span> Diretor de Arte<br/>
              Designer Gráfico
            </h2>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          INTRO — FALL FALCI STYLE
      ═══════════════════════════════════════════════ */}
      <section className="w-full bg-[#050505] pt-16 pb-12 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          {/* Centered Large Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-[1.1] tracking-tight text-center max-w-4xl mx-auto">
            Com mais de 7 anos de experiência, atuo liderando a <span className="text-[#05F2F2]">direção de arte e conceito</span> de campanhas de alto impacto, integrando produção audiovisual, motion e composição de imagem.
          </h2>
          
          {/* Centered small text & button */}
          <div className="w-full flex justify-center mt-2">
            <div className="md:w-3/4 lg:w-1/2 flex flex-col items-center text-center gap-6">
              <p className="text-sm text-[#D9F8F8] text-opacity-90 font-body leading-relaxed">
                Atualmente na Itabus, busco sempre elevar a direção de arte em cada desafio, seja em campanhas OOH, digital ou ativações imersivas.
              </p>
              <motion.button
                onClick={onNavigateProjects}
                className="px-8 py-3.5 border border-white/20 rounded-full text-xs text-white uppercase tracking-widest font-bold hover:bg-gradient-to-br hover:from-[#05F2F2] hover:to-[#03738C] hover:text-[#050505] hover:border-transparent hover:shadow-[0_8px_24px_rgba(5,242,242,0.18)] transition-all duration-300"
                whileHover={{ scale: 1.02, transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.96, transition: { type: "spring" as const, stiffness: 400, damping: 17 } }}
              >
                Veja Meus Trabalhos
              </motion.button>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════
          FEATURED PROJECTS — ASYMMETRIC MASONRY GRID
      ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-20 space-y-16 pb-24">
        
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-white/10">
          <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white tracking-tight">
            Trabalhos Selecionados
          </h2>
          <motion.button
            onClick={onNavigateProjects}
            className="inline-flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-semibold group font-body"
            whileHover={{ scale: 1.02, color: "#fff", transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.96, transition: { type: "spring" as const, stiffness: 400, damping: 17 } }}
          >
            <span>Índice completo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Monumental, strict premium grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredProjects.map((project) => {
            return (
              <motion.div 
                key={project.id} 
                className="col-span-1" 
                variants={itemVariants}
              >
                <ProjectCard
                  project={project}
                  onSelect={onSelectProject}
                  aspectClass="aspect-[16/9]"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};
