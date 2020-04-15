import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { QRCodeModule } from "angularx-qrcode";
import { VehicleComponent } from "./vehicle.component";
import { MaterialModule } from 'src/app/modules/material/material.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { NewEditVehicleComponent } from './new-edit-vehicle/new-edit-vehicle.component';

@NgModule({
  declarations: [VehicleComponent, NewEditVehicleComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    QRCodeModule,
    SharedComponentsModule,
  ]
})
export class VehicleModule {}
