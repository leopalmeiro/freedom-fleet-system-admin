
import {
  Component,
  OnInit,
  Input,
  Injector,
  ApplicationRef,
  ComponentFactoryResolver,
  ViewChild,
  AfterViewInit,
  ComponentFactory,
  ComponentRef,
  ViewContainerRef,
  ElementRef,
} from "@angular/core";
import { PrintLayoutComponent } from '../print-layout/print-layout.component';

@Component({
  selector: "app-btn-print",
  templateUrl: "./btn-print.component.html",
  styleUrls: ["./btn-print.component.css"],
})

export class BtnPrintComponent implements OnInit, AfterViewInit {
  @Input() elements: any[];
  @Input() type: string;

  hasPrint = false;


  constructor(
    //private resolver: ComponentFactoryResolver,
    ) { }


  ngAfterViewInit(): void {

  }

  ngOnInit(): void {}

  print():void{
    //this.compDynamicContainer.clear();
    //const factory: ComponentFactory<PrintLayoutComponent> = this.resolver.resolveComponentFactory(PrintLayoutComponent);
    //this.componentRef = this.compDynamicContainer.createComponent(factory);
    this.hasPrint = true;

    //const element = "<div #printComponent></div>";
    //this.compDynamicContainer.clear();
    //const factory: ComponentFactory<PrintLayoutComponent> = this.resolver.resolveComponentFactory(PrintLayoutComponent);
    //this.componentRef = this.compDynamicContainer.createComponent(factory);
    //console.log(this.componentRef);
    //const open = this.componentRef.instance.open();
    //const externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    //externalWindow.document.write(element);
    //console.log(this.compDynamicContainer.createEmbeddedView);

    //externalWindow.document.write();
    //externalWindow.print();
  }

}

