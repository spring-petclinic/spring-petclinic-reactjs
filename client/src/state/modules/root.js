import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

import owner, { ownerEpic } from './owner';
import pet, { petEpic } from './pet';

const rootEpic = combineEpics(ownerEpic, petEpic);
const rootReducer = combineReducers({
  owner,
  pet
});

export { rootReducer as default, rootEpic };
