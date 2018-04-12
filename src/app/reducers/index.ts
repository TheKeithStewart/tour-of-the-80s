import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import * as fromDancer from './dancer.reducer';
import * as fromSearch from './search.reducer';
import * as fromChallenge from './challenge.reducer';

export interface State {
  dancers: fromDancer.State;
  search: fromSearch.State;
  challenge: fromChallenge.State;
}

export const reducers: ActionReducerMap<State> = {
  dancers: fromDancer.reducer,
  search: fromSearch.reducer,
  challenge: fromChallenge.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];

export const getDancerState = createFeatureSelector<fromDancer.State>('dancers');
export const getSearchState = createFeatureSelector<fromSearch.State>('search');
export const getChallengeState = createFeatureSelector<fromChallenge.State>('challenge');

export const {
  selectIds: getDancerIdState,
  selectEntities: getDancerEntityState,
  selectAll: getAllDancers,
  selectTotal,
} = fromDancer.adapter.getSelectors(getDancerState);

export const getTopDancers = createSelector(
  getAllDancers,
  (entities) => entities.slice(1, 5)
);

export const getSelectedDancerId = createSelector(
  getDancerState,
  fromDancer.getSelectedDancerId
);
export const getSelectedDancer = createSelector(
  getDancerEntityState,
  getSelectedDancerId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId]
  }
);

export const getSelectedChallengerId = createSelector(
  getChallengeState,
  fromChallenge.getChallengerId
);
export const getSelectedChallenger = createSelector(
  getDancerEntityState,
  getSelectedChallengerId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
export const getSelectedChallengeeId = createSelector(
  getChallengeState,
  fromChallenge.getChallengeeId
);
export const getSelectedChallengee = createSelector(
  getDancerEntityState,
  getSelectedChallengeeId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
export const getPotentialChallengees = createSelector(
  getAllDancers,
  getSelectedChallengerId,
  (dancers, selectedId) => {
    return selectedId && dancers.filter(dancer => dancer.id != selectedId);
  }
);
export const getChallengersAreChosen = createSelector(
  getSelectedChallengerId,
  getSelectedChallengeeId,
  (challengerId, challengeeId) => challengerId && challengeeId ? true : false
);
export const getBattleInProgress = createSelector(
  getChallengeState,
  fromChallenge.getBattleInProgress
);
export const getBattleOutcome = createSelector(
  getChallengeState,
  fromChallenge.getBattleOutcome
);

export const getSearchDancerIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchResult = createSelector(
  getDancerEntityState,
  getSearchDancerIds,
  (dancers, searchIds) => {
    return searchIds.map(id => dancers[id]);
  }
);
