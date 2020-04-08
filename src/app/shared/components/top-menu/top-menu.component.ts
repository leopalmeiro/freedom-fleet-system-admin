import { SidemenuService } from "./../../../core/services/sidemenu/sidemenu.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.css"],
})
export class TopMenuComponent implements OnInit {
  constructor(private sidemenuService: SidemenuService) {}

  ngOnInit(): void {}

  toggleSidemenu() {
    console.log("toggle");

    this.sidemenuService.toggle();
  }
}
