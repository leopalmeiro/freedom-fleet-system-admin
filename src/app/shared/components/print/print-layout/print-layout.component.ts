import { Component, OnInit, Input, ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';

@Component({
  selector: 'app-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.css'],
})
export class PrintLayoutComponent implements OnInit {
  constructor() { }
  private externalWindow = null;

  ngOnInit(): void {

  }

  open(){

  }


}
