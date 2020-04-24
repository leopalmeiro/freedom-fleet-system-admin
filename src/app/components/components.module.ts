import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './../shared/components/shared-components.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DriverModule } from './driver/driver.module';
import { VehicleModule } from './vehicle/vehicle.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    VehicleModule,
    DashboardModule,
    SharedComponentsModule,
    DriverModule
  ]
})
export class ComponentsModule { }
