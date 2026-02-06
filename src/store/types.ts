export interface Animal {
  id: string;
  type: string;
  firstMetAt: string;
  state: 'idle' | 'moving' | 'sleeping';
}

export interface Egg {
  id: string;
  discoveredAt: string;
  animalType: string | null;
}

export interface AppState {
  version: number;
  animals: Animal[];
  eggs: Egg[];
  homeLayout: Record<string, any>;
  collection: Record<string, { firstMetAt: string }>;
  lastSavedAt: string | null;
}

export const INITIAL_STATE: AppState = {
  version: 1,
  animals: [],
  eggs: [],
  homeLayout: {},
  collection: {},
  lastSavedAt: null
};
