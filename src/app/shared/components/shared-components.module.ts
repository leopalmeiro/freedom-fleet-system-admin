import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AdminMainComponent,
    ConfirmationModalComponent,
    TopMenuComponent,
    SideMenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedComponentsModule { }
