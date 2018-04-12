import { Action } from '@ngrx/store';

import { ChallengeActions, ChallengeActionTypes } from './../actions/challenge.actions';

export enum BattleOutcome {
  Tie = 0,
  ChallengerWins = 1,
  ChallengeeWins = 2
}

export interface State {
  challengerId: number | null,
  challengeeId: number | null,
  battleInProgress: boolean
  battleOutcome: BattleOutcome
}

export const initialState: State = {
  challengerId: null,
  challengeeId: null,
  battleInProgress: false,
  battleOutcome: null
};

export function reducer(state = initialState, action: ChallengeActions): State {
  switch (action.type) {
    case ChallengeActionTypes.SetChallenger: {
      return {
        ...state,
        challengerId: action.payload
      }
    }

    case ChallengeActionTypes.SetChallengee: {
      return {
        ...state,
        challengeeId: action.payload
      }
    }

    case ChallengeActionTypes.ClearChallenge: {
      return {
        ...state,
        challengerId: null,
        challengeeId: null, 
        battleInProgress: false,
        battleOutcome: null
      }
    }

    case ChallengeActionTypes.Battle: {
      // if challengers have not been chosen then just return same state
      if (!state.challengerId || !state.challengeeId) {
        return {
          ...state
        }
      }

      return {
        ...state,
        battleInProgress: true
      }
    }

    case ChallengeActionTypes.BattleOutcomeDetermined: {
      return {
        ...state,
        battleInProgress: false,
        battleOutcome: action.payload
      }
    }

    case ChallengeActionTypes.BattleOutcomeClear: {
      return {
        ...state,
        battleInProgress: false,
        battleOutcome: null
      }
    }

    default:
      return state;
  }
}

export const getChallengerId = (state: State) => state.challengerId;
export const getChallengeeId = (state: State) => state.challengeeId;
export const getBattleInProgress = (state: State) => state.battleInProgress;
export const getBattleOutcome = (state: State) => state.battleOutcome;
