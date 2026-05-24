import React from 'react';
import GlassCard from './GlassCard.jsx';
import { parseDate } from '../constants.js';

export default function StatCards({ data, usingDemo }) {
  const now = new Date();
  const total = data.length;
  const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const weekCount = data.filter(r => parseDate(r.timestamp) > weekAgo).length;
  const todayCount = data.filter(r => {
    const d = parseDate(r.timestamp);
    return d && d.toDateString() === now.toDateString();
  }).length;
  const pc = {};
  data.forEach(r => { if (r.product) pc[r.product] = (pc[r.product] || 0) + 1; });
  const top = Object.entries(pc).sort((a, b) => b[1] - a[1])[0];

  const cards = [
    { label:'Total Inquiries', val: total, sub: usingDemo ? '📊 Demo mode' : '↑ Live data', subColor:'var(--teal)', icon:'📋' },
    { label:'This Week', val: weekCount, sub: weekCount + ' inquiries this week', subColor:'var(--teal)', icon:'📅' },
    { label:'Top Product', val: top?.[0] ?? '—', valSmall: true, sub: top ? top[1] + ' inquiries' : 'No data', subColor:'var(--ts)', icon:'🏷️' },
    { label:'Today', val: todayCount, sub: todayCount > 0 ? '🔥 Active today' : 'None today', subColor: todayCount > 0 ? 'var(--orange)' : 'var(--ts)', icon:'⚡' },
  ];

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:22 }}>
      {cards.map((c, i) => (
        <GlassCard key={i} style={{ padding:'20px 22px', animation:`fadeInUp 0.4s ease both`, animationDelay:`${i*0.07}s` }}>
          {/* gold glow corner */}
          <div style={{ position:'absolute', top:0, right:0, width:60, height:60, background:'radial-gradient(circle,rgba(212,168,71,0.1),transparent 70%)', borderRadius:'0 18px 0 60px', pointerEvents:'none' }} />

          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.2em', color:'var(--ts)', textTransform:'uppercase', marginBottom:10 }}>
            {c.label}
          </div>

          <div style={{ fontSize: c.valSmall ? 15 : 30, fontWeight:300, color:'var(--tp)', lineHeight:1, letterSpacing:'-1px', marginTop: c.valSmall ? 4 : 0 }}>
            {c.val}
          </div>

          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, marginTop:8, color: c.subColor }}>
            {c.sub}
          </div>

          <div style={{ position:'absolute', top:18, right:18, fontSize:18, opacity:0.35, pointerEvents:'none' }}>
            {c.icon}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
