import { BreakpointService } from "./../../../core/services/layout/breakpoint.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SidemenuService } from "./../../../core/services/sidemenu/sidemenu.service";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.css"],
})
export class SideMenuComponent implements OnInit {
  @ViewChild("sidemenu", { static: true }) public sidemenu: MatSidenav;
  constructor(
    private sideMenuService: SidemenuService,
    public breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.sideMenuService.setSidemenu(this.sidemenu);
  }
}
