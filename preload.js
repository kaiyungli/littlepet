const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('chilliaAPI', {
  getState: () => ipcRenderer.invoke('GET_STATE'),
  onStateUpdate: (callback: (state: any) => void) => {
    ipcRenderer.on('STATE_UPDATED', (_event: any, state: any) => callback(state));
  },
  dispatchAction: (action: any) => ipcRenderer.invoke('DISPATCH_ACTION', action)
});
