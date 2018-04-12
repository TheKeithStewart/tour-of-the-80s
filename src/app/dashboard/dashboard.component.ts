import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Dancer } from './../models/dancer.model';
import * as fromDancer from './../reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dancers: Observable<Dancer[]>;

  constructor(private store: Store<fromDancer.State>) { }

  ngOnInit() {
    this.getDancers();
  }

  getDancers(): void {
    this.dancers = this.store.select(fromDancer.getTopDancers);
  }
}
