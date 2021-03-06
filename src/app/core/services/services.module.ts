import { BreakpointService } from "./layout/breakpoint.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestservService } from "./testserv.service";
import { ErroHandlerService } from "./erro-handler.service";
import { SidemenuService } from "./sidemenu/sidemenu.service";
import { ProgressBarService } from "./progress-bar/progress-bar.service";
import { VehicleService } from "./vehicle/vehicle.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    ErroHandlerService,
    TestservService,
    SidemenuService,
    BreakpointService,
    ProgressBarService,
    VehicleService,
  ],
})
export class ServicesModule {}
