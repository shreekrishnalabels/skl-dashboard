import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div style={{
      position:'fixed', bottom:24, right:24,
      backdropFilter:'blur(20px)',
      background:'rgba(255,255,255,0.1)',
      border:'1px solid var(--gold)',
      borderRadius:12, padding:'11px 18px',
      fontSize:12, fontFamily:"'DM Mono',monospace",
      color:'var(--gold)', zIndex:300,
      boxShadow:'0 4px 20px rgba(212,168,71,0.2)',
      animation:'fadeInUp 0.3s ease',
    }}>
      {message}
    </div>
  );
}
