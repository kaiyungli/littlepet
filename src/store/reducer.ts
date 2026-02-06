import { ChilliaAction } from './actions';
import { AppState } from './types';

export function reducer(state: AppState, action: ChilliaAction): Partial<AppState> {
  switch (action.type) {
    case 'APP/BOOT':
      return {};
    case 'APP/PING':
      return {};
    case 'UI/TOGGLE_HOME':
      return { homeOpen: !state.homeOpen };
    case 'UI/TOGGLE_COLLECTION':
      return { collectionOpen: !state.collectionOpen };
    case 'OVERLAY/TOGGLE_MOUSE':
      return {};
    default:
      return {};
  }
}
