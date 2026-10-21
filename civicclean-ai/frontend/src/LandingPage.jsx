import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LandingPage.module.css'
import bgImage from './swachh-bg.jpeg'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <main 
      className={styles.root} 
      style={{ 
        position: 'relative', 
        width: '100vw',
        minHeight: '100vh',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      {/* Container for transparent clickable hot-spots matching the two cards */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '2rem',
        zIndex: 10
      }}>
        {/* Invisible Clickable Area over Citizen Portal */}
        <div 
          onClick={() => navigate('/citizen')}
          style={{
            width: '280px',
            height: '240px',
            cursor: 'pointer',
            borderRadius: '20px'
          }}
          title="Enter Citizen Portal"
        />

        {/* Invisible Clickable Area over Municipal Admin */}
        <div 
          onClick={() => navigate('/admin')}
          style={{
            width: '280px',
            height: '240px',
            cursor: 'pointer',
            borderRadius: '20px'
          }}
          title="Enter Municipal Admin"
        />
      </div>
    </main>
  )
}