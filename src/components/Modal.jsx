import React from 'react';
import { whatsapp } from '../constants.js';

export default function Modal({ row, onClose }) {
  React.useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!row) return null;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:'fixed', inset:0,
        background:'rgba(6,6,15,0.88)',
        backdropFilter:'blur(12px)',
        zIndex:200,
        display:'flex', alignItems:'center', justifyContent:'center',
        animation:'fadeInUp 0.2s ease',
      }}
    >
      <div style={{
        backdropFilter:'blur(28px) saturate(180%)',
        background:'rgba(255,255,255,0.08)',
        border:'1px solid rgba(255,255,255,0.16)',
        borderRadius:18,
        width:'min(520px,94vw)',
        maxHeight:'80vh',
        overflowY:'auto',
        boxShadow:'0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.22)',
        position:'relative',
      }}>
        {/* shimmer */}
        <div style={{ position:'absolute', inset:'0 0 auto', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)', pointerEvents:'none' }} />

        {/* Header */}
        <div style={{ padding:'18px 22px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:14, fontWeight:600 }}>Inquiry Details</div>
          <CloseBtn onClick={onClose} />
        </div>

        {/* Body */}
        <div style={{ padding:22 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
            <Field label="Full Name" val={row.name} />
            <Field label="Company" val={row.company} />
            <Field label="Phone / WhatsApp" val={row.phone} color="var(--gold)" />
            <Field label="Email" val={row.email} color="var(--blue)" />
          </div>

          <Field label="Product Interest" val={
            <span style={{ display:'inline-block', fontFamily:"'DM Mono',monospace", fontSize:9, padding:'3px 8px', borderRadius:6, background:'rgba(212,168,71,0.14)', color:'var(--gold)', border:'1px solid rgba(212,168,71,0.2)' }}>
              {row.product || '—'}
            </span>
          } />
          <div style={{ marginTop:14 }}><Field label="Message" val={row.message} /></div>
          <div style={{ marginTop:14 }}><Field label="Received" val={row.timestamp} mono /></div>

          {row.phone && (
            <button
              onClick={() => whatsapp(row.phone, row.name || '')}
              style={{
                display:'flex', alignItems:'center', gap:8,
                background:'#25d366', color:'#fff',
                border:'none', borderRadius:10, padding:'10px 16px',
                fontSize:12, fontWeight:600, cursor:'pointer',
                fontFamily:"'DM Sans',sans-serif",
                width:'100%', justifyContent:'center', marginTop:16,
                transition:'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity=0.88}
              onMouseLeave={e => e.target.style.opacity=1}
            >
              💬 Reply on WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, val, color, mono }) {
  return (
    <div>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.2em', color:'var(--ts)', textTransform:'uppercase', marginBottom:5 }}>
        {label}
      </div>
      <div style={{
        fontSize:13, color: color || 'var(--tp)',
        background:'rgba(255,255,255,0.05)',
        border:'1px solid rgba(255,255,255,0.16)',
        borderRadius:9, padding:'10px 14px', lineHeight:1.5,
        fontFamily: mono ? "'DM Mono',monospace" : 'inherit',
      }}>
        {val || '—'}
      </div>
    </div>
  );
}

function CloseBtn({ onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:'rgba(255,255,255,0.06)',
        border: hov ? '1px solid var(--red)' : '1px solid rgba(255,255,255,0.16)',
        width:28, height:28, borderRadius:8,
        color: hov ? 'var(--red)' : 'var(--ts)',
        cursor:'pointer', fontSize:13,
        display:'flex', alignItems:'center', justifyContent:'center',
        transition:'all 0.2s',
      }}
    >✕</button>
  );
}
