import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dancer } from './../models/dancer.model';
import { DancerActions, DancerActionTypes } from './../actions/dancer.actions';

export interface State extends EntityState<Dancer> {
  loading: boolean,
  error: string,
  selectedDancerId: number | null
}

export const adapter: EntityAdapter<Dancer> = createEntityAdapter<Dancer>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: '',
  selectedDancerId: null
});

export function reducer(
  state = initialState,
  action: DancerActions
): State {
  switch (action.type) {
    case DancerActionTypes.AddDancer: {
      const nextId = state.ids.length > 0 ? Math.max(...state.ids as number[]) + 1 : 0;
      const dancer: Dancer = { ...action.payload.dancer, id: nextId };

      return adapter.addOne(dancer, state);
    }

    case DancerActionTypes.UpsertDancer: {
      return adapter.upsertOne(action.payload.dancer, state);
    }

    case DancerActionTypes.AddDancers: {
      return adapter.addMany(action.payload.dancers, state);
    }

    case DancerActionTypes.UpsertDancers: {
      return adapter.upsertMany(action.payload.dancers, state);
    }

    case DancerActionTypes.UpdateDancer: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }

    case DancerActionTypes.UpdateDancerSuccess: {
      return {
        ...adapter.updateOne(action.payload.dancer, state),
        loading: false
      };
    }

    case DancerActionTypes.UpdateDancerFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case DancerActionTypes.UpdateDancers: {
      return adapter.updateMany(action.payload.dancers, state);
    }

    case DancerActionTypes.DeleteDancer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case DancerActionTypes.DeleteDancers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case DancerActionTypes.LoadDancersSuccess: {
      return adapter.addAll(action.payload.dancers, state);
    }

    case DancerActionTypes.ClearDancers: {
      return adapter.removeAll(state);
    }

    case DancerActionTypes.LoadDancers: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case DancerActionTypes.LoadDancersFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    case DancerActionTypes.GetDancer: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case DancerActionTypes.GetDancerSuccess: {
      const id = <number>action.payload.id;

      return {
        ...adapter.upsertOne(action.payload, state),
        loading: false,
        selectedDancerId: id
      }
    }

    default: {
      return state;
    }
  }
}

export const getSelectedDancerId = (state: State) => state.selectedDancerId;
