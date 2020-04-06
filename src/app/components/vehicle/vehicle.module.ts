import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { MaterialModule } from './../../modules/material/material.module';
import { VehicleComponent } from './vehicle.component';
import { NewVehicleComponent } from './new-vehicle/new-vehicle.component';


@NgModule({
  declarations: [
    VehicleComponent,
    NewVehicleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    QRCodeModule,
  ]
})
export class VehicleModule { }
