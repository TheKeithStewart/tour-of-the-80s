import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { DancersComponent } from './dancers.component';
import * as fromDancer from './../reducers';

describe('DancersComponent', () => {
  let component: DancersComponent;
  let fixture: ComponentFixture<DancersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DancersComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromDancer.reducers
        }),
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        NoopAnimationsModule,
        MatTableModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
