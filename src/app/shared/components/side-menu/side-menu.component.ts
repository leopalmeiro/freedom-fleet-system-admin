import { BreakpointService } from "./../../../core/services/layout/breakpoint.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SidemenuService } from "./../../../core/services/sidemenu/sidemenu.service";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.css"],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  @ViewChild("sidemenu", { static: true }) public sidemenu: MatSidenav;
  isMobile: boolean;
  constructor(
    private sideMenuService: SidemenuService,
    private breakpointService: BreakpointService
  ) {}

  ngOnInit(): void {
    this.sideMenuService.setSidemenu(this.sidemenu);
    this.getScreenSize();
  }
  getScreenSize(): void {
    this.breakpointService.screenSizeObserver.subscribe((data) => {
      const screenSize = data;
      screenSize.find((x) => {
        if (x === "xs" || x === "sm" || x == "md") {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.breakpointService.screenSizeObserver.unsubscribe();
  }
}
