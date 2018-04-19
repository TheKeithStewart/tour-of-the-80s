import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  map,
  catchError,
  tap,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  delay
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';

import {
  DancerActionTypes,
  LoadDancers,
  LoadDancersFail,
  LoadDancersSuccess,
  GetDancer,
  GetDancerSuccess,
  GetDancerFail,
  UpsertDancer,
  UpdateDancer,
  UpdateDancerSuccess,
  UpdateDancerFail
} from './../actions/dancer.actions';
import { DancerService } from './../dancer.service';

import {
  SearchActionTypes,
  Search,
  SearchSuccess,
  SearchFail
} from './../actions/search.actions';
import { Battle, ChallengeActionTypes, BattleOutcomeDetermined, BattleFail } from '../actions/challenge.actions';
import { BattleOutcome } from '../reducers/challenge.reducer';

export const DEBOUNCE = new InjectionToken<number>('Test Debounce');
export const SCHEDULER = new InjectionToken<Scheduler>('Test Scheduler');

@Injectable()
export class AppEffects {
  @Effect()
  loadDancers$: Observable<Action> = this.actions$.pipe(
    ofType<LoadDancers>(DancerActionTypes.LoadDancers),
    switchMap(() => this.dancerService.getDancers().pipe(
      map(dancers => new LoadDancersSuccess({ dancers: dancers })),
      catchError(err => of(new LoadDancersFail(err)))
    ))
  );

  @Effect()
  getDancer$: Observable<Action> = this.actions$.pipe(
    ofType<GetDancer>(DancerActionTypes.GetDancer),
    map(action => action.payload),
    switchMap(id => this.dancerService.getDancer(id).pipe(
      map(dancer => new GetDancerSuccess({ id, changes: dancer })),
      catchError(err => of(new GetDancerFail(err)))
    ))
  );

  @Effect()
  updateDancer$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateDancer>(DancerActionTypes.UpdateDancer),
    switchMap(action => this.dancerService.updateDancer(action.payload).pipe(
      map(() => {
        const dancer = action.payload;
        return new UpdateDancerSuccess({ dancer: { id: dancer.id, changes: dancer } })
      }),
      tap(() => this.location.back()),
      catchError(err => of(new UpdateDancerFail(err)))
    ))
  );

  @Effect()
  search$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(SearchActionTypes.Search),
    debounceTime(this.debounce || 300, this.scheduler || async),
    switchMap((action: Search) => this.dancerService.searchDancers(action.payload).pipe(
      map(dancers => new SearchSuccess(dancers)),
      catchError(err => of(new SearchFail(err)))
    ))
  );

  @Effect()
  battle$: Observable<Action> = this.actions$.pipe(
    // the action that will trigger this effect
    ofType<Battle>(ChallengeActionTypes.Battle),
    // determine the result of the battle
    switchMap(action => this.dancerService.determineBattleWinnerByCategory(action.payload.challenger, action.payload.challengee).pipe(
      // map the outcome to return a BattleOutcomeDetermined action
      map((outcome: BattleOutcome) => new BattleOutcomeDetermined(outcome)),
      // catch errors and return BattleFail action
	    catchError(err => of(new BattleFail(err)))
    ))
  );

  // Should be your last effect
  @Effect() init$: Observable<Action> = defer(() => {
    return of(new LoadDancers())
  });

  constructor(
    private actions$: Actions,
    private dancerService: DancerService,
    private location: Location,

    // used only for unit tests to be able to inject a debounce value
    @Optional()
    @Inject(DEBOUNCE)
    private debounce: number,

    // used only for unit tests to be able to inject a test scheduler for observables
    @Optional()
    @Inject(SCHEDULER)
    private scheduler: Scheduler
  ) { }
}
