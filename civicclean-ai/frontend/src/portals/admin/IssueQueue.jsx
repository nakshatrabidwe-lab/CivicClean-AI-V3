import React, { useState, useEffect } from 'react';

export default function IssueQueue() {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const initialIssues = [
    {
      id: 'ISS-1042',
      location: 'Ward 4 - Market Yard',
      category: 'Litter Detection',
      confidence: 94,
      priority: 'HIGH',
      status: 'Pending',
      timestamp: '10 mins ago',
      source: 'CCTV Cam 02 (YOLOv9)',
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&q=80'
    },
    {
      id: 'ISS-1041',
      location: 'Ward 2 - Station Road',
      category: 'Overflowing Bin',
      confidence: 88,
      priority: 'MEDIUM',
      status: 'Assigned',
      timestamp: '25 mins ago',
      source: 'Citizen Mobile Upload',
      image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&q=80'
    },
    {
      id: 'ISS-1040',
      location: 'Ward 7 - Civil Lines',
      category: 'Illegal Dumping',
      confidence: 97,
      priority: 'CRITICAL',
      status: 'In Progress',
      timestamp: '1 hour ago',
      source: 'CCTV Cam 08 (YOLOv9)',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500&q=80'
    },
    {
      id: 'ISS-1039',
      location: 'Ward 1 - Main Bus Stand',
      category: 'Plastic Waste Accumulation',
      confidence: 91,
      priority: 'LOW',
      status: 'Resolved',
      timestamp: '3 hours ago',
      source: 'CCTV Cam 01 (YOLOv9)',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&q=80'
    }
  ];

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch(`${API_URL}/reports`);
      if (res.ok) {
        const data = await res.json();
        setIssues(data.length > 0 ? data : initialIssues);
      } else {
        setIssues(initialIssues);
      }
    } catch {
      setIssues(initialIssues);
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return { bg: '#fee2e2', color: '#991b1b', border: '#f87171' };
      case 'HIGH':
        return { bg: '#ffedd5', color: '#9a3412', border: '#fb923c' };
      case 'MEDIUM':
        return { bg: '#fef3c7', color: '#92400e', border: '#facc15' };
      default:
        return { bg: '#f3f4f6', color: '#374151', border: '#d1d5db' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return { bg: '#fef3c7', color: '#b45309', label: '⏳ Pending' };
      case 'Assigned':
        return { bg: '#e0f2fe', color: '#0369a1', label: '👤 Assigned' };
      case 'In Progress':
        return { bg: '#fae8ff', color: '#86198f', label: '⚡ In Progress' };
      case 'Resolved':
        return { bg: '#dcfce7', color: '#15803d', label: '✅ Resolved' };
      default:
        return { bg: '#f3f4f6', color: '#4b5563', label: status };
    }
  };

  return (
    <div style={{ padding: '28px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            📋 Municipal Issue Dispatch Queue
          </h1>
          <p style={{ margin: '6px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Real-time AI triage engine, task allocation, and automated civic resolution tracking
          </p>
        </div>
        <button
          onClick={fetchIssues}
          style={{
            padding: '10px 18px',
            backgroundColor: '#0f172a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.06)'
          }}
        >
          🔄 Refresh Feed
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Total Issues</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', marginTop: '6px' }}>{issues.length}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#d97706', textTransform: 'uppercase' }}>Pending Dispatch</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#d97706', marginTop: '6px' }}>
            {issues.filter(i => i.status === 'Pending').length}
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#dc2626', textTransform: 'uppercase' }}>Critical AI Alerts</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#dc2626', marginTop: '6px' }}>
            {issues.filter(i => i.priority === 'CRITICAL' || i.priority === 'HIGH').length}
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#16a34a', textTransform: 'uppercase' }}>Resolved Today</span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: '#16a34a', marginTop: '6px' }}>
            {issues.filter(i => i.status === 'Resolved').length}
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', backgroundColor: '#ffffff' }}>
          <input
            type="text"
            placeholder="🔍 Search Issue ID, Ward, or Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              width: '320px',
              fontSize: '14px',
              outline: 'none'
            }}
          />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '14px',
                fontWeight: '500',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px 24px' }}>Issue ID</th>
                <th style={{ padding: '16px 20px' }}>Location / Ward</th>
                <th style={{ padding: '16px 20px' }}>Category</th>
                <th style={{ padding: '16px 20px' }}>AI Confidence</th>
                <th style={{ padding: '16px 20px' }}>Priority</th>
                <th style={{ padding: '16px 20px' }}>Status</th>
                <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => {
                const priorityStyle = getPriorityStyle(issue.priority);
                const statusBadge = getStatusBadge(issue.status);

                return (
                  <tr
                    key={issue.id}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Issue ID */}
                    <td style={{ padding: '16px 24px', fontWeight: '700', color: '#16a34a' }}>
                      {issue.id}
                    </td>

                    {/* Location */}
                    <td style={{ padding: '16px 20px', fontWeight: '600', color: '#1e293b' }}>
                      📍 {issue.location}
                    </td>

                    {/* Category */}
                    <td style={{ padding: '16px 20px', color: '#475569' }}>
                      {issue.category}
                    </td>

                    {/* AI Confidence Bar */}
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', minWidth: '60px' }}>
                          <div
                            style={{
                              width: `${issue.confidence || 90}%`,
                              height: '100%',
                              backgroundColor: issue.confidence > 90 ? '#16a34a' : '#eab308',
                              borderRadius: '4px'
                            }}
                          />
                        </div>
                        <span style={{ fontWeight: '700', fontSize: '13px', color: '#16a34a' }}>
                          {issue.confidence}%
                        </span>
                      </div>
                    </td>

                    {/* Priority Badge */}
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: '800',
                          backgroundColor: priorityStyle.bg,
                          color: priorityStyle.color,
                          border: `1px solid ${priorityStyle.border}`
                        }}
                      >
                        {issue.priority}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '700',
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.color
                        }}
                      >
                        {statusBadge.label}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#16a34a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '700',
                          fontSize: '13px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 4px rgba(22, 163, 74, 0.2)'
                        }}
                      >
                        ⚡ Dispatch Task
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Detailed Triage Drawer */}
      {selectedIssue && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justify: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '28px',
              width: '520px',
              maxWidth: '90%',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#16a34a' }}>{selectedIssue.id}</span>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '20px', color: '#0f172a' }}>{selectedIssue.category}</h3>
              </div>
              <button
                onClick={() => setSelectedIssue(null)}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
              >
                ✖
              </button>
            </div>

            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 16px 0' }}>📍 {selectedIssue.location}</p>

            {/* Simulated AI Image Snapshot */}
            <div style={{ width: '100%', height: '180px', borderRadius: '10px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
              <img
                src={selectedIssue.image || 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&q=80'}
                alt="AI Evidence Snapshot"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                Detection Engine: {selectedIssue.source || 'YOLOv9 Neural Net'}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>AI Confidence</span>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#16a34a' }}>{selectedIssue.confidence}%</div>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '8px' }}>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Priority Level</span>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#dc2626' }}>{selectedIssue.priority}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  alert(`Task for ${selectedIssue.id} dispatched to Sanitation Field Crew Team 4!`);
                  setSelectedIssue(null);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                🚀 Confirm Dispatch Task
              </button>
              <button
                onClick={() => setSelectedIssue(null)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#f1f5f9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}