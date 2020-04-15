import { VehicleComponent } from './components/vehicle/vehicle.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './shared/components/admin-main/admin-main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEditVehicleComponent } from './components/vehicle/new-edit-vehicle/new-edit-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'vehicles',
        component: VehicleComponent,
      },
      {
        path: 'vehicles/new',
        component: NewEditVehicleComponent,
      },
      {
        path: 'vehicles/edit/:id',
        component: NewEditVehicleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
