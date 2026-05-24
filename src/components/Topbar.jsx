import React from 'react';
import { exportCSV } from '../constants.js';

export default function Topbar({ filteredData, onRefresh, loading }) {
  return (
    <div style={{
      height:60, borderBottom:'1px solid rgba(255,255,255,0.1)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 28px',
      backdropFilter:'blur(28px) saturate(180%)',
      background:'rgba(255,255,255,0.05)',
      position:'sticky', top:0, zIndex:50,
      boxShadow:'0 1px 0 rgba(255,255,255,0.08)',
    }}>
      <div style={{ fontSize:15, fontWeight:600, letterSpacing:'-0.3px' }}>
        Inquiries <span style={{ color:'var(--gold)' }}>/ Live</span>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        {/* Live indicator */}
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--ts)', display:'flex', alignItems:'center', gap:6 }}>
          <span style={{
            width:7, height:7, borderRadius:'50%', background:'var(--teal)',
            display:'inline-block', boxShadow:'0 0 6px var(--teal)',
            animation:'pulse 2s infinite',
          }} />
          Auto-sync
        </span>

        <Btn onClick={onRefresh} disabled={loading}>
          {loading ? '⟳ Syncing...' : '↺ Refresh'}
        </Btn>
        <Btn onClick={() => exportCSV(filteredData)}>⬇ Export CSV</Btn>
        <Btn primary onClick={() => window.open('https://wa.me/918879552022','_blank')}>💬 WhatsApp</Btn>
      </div>
    </div>
  );
}

function Btn({ children, onClick, primary, disabled }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:"'DM Mono',monospace", fontSize:10, padding:'7px 14px',
        borderRadius:10,
        border: primary ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.16)',
        background: primary
          ? (hov ? 'var(--gold2)' : 'var(--gold)')
          : (hov ? 'rgba(212,168,71,0.14)' : 'rgba(255,255,255,0.06)'),
        color: primary ? '#06060f' : (hov ? 'var(--gold)' : 'var(--ts)'),
        fontWeight: primary ? 600 : 400,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition:'all 0.2s',
        letterSpacing:'0.05em',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}
