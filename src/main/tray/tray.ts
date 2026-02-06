import { app, Tray, Menu, BrowserWindow } from 'electron';

let tray: Tray | null = null;
let clickThroughEnabled = true;

export function createTray(overlayWindow: BrowserWindow | null) {
  tray = new Tray(null as any);
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '🐰 LittlePet',
      enabled: false
    },
    { type: 'separator' },
    {
      label: '✓ Toggle Overlay Click-through',
      type: 'checkbox',
      checked: clickThroughEnabled,
      click: (menuItem) => {
        clickThroughEnabled = menuItem.checked;
        if (overlayWindow && !overlayWindow.isDestroyed()) {
          overlayWindow.setIgnoreMouseEvents(clickThroughEnabled, { forward: true });
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setToolTip('LittlePet');
  tray.setContextMenu(contextMenu);
  
  return tray;
}

export function getClickThroughState(): boolean {
  return clickThroughEnabled;
}

export function setClickThroughState(enabled: boolean, overlayWindow: BrowserWindow | null) {
  clickThroughEnabled = enabled;
  if (overlayWindow && !overlayWindow.isDestroyed()) {
    overlayWindow.setIgnoreMouseEvents(enabled, { forward: true });
  }
  
  if (tray) {
    const contextMenu = Menu.buildFromTemplate([
      { label: '🐰 LittlePet', enabled: false },
      { type: 'separator' },
      {
        label: '✓ Toggle Overlay Click-through',
        type: 'checkbox',
        checked: enabled,
        click: () => setClickThroughState(!enabled, overlayWindow)
      },
      { type: 'separator' },
      { label: 'Quit', click: () => app.quit() }
    ]);
    tray.setContextMenu(contextMenu);
  }
}
