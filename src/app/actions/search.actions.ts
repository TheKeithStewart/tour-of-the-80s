import { Action } from '@ngrx/store';

import { Dancer } from '../models/dancer.model';

export enum SearchActionTypes {
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFail = '[Search] Search Fail'
}

export class Search implements Action {
  readonly type = SearchActionTypes.Search;

  constructor(public payload: string) { }
}

export class SearchSuccess implements Action {
  readonly type = SearchActionTypes.SearchSuccess;

  constructor(public payload: Dancer[]) { }
}

export class SearchFail implements Action {
  readonly type = SearchActionTypes.SearchFail;

  constructor(public payload: string) { }
}

export type SearchActions =
  | Search
  | SearchSuccess
  | SearchFail;
