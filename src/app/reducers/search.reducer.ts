import { SearchActions, SearchActionTypes } from './../actions/search.actions';

export interface State {
  ids: number[];
  loading: boolean;
  error: string;
  query: string;
}

export const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: ''
};

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.Search: {
      const query = action.payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query
      };
    }

    case SearchActionTypes.SearchSuccess: {
      return {
        ...state,
        ids: action.payload.map(dancer => dancer.id),
        loading: false,
        error: ''
      }
    }

    case SearchActionTypes.SearchFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    }

    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
