import React from 'react';
import {  } from 'lucide-react';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

interface AboutViewProps {}

export const AboutView: React.FC<AboutViewProps> = () => {

  const tools = [
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Adobe After Effects',
    'Adobe InDesign',
    'Adobe Premiere Pro',
    'Figma',
  ] as any;

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto space-y-24 text-left">
      
      {/* ═══════════════════════════════════════════════
          BIO — TWO COLUMNS: PORTRAIT + RUNNING TEXT
          Style: matheusferreira.co
      ═══════════════════════════════════════════════ */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        {/* Left Column: Portrait placeholder */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative w-full h-full min-h-[400px] bg-[#111111] rounded-lg overflow-hidden flex items-center justify-center flex-grow">
            <img 
              src="/profile.jpg" 
              alt="Perez Jesus" 
              className="w-full h-full object-cover transition-all duration-700" 
            />
            {/* Subtle gradient edge */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050505]/40 to-transparent" />
          </div>
        </div>

        {/* Right Column: Running bio text */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight leading-[1.05]">
              Perez Jesus
            </h1>
            <p className="text-sm text-slate-500 uppercase tracking-widest font-body">
              Designer Gráfico & Diretor de Arte
            </p>
          </div>

          {/* Bio — running prose, factual */}
          <div className="space-y-5 text-slate-300 font-body text-[15px] leading-[1.75]">
            <p>
              Designer gráfico e diretor de arte baseado no Rio de Janeiro, com mais de 7 anos de experiência no mercado criativo. Atualmente integra a equipe da <span className="text-white font-semibold">Itabus Mídia Exterior</span>, onde lidera projetos visuais de grande alcance — de ativações de marca em Bus Wrap a campanhas publicitárias que circulam pelas ruas da cidade.
            </p>
            <p>
              Formado em Design pela <span className="text-white font-semibold">UniCarioca</span>, construiu sua trajetória unindo precisão técnica e narrativa visual. Seus projetos transitam entre identidade visual, mídia OOH (Out-of-Home), motion design e sports graphics — sempre com foco em clareza estrutural, alto contraste e impacto imediato.
            </p>
            <p>
              O próximo passo da carreira é a <span className="text-white font-semibold">Direção de Arte</span>: liderar projetos criativos desde a concepção estratégica até a execução final, traduzindo briefings complexos em linguagens visuais que se conectam com o público e elevam a percepção de marca.
            </p>
          </div>

          {/* Contact link — single, simple */}
          <div className="pt-2 space-y-4">
            <p className="text-sm font-semibold text-white font-body">
              Aberto a novas oportunidades de trabalho (CLT ou Remoto).
            </p>
          </div>
        </div>
      </motion.div>


      {/* ═══════════════════════════════════════════════
          EXPERTISE — Simple list, no decorated cards
      ═══════════════════════════════════════════════ */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-[#111111] pt-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold font-heading text-white tracking-tight">
            Especialidades
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-white font-body">Identidade Visual & Branding</h3>
              <p className="text-[13px] text-slate-500 font-body leading-relaxed">
                Sistemas de marca completos, guia de estilo e posicionamento criativo.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-white font-body">Mídia Exterior (OOH)</h3>
              <p className="text-[13px] text-slate-500 font-body leading-relaxed">
                Design para grande formato, ativações imersivas e Bus Wrap.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-white font-body">Sports Graphics</h3>
              <p className="text-[13px] text-slate-500 font-body leading-relaxed">
                Composições dinâmicas inspiradas em broadcasting esportivo.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-white font-body">Motion Design & Audiovisual</h3>
              <p className="text-[13px] text-slate-500 font-body leading-relaxed">
                Animações 2D, vinhetas, pós-produção e edição para campanhas.
              </p>
            </div>
          </div>
        </div>
      </motion.div>


      {/* ═══════════════════════════════════════════════
          TOOLS — Flat text list
      ═══════════════════════════════════════════════ */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-[#111111] pt-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold font-heading text-white tracking-tight">
            Ferramentas
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {tools.map((tool: string, idx: number) => (
              <span key={idx} className="text-sm text-slate-400 font-body">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
};
