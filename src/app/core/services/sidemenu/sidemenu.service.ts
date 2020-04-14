import { Injectable } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";

@Injectable({
  providedIn: "root",
})
export class SidemenuService {
  private sidemenu: MatSidenav;

  setSidemenu(sidemenu: MatSidenav) {
    this.sidemenu = sidemenu;
  }

  open() {
    return this.sidemenu.open();
  }

  close() {
    return this.sidemenu.close();
  }

  toggle(): void {
    this.sidemenu.toggle();
  }
}
