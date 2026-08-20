import React, { useState } from 'react';
import { X, CheckCircle2, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-400 hover:text-white transition-all duration-300 ease-out active:scale-95 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="rounded-lg overflow-hidden">
          <div className="p-8 bg-[#111111] text-left space-y-6">
            
            <div className="border-b border-white/20 pb-4">
              <span className="text-xs font-semibold text-[#05F2F2] uppercase tracking-wider block font-body">
                CONTATO & RECRUTAMENTO
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mt-1">
                Aberto a novas oportunidades (CLT / Remoto)
              </h3>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#F2E205] mx-auto animate-bounce" />
                <h4 className="text-xl font-bold font-heading text-white">Mensagem Enviada!</h4>
                <p className="text-xs font-body text-[#05F2F2]">
                  Obrigado pelo contato. Perez Jesus responderá em até 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-semibold">Seu Nome / Empresa</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="ex: Recrutador (Agência XYZ)"
                    className="w-full p-3 bg-[#050505] border border-white/20 text-white rounded-lg focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-semibold">Seu E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recrutamento@agencia.com"
                    className="w-full p-3 bg-[#050505] border border-white/20 text-white rounded-lg focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-semibold">Cargo ou Oportunidade</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="ex: Diretor de Arte Sênior"
                    className="w-full p-3 bg-[#050505] border border-white/20 text-white rounded-lg focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 uppercase mb-1 font-semibold">Mensagem</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Olá Perez, vimos o seu portfólio e gostaríamos de conversar sobre..."
                    className="w-full p-3 bg-[#050505] border border-white/20 text-white rounded-lg focus:border-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-heading font-extrabold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-200 transition-all duration-300 ease-out active:scale-95 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

