import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../modules/material/material.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BtnPrintComponent } from './print/btn-print/btn-print.component';
import { PrintLayoutComponent } from './print/print-layout/print-layout.component';

@NgModule({
  declarations: [
    AdminMainComponent,
    ConfirmationModalComponent,
    TopMenuComponent,
    SideMenuComponent,
    FooterComponent,
    ErrorHandlerComponent,
    ProgressBarComponent,
    BtnPrintComponent,
    PrintLayoutComponent
  ],
  exports: [
    AdminMainComponent,
    ConfirmationModalComponent,
    TopMenuComponent,
    SideMenuComponent,
    FooterComponent,
    ErrorHandlerComponent,
    BrowserAnimationsModule,
    BrowserModule,
    BtnPrintComponent,
    PrintLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedComponentsModule { }
