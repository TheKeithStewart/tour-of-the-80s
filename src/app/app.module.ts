import 'hammerjs';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DancerDetailComponent } from './dancer-detail/dancer-detail.component';
import { DancersComponent } from './dancers/dancers.component';
import { DancerSearchComponent } from './dancer-search/dancer-search.component';
import { DancerService } from './dancer.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects/app.effects';

import { MaterialModule } from './material/material.module';
import { DanceChallengeComponent } from './dance-challenge/dance-challenge.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'Tour of Dancers'
    }) : [],

    EffectsModule.forRoot([AppEffects]),
    MaterialModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    DancersComponent,
    DancerDetailComponent,
    DancerSearchComponent,
    DanceChallengeComponent
  ],
  providers: [DancerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
