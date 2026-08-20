import React from 'react';

interface AsymmetricFrameProps {
  children: React.ReactNode;
  className?: string;
  /**
   * concentric — adds 2 faint outer rings around the frame.
   * Only use on hero blocks or featured standalone elements, NOT on grid cards.
   */
  concentric?: boolean;
  /** notched — reserved for future use (large hero cards with clip-path) */
  notched?: boolean;
}

export const AsymmetricFrame: React.FC<AsymmetricFrameProps> = ({
  children,
  className = '',
  concentric = false,
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer concentric rings — ONLY for hero/featured blocks, not grid cards */}
      {concentric && (
        <>
          <div className="absolute -inset-3 border border-[#03738C]/15 rounded-br-[44px] pointer-events-none z-0" />
          <div className="absolute -inset-6 border border-[#03738C]/08 rounded-br-[52px] pointer-events-none z-0" />
        </>
      )}

      {/*
        Main signature frame:
        - Three corners rounded at 24px
        - Bottom-right corner at 4px (the single asymmetric "bite")
        - Solid border, no glow, no neon
      */}
      <div
        className="relative z-10 overflow-hidden bg-[#111111]"
        style={{ borderRadius: '24px 24px 24px 4px', border: '1px solid rgba(3,115,140,0.35)' }}
      >
        {children}
      </div>
    </div>
  );
};




