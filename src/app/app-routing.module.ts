import { VehicleComponent } from './components/vehicle/vehicle.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMainComponent } from './shared/components/admin-main/admin-main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewEditVehicleComponent } from './components/vehicle/new-edit-vehicle/new-edit-vehicle.component';
import { NewEditDriverComponent } from './components/driver/new-edit-driver/new-edit-driver.component';
import { DriverComponent } from './components/driver/driver.component';

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
      {
        path: 'drivers',
        component: DriverComponent,
      },
      {
        path: 'drivers/new',
        component: NewEditDriverComponent,
      },
      {
        path: 'drivers/edit/:id',
        component: NewEditDriverComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
