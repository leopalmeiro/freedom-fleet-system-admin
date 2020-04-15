import { Component, OnInit } from "@angular/core";
import { BreakpointService } from 'src/app/core/services/layout/breakpoint.service';
import { SidemenuService } from 'src/app/core/services/sidemenu/sidemenu.service';

@Component({
  selector: "app-top-menu",
  templateUrl: "./top-menu.component.html",
  styleUrls: ["./top-menu.component.css"],
})
export class TopMenuComponent implements OnInit {
  /**
   * Constructor Method for TpoMenuComponent
   * @param sidemenuService
   * @param breakpointServer
   */
  constructor(private sidemenuService: SidemenuService, public breakpointServer: BreakpointService) {}

  ngOnInit(): void {}
  /**
   * ToggleSideMenu Method for open and close side menu
   */
  toggleSidemenu() {
    this.sidemenuService.toggle();

  }
}
