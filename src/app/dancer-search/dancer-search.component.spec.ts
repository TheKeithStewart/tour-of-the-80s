import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { DancerSearchComponent } from './dancer-search.component';
import * as fromDancer from './../reducers';

describe('DancerSearchComponent', () => {
  let component: DancerSearchComponent;
  let fixture: ComponentFixture<DancerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DancerSearchComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromDancer.reducers
        }),
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DancerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
