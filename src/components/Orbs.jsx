import React from 'react';

const orbStyle = {
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(90px)',
  opacity: 0.28,
};

export default function Orbs() {
  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      <div style={{ ...orbStyle, width:600, height:600, background:'radial-gradient(circle,#0a84ff,transparent 70%)', top:'-15%', left:'-10%', animation:'of1 10s ease-in-out infinite alternate' }} />
      <div style={{ ...orbStyle, width:500, height:500, background:'radial-gradient(circle,#5e5ce6,transparent 70%)', top:'25%', right:'-8%', animation:'of2 12s ease-in-out infinite alternate' }} />
      <div style={{ ...orbStyle, width:450, height:450, background:'radial-gradient(circle,#30d882,transparent 70%)', bottom:'-12%', left:'18%', animation:'of3 9s ease-in-out infinite alternate' }} />
      <div style={{ ...orbStyle, width:350, height:350, background:'radial-gradient(circle,#d4a847,transparent 70%)', bottom:'22%', right:'28%', animation:'of4 11s ease-in-out infinite alternate' }} />
    </div>
  );
}
