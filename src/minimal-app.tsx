import React from 'react';
import { createRoot } from 'react-dom/client';

// Componente React minimo per test
function MinimalApp() {
  return (
    <div style={{ 
      backgroundColor: 'black', 
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>BoxSelector - Minimal Test</h1>
      <p>Se questa pagina si carica, React sta funzionando correttamente.</p>
      <button 
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('Button clicked!')}
      >
        Test Button
      </button>
    </div>
  );
}

// Tentativo di rendering su elemento root
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<MinimalApp />);
} else {
  console.error('Could not find root element to mount React app');
  
  // Tentativo di creare un elemento root se non esiste
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
  console.log('Created new root element');
  
  createRoot(newRoot).render(<MinimalApp />);
}