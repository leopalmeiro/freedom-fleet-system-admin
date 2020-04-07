import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { MaterialModule } from "./../../modules/material/material.module";
import { SharedComponentsModule } from "./../../shared/components/shared-components.module";
import { ServicesModule } from "./../../core/services/services.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ServicesModule,
    SharedComponentsModule,
  ],
})
export class DashboardModule {}
