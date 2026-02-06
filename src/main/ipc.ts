import { ipcMain, BrowserWindow, IpcMainInvokeEvent } from 'electron';
import { getState, setState } from '../store/state';
import { reducer } from '../store/reducer';
import { ChilliaAction } from '../store/actions';

export function registerIPC(overlayWindow: BrowserWindow | null) {
  ipcMain.handle('DISPATCH_ACTION', async (_event: IpcMainInvokeEvent, action: ChilliaAction) => {
    const newState = setState(reducer(getState(), action));
    
    if (overlayWindow && !overlayWindow.isDestroyed()) {
      overlayWindow.webContents.send('STATE_UPDATED', newState);
    }
    
    return newState;
  });

  ipcMain.handle('GET_STATE', async () => {
    return getState();
  });
}

export function broadcastState(state: any, windows: Map<string, BrowserWindow>) {
  windows.forEach((win) => {
    if (win && !win.isDestroyed()) {
      win.webContents.send('STATE_UPDATED', state);
    }
  });
}
