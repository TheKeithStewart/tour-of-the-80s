import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Dancer } from './../models/dancer.model';

export enum DancerActionTypes {
  AddDancer = '[Dancer] Add Dancer',
  UpsertDancer = '[Dancer] Upsert Dancer',
  AddDancers = '[Dancer] Add Dancers',
  UpsertDancers = '[Dancer] Upsert Dancers',
  UpdateDancer = '[Dancer] Update Dancer',
  UpdateDancerSuccess = '[Dancer] Update Dancer Success',
  UpdateDancerFail = '[Dancer] Update Dancer Fail',
  UpdateDancers = '[Dancer] Update Dancers',
  DeleteDancer = '[Dancer] Delete Dancer',
  DeleteDancers = '[Dancer] Delete Dancers',
  ClearDancers = '[Dancer] Clear Dancers',
  LoadDancers = '[Dancer] Load Dancers',
  LoadDancersSuccess = '[Dancer] Load Dancers Success',
  LoadDancersFail = '[Dancer] Load Dancers Fail',
  GetDancer = '[Dancer] Get Dancer',
  GetDancerSuccess = '[Dancer] Get Dancer Success',
  GetDancerFail = '[Dancer] Get Dancer Fail'
}

export class AddDancer implements Action {
  readonly type = DancerActionTypes.AddDancer;

  constructor(public payload: { dancer: Dancer }) { }
}

export class UpsertDancer implements Action {
  readonly type = DancerActionTypes.UpsertDancer;

  constructor(public payload: { dancer: Update<Dancer> }) { }
}

export class AddDancers implements Action {
  readonly type = DancerActionTypes.AddDancers;

  constructor(public payload: { dancers: Dancer[] }) { }
}

export class UpsertDancers implements Action {
  readonly type = DancerActionTypes.UpsertDancers;

  constructor(public payload: { dancers: Update<Dancer>[] }) { }
}

export class UpdateDancer implements Action {
  readonly type = DancerActionTypes.UpdateDancer;

  constructor(public payload: Dancer) { }
}

export class UpdateDancerSuccess implements Action {
  readonly type = DancerActionTypes.UpdateDancerSuccess;

  constructor(public payload: { dancer: Update<Dancer> }) { }
}

export class UpdateDancerFail implements Action {
  readonly type = DancerActionTypes.UpdateDancerFail;

  constructor(public payload: string) { }
}

export class UpdateDancers implements Action {
  readonly type = DancerActionTypes.UpdateDancers;

  constructor(public payload: { dancers: Update<Dancer>[] }) { }
}

export class DeleteDancer implements Action {
  readonly type = DancerActionTypes.DeleteDancer;

  constructor(public payload: { id: number }) { }
}

export class DeleteDancers implements Action {
  readonly type = DancerActionTypes.DeleteDancers;

  constructor(public payload: { ids: number[] }) { }
}

export class ClearDancers implements Action {
  readonly type = DancerActionTypes.ClearDancers;
}

export class LoadDancers implements Action {
  readonly type = DancerActionTypes.LoadDancers;
}

export class LoadDancersSuccess implements Action {
  readonly type = DancerActionTypes.LoadDancersSuccess;

  constructor(public payload: { dancers: Dancer[] }) { }
}

export class LoadDancersFail implements Action {
  readonly type = DancerActionTypes.LoadDancersFail;

  constructor(public payload: string) { }
}

export class GetDancer implements Action {
  readonly type = DancerActionTypes.GetDancer;

  constructor(public payload: number) { }
}

export class GetDancerSuccess implements Action {
  readonly type = DancerActionTypes.GetDancerSuccess;

  constructor(public payload: Update<Dancer>) { }
}

export class GetDancerFail implements Action {
  readonly type = DancerActionTypes.GetDancerFail;

  constructor(public payload: string) { }
}

export type DancerActions =
  LoadDancersSuccess
  | AddDancer
  | UpsertDancer
  | AddDancers
  | UpsertDancers
  | UpdateDancer
  | UpdateDancerSuccess
  | UpdateDancerFail
  | UpdateDancers
  | DeleteDancer
  | DeleteDancers
  | ClearDancers
  | LoadDancers
  | LoadDancersFail
  | GetDancer
  | GetDancerSuccess
  | GetDancerFail;
