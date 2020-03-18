import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { MaterialModule } from './../../modules/material/material.module';

@NgModule({
  declarations: [
    AdminMainComponent,
    FooterComponent,
    SideMenuComponent,
    TopMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ]
})
export class SharedModule { }
