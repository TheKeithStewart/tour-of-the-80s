import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DancersComponent } from './dancers/dancers.component';
import { DancerDetailComponent } from './dancer-detail/dancer-detail.component';
import { DanceChallengeComponent } from './dance-challenge/dance-challenge.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: DancerDetailComponent },
  { path: 'dancers', component: DancersComponent },
  { path: 'challenge/:id', component: DanceChallengeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
