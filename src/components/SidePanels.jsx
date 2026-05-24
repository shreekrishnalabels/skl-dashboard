import React from 'react';
import GlassCard from './GlassCard.jsx';

export function ProductChart({ data }) {
  const counts = {};
  data.forEach(r => { if (r.product) counts[r.product] = (counts[r.product] || 0) + 1; });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0]?.[1] || 1;

  return (
    <GlassCard style={{ overflow:'hidden', animation:'fadeInUp 0.5s ease both', animationDelay:'0.15s' }}>
      <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize:14, fontWeight:600 }}>By Product</div>
      </div>
      <div style={{ padding:'14px 18px' }}>
        {sorted.length === 0 ? (
          <div style={{ textAlign:'center', padding:'24px', color:'var(--ts)', fontSize:12 }}>No data yet</div>
        ) : sorted.map(([name, count]) => (
          <div key={name} style={{ marginBottom:13 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
              <span style={{ fontSize:11, color:'var(--tp)' }}>{name}</span>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--gold)' }}>{count}</span>
            </div>
            <div style={{ height:4, background:'rgba(255,255,255,0.08)', borderRadius:3, overflow:'hidden' }}>
              <div style={{
                height:'100%',
                background:'linear-gradient(90deg,var(--gold),var(--gold2))',
                borderRadius:3,
                width: Math.round(count / max * 100) + '%',
                transition:'width 1s cubic-bezier(0.23,1,0.32,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export function ActivityPanel({ data }) {
  const recent = [...data].slice(0, 6);
  const dotColors = ['var(--gold)', 'var(--blue)', 'var(--teal)', 'var(--gold)', 'var(--blue)', 'var(--teal)'];

  return (
    <GlassCard style={{ overflow:'hidden', animation:'fadeInUp 0.5s ease both', animationDelay:'0.2s' }}>
      <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize:14, fontWeight:600 }}>Recent Activity</div>
      </div>
      <div style={{ padding:'0 18px 14px' }}>
        {recent.length === 0 ? (
          <div style={{ textAlign:'center', padding:'24px', color:'var(--ts)', fontSize:12 }}>No activity yet</div>
        ) : recent.map((r, i) => (
          <div key={i} style={{ display:'flex', gap:12, padding:'11px 0', borderBottom: i < recent.length-1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background: dotColors[i], flexShrink:0, marginTop:4, boxShadow:`0 0 5px ${dotColors[i]}` }} />
            <div>
              <div style={{ fontSize:11, color:'var(--tp)', lineHeight:1.5 }}>
                <strong>{r.name || 'Someone'}</strong> from {r.company || 'unknown'} inquired about {r.product || 'labels'}
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(255,255,255,0.25)', marginTop:2 }}>
                {r.timestamp || '—'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
