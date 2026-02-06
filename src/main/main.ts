import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import { loadState } from '../store/persistence';
import { registerIPC } from './ipc';
import { createOverlayWindow } from './windows/overlay';
import { createTray, setClickThroughState } from './tray/tray';

class LittlePetApp {
  private windows: Map<string, BrowserWindow> = new Map();

  async init() {
    await app.whenReady();
    loadState();
    
    const { width, height } = screen.getPrimaryDisplay().size;
    
    // Create overlay first
    const overlay = createOverlayWindow();
    this.windows.set('overlay', overlay);
    
    // Enable click-through by default
    setClickThroughState(true, overlay);
    
    // Create other windows
    this.windows.set('home', this.createHome());
    this.windows.set('collection', this.createCollection());
    
    // Register IPC
    registerIPC(overlay);
    
    // Create tray
    createTray(overlay);
    
    console.log('🐰 LittlePet running');
  }

  private createHome() {
    const win = new BrowserWindow({ width: 600, height: 500, titleBarStyle: 'hidden' });
    win.loadURL(`file://${path.join(__dirname, '../public/home.html')}`);
    return win;
  }

  private createCollection() {
    const win = new BrowserWindow({ width: 700, height: 500, titleBarStyle: 'hidden' });
    win.loadURL(`file://${path.join(__dirname, '../public/collection.html')}`);
    return win;
  }
}

app.whenReady().then(() => new LittlePetApp());
