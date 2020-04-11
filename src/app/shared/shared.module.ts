import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from './components/shared-components.module';
import { PrintDirective } from './directives/print.directive';

@NgModule({
  declarations: [PrintDirective],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule

  ],
  providers: []
})
export class SharedModule { }
