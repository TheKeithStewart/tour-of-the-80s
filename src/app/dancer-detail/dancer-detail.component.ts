import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap, filter, take } from 'rxjs/operators';
import { Location } from '@angular/common';

import { Dancer } from './../models/dancer.model';
import * as fromDancer from './../reducers';
import * as DancerActions from './../actions/dancer.actions';

@Component({
  selector: 'app-dancer-detail',
  templateUrl: './dancer-detail.component.html',
  styleUrls: ['./dancer-detail.component.css']
})
export class DancerDetailComponent implements OnInit {
  dancer: Dancer;

  ratings: {
    moonwalk: number;
    sprinkler: number;
    worm: number;
    disco: number;
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromDancer.State>,
    private location: Location) { }

  ngOnInit(): void {
    this.getDancer();
  }

  getDancer(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.store.dispatch(new DancerActions.GetDancer(id));
    this.store.select(fromDancer.getSelectedDancer).pipe(
      filter(dancer => dancer && dancer.id === id),
      take(1),
      tap(dancer => {
        this.dancer = { ...dancer };
        this.ratings = { ...dancer.ratings };
      })
    ).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    const dancer: Dancer = {
      ...this.dancer,
      ratings: {
        ...this.ratings
      }
    };
    this.store.dispatch(new DancerActions.UpdateDancer(dancer));
  }
}
