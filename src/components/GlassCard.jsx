import React from 'react';

export default function GlassCard({ children, style = {}, className = '', hover = true, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        backdropFilter: 'blur(28px) saturate(180%)',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 18,
        boxShadow: hovered
          ? '0 14px 44px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22)'
          : '0 8px 28px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.22)',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.22s, box-shadow 0.22s',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {/* top shimmer line */}
      <div style={{
        position:'absolute', inset:'0 0 auto', height:1,
        background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)',
        pointerEvents:'none',
      }} />
      {children}
    </div>
  );
}
