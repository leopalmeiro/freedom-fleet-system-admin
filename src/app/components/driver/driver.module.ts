import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { DriverComponent } from './driver.component';
import { NewEditDriverComponent } from './new-edit-driver/new-edit-driver.component';



@NgModule({
  declarations: [DriverComponent, NewEditDriverComponent,],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ]
})
export class DriverModule { }
