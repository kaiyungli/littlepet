// Overlay Renderer - Minimal Debug Text

function init() {
  console.log('📡 Overlay connected');
  
  // Create minimal debug text
  const debugText = document.createElement('div');
  debugText.style.cssText = `
    position: fixed;
    top: 8px;
    left: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(0, 0, 0, 0.15);
    padding: 4px 8px;
    border-radius: 4px;
    pointer-events: none;
    user-select: none;
    z-index: 99999;
  `;
  debugText.textContent = '🟢 Overlay Running';
  document.body.appendChild(debugText);
  
  // Listen for state updates
  if (window.chilliaAPI?.onStateUpdate) {
    window.chilliaAPI.onStateUpdate((state: any) => {
      console.log('📡 State updated:', state);
    });
  }
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
