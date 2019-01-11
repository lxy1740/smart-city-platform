import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../../guard/auth-guard.service';
import { ThestrategyComponent } from './thestrategy.component';


const routes: Routes = [

  {
    path: '',
    component: ThestrategyComponent,
    canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThestrategyRoutingModule { }
