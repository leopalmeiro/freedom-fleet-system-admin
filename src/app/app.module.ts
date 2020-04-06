import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { QRCodeModule } from 'angularx-qrcode';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { ErroHandlerService } from './core/services/erro-handler.service';
import { TestservService } from './core/services/testserv.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    QRCodeModule,
    ComponentsModule,
    SharedModule,
    SharedComponentsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
