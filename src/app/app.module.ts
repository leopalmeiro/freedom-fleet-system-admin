
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainContentComponent } from './components/main-content/main-content.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    TopMenuComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
      FormsModule,
      ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
