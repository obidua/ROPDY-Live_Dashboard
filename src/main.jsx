import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initializeRpcManager } from './utils/rpcManager'

// Suppress non-critical warnings in development
if (import.meta.env.DEV) {
  const originalWarn = console.warn;
  console.warn = function(...args) {
    const message = args[0]?.toString() || '';
    // Suppress specific non-critical warnings
    if (
      message.includes('React Router Future Flag') ||
      message.includes('Lit is in dev mode') ||
      message.includes('Element w3m-router-container scheduled an update')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// Initialize RPC Manager on app startup
initializeRpcManager().catch(err => {
  console.error('Failed to initialize RPC manager:', err);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered:', registration);
        
        // Check for updates periodically (every hour)
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        console.error('❌ Service Worker registration failed:', error);
      });
  });
}