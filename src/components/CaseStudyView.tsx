import React, { useState } from 'react';
import type { Project } from '../types/portfolio';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onSelectNextProject: (project: Project) => void;
  allProjects: Project[];
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  onBack,
  onSelectNextProject,
  allProjects
}) => {
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  // Find next project in array for footer navigation
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <div className="w-full bg-[#050505] text-left">
      
      {/* 1. HERO BANNER FULL SCREEN */}
      <div className="relative w-full h-[80vh] min-h-[600px] bg-[#050505] overflow-hidden">
        {/* Media */}
        <div className="absolute inset-0 z-0">
          {project.embedUrl ? (
            <iframe
              src={
                project.embedUrl.includes('youtube.com') 
                  ? `${project.embedUrl}&autoplay=1&mute=1&controls=0` 
                  : project.embedUrl
              }
              className="w-full h-full border-0 scale-[1.15]"
              width="1920"
              height="1080"
              allow="autoplay; picture-in-picture"
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          ) : project.videoUrl ? (
            <video src={project.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
          ) : (
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          )}
          {/* Gradient Overlay for Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 px-6 sm:px-12 pt-24 sm:pt-32 z-40">
          <motion.button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full transition-colors border border-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Projetos</span>
          </motion.button>
        </div>

        {/* Title at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 w-full max-w-[1600px] mx-auto px-6 sm:px-12 pb-16 z-30">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-[6rem] font-bold font-heading text-white tracking-tighter leading-[0.9] drop-shadow-2xl"
          >
            {project.title.toUpperCase()}
          </motion.h1>
          {project.subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-xl sm:text-2xl text-slate-300 font-heading max-w-3xl drop-shadow-lg"
            >
              {project.subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* 2. METADATA & TEXT BLOCKS */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: Metadata Sidebar */}
          <div className="lg:col-span-4 space-y-10 border-t border-white/10 pt-8">
            {project.client && (
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Cliente</span>
                <span className="text-white font-body text-base">{project.client}</span>
              </div>
            )}
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Categoria</span>
              <span className="text-white font-body text-base">{project.categories?.join(' / ')}</span>
            </div>
            {project.subcategories && project.subcategories.length > 0 && (
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Subcategorias</span>
                <span className="text-white font-body text-base">{project.subcategories.join(' / ')}</span>
              </div>
            )}
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Créditos / Função</span>
              <span className="text-white font-body text-base leading-relaxed block">{project.credits || project.role}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Ano</span>
              <span className="text-white font-body text-base">{project.year}</span>
            </div>

          </div>

          {/* RIGHT: Text Blocks */}
          <div className="lg:col-span-8 space-y-20 border-t border-white/10 pt-8">
            
            {project.challenge?.problem && (
              <div className="max-w-3xl">
                <h3 className="text-[11px] text-[#05F2F2] uppercase tracking-[0.2em] font-bold mb-6">O Desafio</h3>
                <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed">
                  {project.challenge.problem}
                </p>
              </div>
            )}

            {project.concept?.narrative && (
              <div className="max-w-3xl">
                <h3 className="text-[11px] text-[#05F2F2] uppercase tracking-[0.2em] font-bold mb-6">A Inspiração / Conceito</h3>
                <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed">
                  {project.concept.narrative}
                </p>
              </div>
            )}

            {(project.results?.impact || project.process?.details) && (
              <div className="max-w-3xl">
                <h3 className="text-[11px] text-[#05F2F2] uppercase tracking-[0.2em] font-bold mb-6">A Solução</h3>
                <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed whitespace-pre-line">
                  {project.results?.impact || project.process?.details}
                </p>
              </div>
            )}
            
          </div>

        </div>
      </div>

      {/* 3. IMAGES SHOWCASE */}
      <div className="w-full pb-32 space-y-8 sm:space-y-16 max-w-[1600px] mx-auto px-6 sm:px-12">
        {project.images.map((imgUrl, idx) => (
          <div key={idx} className="w-full rounded-2xl overflow-hidden bg-[#111]">
            <img 
              src={imgUrl} 
              alt={`Showcase ${idx + 1}`} 
              className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700 cursor-zoom-in" 
              loading="lazy" 
              onClick={() => setActiveImageModal(imgUrl)}
            />
          </div>
        ))}
      </div>

      {/* 4. NEXT PROJECT FOOTER */}
      <div className="w-full border-t border-white/10">
        <motion.button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => onSelectNextProject(nextProject), 300);
          }}
          className="w-full py-24 sm:py-32 bg-[#050505] hover:bg-white group flex flex-col items-center justify-center gap-6"
          whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
          whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        >
          <span className="text-[10px] text-slate-500 group-hover:text-black/50 uppercase tracking-widest font-bold transition-colors duration-500">
            Próximo Projeto
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-heading text-white group-hover:text-black tracking-tighter transition-colors duration-500 flex items-center gap-4 text-center px-4">
            {nextProject.title}
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hidden sm:block" />
          </h2>
        </motion.button>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      <AnimatePresence>
        {activeImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setActiveImageModal(null)}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-6 right-6 text-white hover:text-[#05F2F2] p-2 z-50 bg-black/20 rounded-full"
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              src={activeImageModal}
              alt="Asset zoom"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
