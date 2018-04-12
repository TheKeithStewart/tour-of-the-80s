import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Dancer } from './../models/dancer.model';
import * as fromDancer from './../reducers';
import * as DancerActions from './../actions/dancer.actions';
import { DancerDataSource } from './dancers-data-source';

@Component({
  selector: 'app-dancers',
  templateUrl: './dancers.component.html',
  styleUrls: ['./dancers.component.css']
})
export class DancersComponent implements OnInit {
  dataSource: DancerDataSource | null;
  columns = ['id', 'image', 'name', 'actions'];

  constructor(private store: Store<fromDancer.State>) { }

  ngOnInit() {
    this.dataSource = new DancerDataSource(this.store);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    // TODO: add effect and unit tests around adding a dancer (#9)
    const dancer = new Dancer();
    dancer.name = name;
    dancer.ratings = {
      moonwalk: 1,
      sprinkler: 1,
      worm: 1,
      disco: 1
    };
    this.store.dispatch(new DancerActions.AddDancer({
      dancer: dancer
    }));
  }

  delete(dancer: Dancer): void {
    this.store.dispatch(new DancerActions.DeleteDancer({ id: dancer.id }))
  }

}
