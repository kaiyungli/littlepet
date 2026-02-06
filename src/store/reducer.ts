import { ChilliaAction, ActionType } from './actions';
import { AppState } from './types';

export function reducer(state: AppState, action: ChilliaAction): Partial<AppState> {
  switch (action.type) {
    case 'APP/BOOT':
      console.log('⚡ APP/BOOT received');
      return {};
      
    case 'APP/PING':
      console.log('⚡ APP/PING received');
      return {};
      
    case 'UI/TOGGLE_HOME':
      return { homeOpen: !state.homeOpen };
      
    case 'UI/TOGGLE_COLLECTION':
      return { collectionOpen: !state.collectionOpen };
      
    case 'OVERLAY/TOGGLE_MOUSE':
      console.log('⚡ Toggle mouse');
      return {};
      
    default:
      return {};
  }
}
