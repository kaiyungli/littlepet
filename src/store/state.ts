import { AppState, INITIAL_STATE } from './types';

let currentState: AppState = { ...INITIAL_STATE };

export function getState(): AppState {
  return { ...currentState };
}

export function setState(updates: Partial<AppState>): AppState {
  currentState = { ...currentState, ...updates, lastSavedAt: null };
  return currentState;
}

export function resetState() {
  currentState = { ...INITIAL_STATE };
}
