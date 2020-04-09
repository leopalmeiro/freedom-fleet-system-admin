import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink";
import { BreakpointService } from "./../../core/services/layout/breakpoint.service";
import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

import { ConfirmationModalComponent } from "./../../shared/components/confirmation-modal/confirmation-modal.component";
import { ConfirmationMessage } from "./../../shared/models/confirmation-message";
import { Vehicle } from 'src/app/shared/models/vehicle';
import { VehicleService } from 'src/app/core/services/vehicle/vehicle.service';



@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.component.html",
  styleUrls: ["./vehicle.component.css"],
})
export class VehicleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  displayedColumnsAllElements: string[] = [
    "id",
    "name",
    "model",
    "year",
    "plate",
    "actions",
  ];

  displayedColumnsMobile: string[] = ["id", "name", "model", "actions"];
  dataSource = new MatTableDataSource();
  isMobile: boolean;
  private subs = new SubSink();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private breakpointService: BreakpointService,
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumnsAllElements;
    this.dataSource.sort = this.sort;
    this.getVehicles();
    this.getScreenSize();
  }

  getVehicles(): void{
    this.subs.sink = this.vehicleService.getVehicles().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vehicleService.getVehicles();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { title: "Remove Vehicle", id: item.id },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.vehicleService.removeVehicle(result);
      console.log(result);
    });
  }
  openEdit(obj): void {
    console.log(obj);

    this.router.navigate(["/vehicles/edit", obj.id]);
  }

  getScreenSize(): void {
    this.subs.sink = this.breakpointService.screenSizeObserver.subscribe(
      (data) => {
        const screenSize = data;
        screenSize.find((x) => {
          console.log(`size${x}`);

          if (x === "xs") {
            this.isMobile = true;
            //when is mobile remove year column
            this.displayedColumns = this.displayedColumnsMobile;
          } else {
            this.displayedColumns = this.displayedColumnsAllElements;
            this.isMobile = false;
          }
        });
      }
    );
  }
}
