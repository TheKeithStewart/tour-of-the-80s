import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Dancer } from '../models/dancer.model';
import * as fromDancer from './../reducers';

export class DancerDataSource extends DataSource<any> {
  constructor(private store: Store<fromDancer.State>) {
    super();
  }

  connect(): Observable<Dancer[]> {
    return this.store.select(fromDancer.getAllDancers);
  }

  disconnect() {

  }
}
