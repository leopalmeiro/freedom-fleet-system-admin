
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VehicleComponent } from './vehicle/vehicle.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './../modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehicleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule

  ]
})
export class ComponentsModule { }
