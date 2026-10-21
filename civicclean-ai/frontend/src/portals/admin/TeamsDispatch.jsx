import React, { useState } from 'react';

export default function TeamsAndDispatch() {
  const [selectedCrew, setSelectedCrew] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const nashikCrews = [
    {
      id: 'TEAM-01',
      leader: 'Ramesh Kulkarni',
      role: 'Sanitation Unit Alpha',
      status: 'ACTIVE',
      ward: 'Ward 1 - Nashik Road ATM',
      phone: '+91 98230 11223',
      tasks: 3,
      vehicle: 'MH-15-AT-1042 (Compactor Truck)',
      speed: '24 km/h',
      binLoad: '68%'
    },
    {
      id: 'TEAM-02',
      leader: 'Suresh Patil',
      role: 'Ward 3 CIDCO Rapid Response',
      status: 'IN_FIELD',
      ward: 'Ward 3 - CIDCO Divider',
      phone: '+91 94221 44556',
      tasks: 5,
      vehicle: 'MH-15-BD-3301 (Mini Tipper)',
      speed: '18 km/h',
      binLoad: '42%'
    },
    {
      id: 'TEAM-03',
      leader: 'Priya Sharma',
      role: 'Panchavati Green Crew',
      status: 'ACTIVE',
      ward: 'Ward 2 - Panchavati Ghat',
      phone: '+91 91580 99887',
      tasks: 2,
      vehicle: 'MH-15-C-9081 (Plantation & Sweeper)',
      speed: '12 km/h',
      binLoad: '25%'
    },
    {
      id: 'TEAM-04',
      leader: 'Vijay Deshmukh',
      role: 'Igatpuri / Ward 6 Unit',
      status: 'STANDBY',
      ward: 'Ward 6 - Igatpuri Sector',
      phone: '+91 98225 67102',
      tasks: 0,
      vehicle: 'MH-15-AY-5541 (Hook Loader)',
      speed: '0 km/h (Parked)',
      binLoad: '10%'
    }
  ];

  const filteredCrews = filterStatus === 'ALL' 
    ? nashikCrews 
    : nashikCrews.filter(c => c.status === filterStatus);

  const currentVehicle = selectedCrew || nashikCrews[0];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc', overflow: 'hidden' }}>
      
      {/* LEFT PANEL: Operational Metrics & Roster */}
      <div style={{ width: '380px', minWidth: '340px', height: '100%', borderRight: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
              Operational Metrics
            </h2>
            <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '12px', fontWeight: '800' }}>
              ● LIVE GPS
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            Real-time fleet readiness & spatial dispatch tracking
          </p>
        </div>

        {/* Fleet KPIs */}
        <div style={{ padding: '16px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Fleet Readiness
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Availability</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#16a34a', marginTop: '2px' }}>91%</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Active Units</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#2563eb', marginTop: '2px' }}>8 Trucks</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Active Dispatches</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>14 Tasks</div>
            </div>
            <div style={{ backgroundColor: '#fff', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Avg Response</span>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#9333ea', marginTop: '2px' }}>32 Mins</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ padding: '12px 20px', display: 'flex', gap: '8px', borderBottom: '1px solid #f1f5f9' }}>
          {['ALL', 'ACTIVE', 'IN_FIELD', 'STANDBY'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                backgroundColor: filterStatus === status ? '#0f172a' : '#f1f5f9',
                color: filterStatus === status ? '#ffffff' : '#64748b'
              }}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Crew Roster Cards */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredCrews.map((crew) => (
            <div
              key={crew.id}
              onClick={() => setSelectedCrew(crew)}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: currentVehicle.id === crew.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: currentVehicle.id === crew.id ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#2563eb', backgroundColor: '#dbeafe', padding: '2px 8px', borderRadius: '4px' }}>
                  {crew.id}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  backgroundColor: crew.status === 'ACTIVE' ? '#dcfce7' : crew.status === 'IN_FIELD' ? '#e0f2fe' : '#f1f5f9',
                  color: crew.status === 'ACTIVE' ? '#15803d' : crew.status === 'IN_FIELD' ? '#0369a1' : '#475569'
                }}>
                  {crew.status}
                </span>
              </div>

              <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>
                {crew.leader}
              </h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
                {crew.role}
              </p>

              <div style={{ fontSize: '12px', color: '#334155', fontWeight: '600', marginBottom: '8px' }}>
                📍 {crew.ward}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748b', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                <span>📞 {crew.phone}</span>
                <span style={{ fontWeight: '700', color: '#16a34a' }}>📋 {crew.tasks} Active Tasks</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Live Interactive Google Map Centered on Nashik City */}
      <div style={{ flex: 1, height: '100%', position: 'relative', backgroundColor: '#e2e8f0' }}>
        
        {/* Map Header Overlay Bar */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 10,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '12px 20px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '22px' }}>🛰️</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>
                Nashik Municipal Corporation GIS Map
              </div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>
                Live Tracking: Panchavati, Nashik Road, CIDCO & FC Road Sectors
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => alert('Nashik fleet route optimization triggered!')}
              style={{
                padding: '8px 14px',
                backgroundColor: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              🚀 Auto-Optimize Nashik Routes
            </button>
          </div>
        </div>

        {/* Google Map centered on Nashik City, MH */}
        <iframe
          title="Nashik Municipal Fleet GIS Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src="https://maps.google.com/maps?q=Nashik%20Road,%20Nashik,%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />

        {/* Selected Vehicle Telemetry Card */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#0f172a',
          color: '#ffffff',
          padding: '16px 20px',
          borderRadius: '14px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          zIndex: 10,
          maxWidth: '340px'
        }}>
          <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '800', textTransform: 'uppercase', marginBottom: '4px' }}>
            Selected Vehicle Telemetry
          </div>
          <div style={{ fontSize: '15px', fontWeight: '800', marginBottom: '4px' }}>
            {currentVehicle.vehicle}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
            Driver: {currentVehicle.leader} ({currentVehicle.id})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
            <div style={{ backgroundColor: '#1e293b', padding: '6px 10px', borderRadius: '6px' }}>
              GPS Speed: <strong style={{ color: '#4ade80' }}>{currentVehicle.speed}</strong>
            </div>
            <div style={{ backgroundColor: '#1e293b', padding: '6px 10px', borderRadius: '6px' }}>
              Bin Capacity: <strong style={{ color: '#facc15' }}>{currentVehicle.binLoad}</strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}