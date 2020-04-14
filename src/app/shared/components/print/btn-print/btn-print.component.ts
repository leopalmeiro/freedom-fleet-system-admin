import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-btn-print",
  templateUrl: "./btn-print.component.html",
  styleUrls: ["./btn-print.component.css"],
})
export class BtnPrintComponent implements OnInit {
  @Input() type: string;

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  print(): void {
   window.print();
  }
}
