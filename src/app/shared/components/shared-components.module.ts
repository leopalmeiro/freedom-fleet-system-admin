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
import { PrintContainerComponent } from './print/print-container/print-container.component';
import { PrintTitleComponent } from './print/print-title/print-title.component';
import { PrintFooterComponent } from './print/print-footer/print-footer.component';
import { PrintPageComponent } from './print/print-page/print-page.component';

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
    PrintLayoutComponent,
    PrintContainerComponent,
    PrintTitleComponent,
    PrintFooterComponent,
    PrintPageComponent
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
    PrintLayoutComponent,
    PrintPageComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedComponentsModule { }
