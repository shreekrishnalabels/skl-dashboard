import React from 'react';
import GlassCard from './GlassCard.jsx';
import { parseDate } from '../constants.js';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#d4a847','#0a84ff','#30d882','#af52de','#ff9500','#ff3b30','#5e5ce6','#f0c96a','#5dcaa5'];

export default function Analytics({ data }) {
  // By product
  const pc = {};
  data.forEach(r => { if (r.product) pc[r.product] = (pc[r.product] || 0) + 1; });
  const productData = Object.entries(pc).sort((a,b)=>b[1]-a[1]).map(([name,count])=>({name, count}));

  // By day (last 14 days)
  const dayMap = {};
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now - i * 86400000);
    const key = d.toLocaleDateString('en-IN', { day:'2-digit', month:'short' });
    dayMap[key] = 0;
  }
  data.forEach(r => {
    const d = parseDate(r.timestamp);
    if (!d) return;
    const key = d.toLocaleDateString('en-IN', { day:'2-digit', month:'short' });
    if (key in dayMap) dayMap[key]++;
  });
  const dailyData = Object.entries(dayMap).map(([date, count]) => ({ date, count }));

  const tooltipStyle = {
    backgroundColor:'rgba(6,6,15,0.92)',
    border:'1px solid rgba(255,255,255,0.16)',
    borderRadius:10,
    color:'var(--tp)',
    fontSize:12,
    fontFamily:"'DM Mono',monospace",
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:18, animation:'fadeInUp 0.4s ease' }}>
      {/* Daily trend */}
      <GlassCard style={{ padding:22 }}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:18 }}>Daily Inquiries (Last 14 Days)</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" tick={{ fill:'rgba(255,255,255,0.45)', fontSize:10, fontFamily:"'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:'rgba(255,255,255,0.45)', fontSize:10, fontFamily:"'DM Mono',monospace" }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Line type="monotone" dataKey="count" stroke="var(--gold)" strokeWidth={2} dot={{ fill:'var(--gold)', r:3 }} activeDot={{ r:5 }} name="Inquiries" />
          </LineChart>
        </ResponsiveContainer>
      </GlassCard>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
        {/* Bar chart */}
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:18 }}>Inquiries by Product</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill:'rgba(255,255,255,0.45)', fontSize:10, fontFamily:"'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill:'rgba(255,255,255,0.6)', fontSize:9, fontFamily:"'DM Mono',monospace" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" name="Count" radius={[0,4,4,0]}>
                {productData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        {/* Pie chart */}
        <GlassCard style={{ padding:22 }}>
          <div style={{ fontSize:14, fontWeight:600, marginBottom:18 }}>Product Share</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={productData} dataKey="count" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {productData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                formatter={(val) => <span style={{ color:'var(--ts)', fontSize:10, fontFamily:"'DM Mono',monospace" }}>{val}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>
    </div>
  );
}
