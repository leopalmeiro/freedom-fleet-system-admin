import { VehicleComponent } from './components/vehicle/vehicle.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './components/shared/admin-main/admin-main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [{
      path: '',
      component: DashboardComponent,
    },
    {
      path: 'vehicle',
      component: VehicleComponent,
    }
    ]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
