import * as fs from 'fs';
import * as path from 'path';
import { AppState, INITIAL_STATE } from './types';
import { getState, setState, resetState } from './state';

const DATA_DIR = path.join(process.cwd(), 'data');
const SAVE_FILE = path.join(DATA_DIR, 'save.json');

export function loadState(): AppState {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    
    if (fs.existsSync(SAVE_FILE)) {
      const content = fs.readFileSync(SAVE_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      
      if (parsed && typeof parsed === 'object') {
        console.log('💾 Save loaded');
        const state = { ...INITIAL_STATE, ...parsed, version: INITIAL_STATE.version };
        Object.assign(getState(), state);
        return getState();
      }
    }
  } catch (e) {
    console.log('💾 Using initial state');
  }
  
  resetState();
  return getState();
}

export function saveState(): void {
  try {
    const state = getState();
    const data = {
      ...state,
      version: INITIAL_STATE.version,
      lastSavedAt: new Date().toISOString()
    };
    
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SAVE_FILE, JSON.stringify(data, null, 2));
    console.log('💾 Saved');
  } catch (e) {
    console.log('💾 Save failed (ignored)');
  }
}
