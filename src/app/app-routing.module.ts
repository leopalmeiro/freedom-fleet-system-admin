import { NewVehicleComponent } from "./components/vehicle/new-vehicle/new-vehicle.component";
import { VehicleComponent } from "./components/vehicle/vehicle.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminMainComponent } from './shared/components/admin-main/admin-main.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: AdminMainComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "vehicles",
        component: VehicleComponent
      },
      {
        path: "vehicles/new",
        component: NewVehicleComponent
      },
      {
        path: "vehicles/edit/:id",
        component: NewVehicleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
