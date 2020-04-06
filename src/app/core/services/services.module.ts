import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestservService } from './testserv.service';
import { ErroHandlerService } from './erro-handler.service';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  providers: [
    ErroHandlerService,
    TestservService
  ]
})
export class ServicesModule { }
