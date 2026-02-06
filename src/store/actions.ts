export type ActionType = 
  | 'APP/BOOT'
  | 'APP/PING'
  | 'UI/TOGGLE_HOME'
  | 'UI/TOGGLE_COLLECTION'
  | 'OVERLAY/TOGGLE_MOUSE';

export interface ChilliaAction {
  type: ActionType;
  payload?: any;
}

export function createAction<T extends ActionType>(
  type: T, 
  payload?: any
): ChilliaAction {
  return { type, payload };
}

export const Actions = {
  boot: () => createAction('APP/BOOT'),
  ping: () => createAction('APP/PING'),
  toggleHome: () => createAction('UI/TOGGLE_HOME'),
  toggleCollection: () => createAction('UI/TOGGLE_COLLECTION')
};
