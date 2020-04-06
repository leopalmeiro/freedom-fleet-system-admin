import { SharedComponentsModule } from './../shared/components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleModule } from './vehicle/vehicle.module';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VehicleModule,
    DashboardModule,
    SharedComponentsModule
  ]
})
export class ComponentsModule { }
