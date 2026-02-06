import { BrowserWindow, screen } from 'electron';
import * as path from 'path';

export function createOverlayWindow(): BrowserWindow {
  const { width, height } = screen.getPrimaryDisplay().size;
  
  const win = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    minimizable: false,
    hasShadow: false,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: false,
      preload: path.join(__dirname, '../../preload.js')
    }
  });

  win.setAlwaysOnTop(true, 'screen-saver');
  win.setMenuBarVisibility(false);
  
  // Enable click-through by default
  win.setIgnoreMouseEvents(true, { forward: true });
  
  win.loadURL(`file://${path.join(__dirname, '../../public/overlay.html')}`);
  
  return win;
}

export function setOverlayMouseIgnore(_win: BrowserWindow, _ignore: boolean) {
  // Reserved for future
}
