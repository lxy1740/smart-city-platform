import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemonitorComponent } from './themonitor.component';
import { AuthGuard } from '../../../guard/auth-guard.service';

const routes: Routes = [

  {
        path: '',
        component: ThemonitorComponent,
        canActivate: [AuthGuard],

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
