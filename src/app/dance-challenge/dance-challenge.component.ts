import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromDancer from './../reducers';
import * as ChallengeActions from './../actions/challenge.actions';
import { Dancer } from '../models/dancer.model';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { BattleOutcome } from '../reducers/challenge.reducer';

@Component({
  selector: 'app-dance-challenge',
  templateUrl: './dance-challenge.component.html',
  styleUrls: ['./dance-challenge.component.css']
})
export class DanceChallengeComponent implements OnInit, OnDestroy {
  challenger: Dancer;
  challengee: Dancer;
  challenger$: Observable<Dancer>;
  challengee$: Observable<Dancer>;
  potentialChallengees$: Observable<Dancer[]>;
  challengersAreChosen$: Observable<boolean>;
  battleInProgress$: Observable<boolean>;
  battleOutcome$: Observable<BattleOutcome>;
  outcomeMessage: string;

  constructor(private route: ActivatedRoute, private store: Store<fromDancer.State>) { }

  ngOnInit() {
    // set challenger
    this.route.params.subscribe(params => {
      this.store.dispatch(new ChallengeActions.SetChallenger(+params.id));
    });

    // select the challenger, array of potential challengees, and challengee
    this.challenger$ = this.store.pipe(
      select(fromDancer.getSelectedChallenger),
      tap(dancer => this.challenger = dancer)
    );
    this.challengee$ = this.store.pipe(
      select(fromDancer.getSelectedChallengee),
      tap(dancer => this.challengee = dancer)
    );
    this.potentialChallengees$ = this.store.select(fromDancer.getPotentialChallengees);
    this.challengersAreChosen$ = this.store.select(fromDancer.getChallengersAreChosen);
    this.battleInProgress$ = this.store.select(fromDancer.getBattleInProgress);
    this.battleOutcome$ = this.store.pipe(
      select(fromDancer.getBattleOutcome),
      tap(outcome => {
        switch (outcome) {
          case BattleOutcome.ChallengerWins:
            this.outcomeMessage = `${this.challenger.name} wins!!!`;
            break;

          case BattleOutcome.ChallengeeWins:
            this.outcomeMessage = `${this.challengee.name} wins!!!`;
            break;

          case BattleOutcome.Tie:
            this.outcomeMessage = `It's a tie!!!`;
            break;
        
          default:
            break;
        }
      })
    );
  }

  ngOnDestroy() {
    // clear the challenge
    this.store.dispatch(new ChallengeActions.ClearChallenge());
  }

  setChallengee(id: number) {
    this.store.dispatch(new ChallengeActions.SetChallengee(id));
  }

  battle() {
    this.store.dispatch(new ChallengeActions.Battle({
      challenger: this.challenger,
      challengee: this.challengee,
      delay: 5000
    }));
  }
}
