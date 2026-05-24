import React from 'react';
import GlassCard from './GlassCard.jsx';
import { PRODUCTS, parseDate, formatTime, whatsapp } from '../constants.js';

export default function InquiryTable({ allData, filteredData, setFiltered, onRowClick }) {
  const [search, setSearch] = React.useState('');
  const [product, setProduct] = React.useState('');

  function doFilter(s, p) {
    const q = s.toLowerCase();
    const result = allData.filter(r => {
      const mQ = !q || [r.name,r.company,r.email,r.phone,r.message].some(v => v && v.toLowerCase().includes(q));
      const mP = !p || r.product === p;
      return mQ && mP;
    });
    setFiltered(result);
  }

  function handleSearch(e) { setSearch(e.target.value); doFilter(e.target.value, product); }
  function handleProduct(e) { setProduct(e.target.value); doFilter(search, e.target.value); }

  const now = new Date();

  return (
    <GlassCard style={{ overflow:'hidden', animation:'fadeInUp 0.5s ease both', animationDelay:'0.1s' }}>
      {/* Panel header */}
      <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:14, fontWeight:600, letterSpacing:'-0.2px' }}>All Inquiries</div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, background:'rgba(212,168,71,0.14)', color:'var(--gold)', border:'1px solid rgba(212,168,71,0.22)', padding:'3px 9px', borderRadius:6 }}>
          {filteredData.length} Records
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:10, alignItems:'center' }}>
        <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:9, padding:'8px 12px' }}>
          <span style={{ color:'rgba(255,255,255,0.32)', fontSize:12 }}>🔍</span>
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search name, company, email..."
            style={{ background:'none', border:'none', outline:'none', fontSize:12, color:'var(--tp)', flex:1, fontFamily:"'DM Sans',sans-serif" }}
          />
          {search && (
            <span onClick={() => { setSearch(''); doFilter('', product); }} style={{ cursor:'pointer', color:'var(--ts)', fontSize:14, lineHeight:1 }}>×</span>
          )}
        </div>
        <select
          value={product}
          onChange={handleProduct}
          style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.16)', borderRadius:9, padding:'8px 12px', fontSize:11, color:'var(--tp)', fontFamily:"'DM Mono',monospace", cursor:'pointer', outline:'none' }}
        >
          <option value="">All Products</option>
          {PRODUCTS.map(p => <option key={p} value={p} style={{ background:'#1a1a2e' }}>{p}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ overflowX:'auto' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr>
              {['','Name / Company','Contact','Product','Received','Action'].map((h,i) => (
                <th key={i} style={{ textAlign:'left', padding:'10px 14px', fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.15em', color:'var(--ts)', textTransform:'uppercase', background:'rgba(255,255,255,0.03)', borderBottom:'1px solid rgba(255,255,255,0.07)', whiteSpace:'nowrap' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr><td colSpan={6}>
                <div style={{ textAlign:'center', padding:'40px 20px' }}>
                  <div style={{ fontSize:28, opacity:0.3, marginBottom:10 }}>📭</div>
                  <div style={{ fontSize:13, color:'var(--ts)' }}>No inquiries found</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'rgba(255,255,255,0.2)', marginTop:5 }}>Try adjusting your search</div>
                </div>
              </td></tr>
            ) : filteredData.map((row, i) => {
              const d = parseDate(row.timestamp);
              const isNew = d && (now - d) < 24 * 60 * 60 * 1000;
              const timeStr = d ? formatTime(d) : (row.timestamp || '—');
              return (
                <TableRow
                  key={i}
                  row={row}
                  isNew={isNew}
                  timeStr={timeStr}
                  allData={allData}
                  onRowClick={onRowClick}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

function TableRow({ row, isNew, timeStr, allData, onRowClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <tr
      onClick={() => onRowClick(allData.indexOf(row))}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor:'pointer',
        background: hov ? 'rgba(212,168,71,0.04)' : (isNew ? 'rgba(212,168,71,0.03)' : 'transparent'),
        transition:'background 0.15s',
      }}
    >
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ width:6, height:6, borderRadius:'50%', background: isNew ? 'var(--gold)' : 'rgba(255,255,255,0.1)', margin:'0 auto', boxShadow: isNew ? '0 0 6px var(--gold)' : 'none' }} />
      </td>
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontSize:12, fontWeight:500, color:'var(--tp)' }}>
          {isNew && <span style={{ display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--gold)', marginRight:6, boxShadow:'0 0 5px var(--gold)', verticalAlign:'middle' }} />}
          {row.name || '—'}
        </div>
        <div style={{ fontSize:11, color:'var(--ts)', marginTop:2 }}>{row.company || '—'}</div>
      </td>
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'var(--gold)' }}>{row.phone || '—'}</div>
        <div style={{ fontSize:11, color:'var(--blue)', marginTop:2 }}>{row.email || '—'}</div>
      </td>
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ display:'inline-block', fontFamily:"'DM Mono',monospace", fontSize:9, padding:'3px 8px', borderRadius:6, background:'rgba(212,168,71,0.14)', color:'var(--gold)', border:'1px solid rgba(212,168,71,0.2)', whiteSpace:'nowrap' }}>
          {row.product || '—'}
        </span>
      </td>
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)', fontFamily:"'DM Mono',monospace", fontSize:10, color:'var(--ts)' }}>
        {timeStr}
      </td>
      <td style={{ padding:'12px 14px', borderBottom:'1px solid rgba(255,255,255,0.04)' }}>
        <ActionBtn onClick={e => { e.stopPropagation(); whatsapp(row.phone || '', row.name || ''); }}>💬</ActionBtn>
        <ActionBtn onClick={e => { e.stopPropagation(); onRowClick(allData.indexOf(row)); }} style={{ marginLeft:4 }}>👁</ActionBtn>
      </td>
    </tr>
  );
}

function ActionBtn({ children, onClick, style = {} }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(212,168,71,0.14)' : 'rgba(255,255,255,0.05)',
        border: hov ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.16)',
        borderRadius:7, padding:'4px 8px', fontSize:11,
        color: hov ? 'var(--gold)' : 'var(--ts)',
        cursor:'pointer', transition:'all 0.2s',
        ...style,
      }}
    >
      {children}
    </button>
  );
}
