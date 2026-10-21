import React, { useState } from 'react';

export default function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
  const [hoveredBar, setHoveredBar] = useState(null);

  // Chart 1 Data: Weekly Detections
  const weeklyData = [
    { day: 'Mon', count: 140, height: '55%' },
    { day: 'Tue', count: 185, height: '72%' },
    { day: 'Wed', count: 120, height: '48%' },
    { day: 'Thu', count: 210, height: '84%' },
    { day: 'Fri', count: 250, height: '95%' },
    { day: 'Sat', count: 190, height: '76%' },
    { day: 'Sun', count: 145, height: '58%' }
  ];

  // Chart 2 Data: Hourly Intensity
  const hourlyData = [
    { hour: '6 AM', level: 15 },
    { hour: '9 AM', level: 45 },
    { hour: '12 PM', level: 60 },
    { hour: '3 PM', level: 80 },
    { hour: '6 PM', level: 98 },
    { hour: '9 PM', level: 40 }
  ];

  const hotspotList = [
    { zone: 'Bus Stand Chowk (Ward 12)', occurrences: 48, trend: '+12%', alert: 'High', peakTime: '05:30 PM', resolutionRate: 88 },
    { zone: 'Dhamangaon Rd Market (Ward 8)', occurrences: 32, trend: '-5%', alert: 'Medium', peakTime: '07:15 PM', resolutionRate: 94 },
    { zone: 'Civil Lines Library (Ward 4)', occurrences: 19, trend: '+2%', alert: 'Low', peakTime: '08:00 AM', resolutionRate: 98 }
  ];

  const wasteTypes = [
    { type: 'Single-use Plastic & Packaging', percentage: 68, color: '#2563eb' },
    { type: 'Organic & Market Food Waste', percentage: 18, color: '#16a34a' },
    { type: 'Cardboard & Paper Waste', percentage: 9, color: '#f59e0b' },
    { type: 'Hazardous / Construction Waste', percentage: 5, color: '#dc2626' }
  ];

  return (
    <div style={{ padding: '28px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '28px' }}>📈</span>
            <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
              Municipal Analytics Engine
            </h1>
          </div>
          <p style={{ margin: '4px 0 0 38px', color: '#64748b', fontSize: '14px' }}>
            AI detection metrics, chronic hotspot triage, and Swachh Survekshan benchmark performance.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div style={{ display: 'flex', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '10px' }}>
          {['7D', '30D', '90D', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              style={{
                padding: '6px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: selectedTimeframe === tf ? '#ffffff' : 'transparent',
                color: selectedTimeframe === tf ? '#0f172a' : '#64748b',
                boxShadow: selectedTimeframe === tf ? '0 2px 4px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #2563eb' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>AI Detections ({selectedTimeframe})</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 4px 0' }}>1,240</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>🎯 94% Neural Precision</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #16a34a' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Avg. Clearance Time</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 4px 0' }}>42 Mins</div>
          <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '600' }}>⚡ ↓ 18% faster vs last month</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #9333ea' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Swachh Survekshan Score</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#9333ea', margin: '6px 0 4px 0' }}>895 <span style={{ fontSize: '14px', color: '#64748b' }}>/ 1000</span></div>
          <span style={{ fontSize: '12px', color: '#9333ea', fontWeight: '600' }}>🏆 Top 10% Rank Potential</span>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', borderTop: '4px solid #f59e0b' }}>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Automated Dispatch Rate</span>
          <div style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', margin: '6px 0 4px 0' }}>91.4%</div>
          <span style={{ fontSize: '12px', color: '#0284c7', fontWeight: '600' }}>🤖 Direct CCTV Auto-Triage</span>
        </div>
      </div>

      {/* Main Visual Graphs Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Weekly AI Detection Bar Chart */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
                📊 Detection Frequency Trend (Daily)
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                Automated YOLOv9 AI detection volume logged per day
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '4px 10px', borderRadius: '6px' }}>
              Peak: Friday (250 events)
            </span>
          </div>

          {/* Graphical Bar Container */}
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 10px 10px 10px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
            {weeklyData.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredBar(index)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Hover Tooltip */}
                {hoveredBar === index && (
                  <div style={{
                    position: 'absolute',
                    top: '-32px',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}>
                    {item.count} Incidents
                  </div>
                )}

                {/* Animated Column Bar */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: '36px',
                    height: item.height,
                    backgroundColor: hoveredBar === index ? '#1d4ed8' : '#2563eb',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.2s ease',
                    boxShadow: hoveredBar === index ? '0 4px 12px rgba(37, 99, 235, 0.4)' : 'none'
                  }}
                />
                <span style={{ marginTop: '10px', fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 24-Hour Peak Heat Heatmap Bar */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
              ⏰ Peak Litter Hours
            </h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              Time-of-day incident distribution
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '16px 0' }}>
            {hourlyData.map((h, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                  <span>{h.hour}</span>
                  <span style={{ fontWeight: '700', color: h.level > 70 ? '#dc2626' : '#2563eb' }}>{h.level}% Load</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${h.level}%`, height: '100%', backgroundColor: h.level > 70 ? '#dc2626' : '#2563eb', borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 12px', backgroundColor: '#fef2f2', borderLeft: '4px solid #dc2626', borderRadius: '6px', fontSize: '12px', color: '#991b1b', fontWeight: '600' }}>
            🔥 Critical Spike: 4:00 PM – 7:30 PM (Post-Market Vendor Closing)
          </div>
        </div>

      </div>

      {/* Hotspots & Waste Composition Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        
        {/* Hotspots Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>
            📍 Chronic Litter Hotspots (Yavatmal Zone)
          </h3>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Detections</th>
                <th style={{ padding: '12px' }}>Clearance Speed</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {hotspotList.map((spot, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '14px 12px', fontWeight: '700', color: '#1e293b' }}>
                    {spot.zone}
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>{spot.occurrences}</span>
                    <span style={{ fontSize: '12px', marginLeft: '6px', color: spot.trend.startsWith('+') ? '#dc2626' : '#16a34a', fontWeight: '600' }}>
                      {spot.trend}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', maxWidth: '80px' }}>
                        <div style={{ width: `${spot.resolutionRate}%`, height: '100%', backgroundColor: '#16a34a' }} />
                      </div>
                      <span style={{ fontWeight: '700', fontSize: '12px', color: '#16a34a' }}>{spot.resolutionRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '800',
                        backgroundColor: spot.alert === 'High' ? '#fee2e2' : spot.alert === 'Medium' ? '#fef3c7' : '#e0f2fe',
                        color: spot.alert === 'High' ? '#991b1b' : spot.alert === 'Medium' ? '#92400e' : '#0369a1'
                      }}
                    >
                      {spot.alert.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Waste Breakdown & AI Insights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
              🗑️ Detected Waste Types
            </h3>
            {wasteTypes.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                  <span>{item.type}</span>
                  <span style={{ color: item.color, fontWeight: '700' }}>{item.percentage}%</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percentage}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>

          {/* AI Insights Card */}
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '16px', color: '#fff' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#38bdf8' }}>
              🤖 Predictive AI Recommendation
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
              Pre-dispatch 2 field sweepers to <strong>Ward 12 (Bus Stand Chowk)</strong> daily at 4:30 PM to intercept peak littering hours before evening citizen accumulation.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}