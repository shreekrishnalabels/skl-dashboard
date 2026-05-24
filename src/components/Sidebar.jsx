import React from 'react';

const items = [
  { icon: '📋', label: 'All Inquiries', key: 'inquiries' },
  { icon: '🏷️', label: 'By Product',   key: 'products'  },
  { icon: '📊', label: 'Analytics',    key: 'analytics' },
];

export default function Sidebar({ active, setActive }) {
  return (
    <div style={{
      position: 'fixed', left:0, top:0, bottom:0, width:220, zIndex:100,
      backdropFilter: 'blur(28px) saturate(180%)',
      background: 'rgba(255,255,255,0.05)',
      borderRight: '1px solid rgba(255,255,255,0.16)',
      display: 'flex', flexDirection: 'column',
      boxShadow: '4px 0 24px rgba(0,0,0,0.3), inset -1px 0 0 rgba(255,255,255,0.06)',
    }}>
      {/* Logo */}
      <div style={{ padding:'26px 22px 22px', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:13, fontWeight:700, letterSpacing:'0.18em', color:'var(--gold)', textTransform:'uppercase' }}>SKL</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'var(--ts)', letterSpacing:'0.18em', marginTop:3 }}>Inquiry Dashboard</div>
      </div>

      {/* Nav */}
      <nav style={{ padding:'16px 0', flex:1 }}>
        {items.map(item => (
          <div
            key={item.key}
            onClick={() => setActive(item.key)}
            style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'11px 22px',
              fontSize:12, fontWeight:500,
              fontFamily:"'DM Mono',monospace",
              letterSpacing:'0.03em',
              color: active === item.key ? 'var(--gold)' : 'var(--ts)',
              background: active === item.key ? 'rgba(212,168,71,0.14)' : 'transparent',
              borderLeft: active === item.key ? '2px solid var(--gold)' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (active !== item.key) {
                e.currentTarget.style.color = 'var(--gold)';
                e.currentTarget.style.background = 'rgba(212,168,71,0.07)';
              }
            }}
            onMouseLeave={e => {
              if (active !== item.key) {
                e.currentTarget.style.color = 'var(--ts)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize:14, width:18, textAlign:'center' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}

        <div style={{ margin:'8px 0', borderTop:'1px solid rgba(255,255,255,0.06)' }} />

        {[
          { icon:'🌐', label:'Live Site', url:'https://shreekrishnalabels.in' },
          { icon:'📄', label:'Raw Sheet', url:'https://docs.google.com/spreadsheets/d/1yGixrMLr9hhOOTpLemRSR1OQk7E923YHtIwS5sehhXQ' },
        ].map(link => (
          <div
            key={link.url}
            onClick={() => window.open(link.url, '_blank')}
            style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'11px 22px', fontSize:12,
              fontFamily:"'DM Mono',monospace",
              color:'var(--ts)', cursor:'pointer', transition:'all 0.2s',
              borderLeft:'2px solid transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.color='var(--gold)'; e.currentTarget.style.background='rgba(212,168,71,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='var(--ts)'; e.currentTarget.style.background='transparent'; }}
          >
            <span style={{ fontSize:14, width:18, textAlign:'center' }}>{link.icon}</span>
            {link.label}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding:'18px 22px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.25)' }}>SKL Dashboard v2.0 · Glass</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.2)', marginTop:3 }}>shreekrishnalabels.in</div>
      </div>
    </div>
  );
}
