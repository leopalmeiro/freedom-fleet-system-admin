import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "apollo-link";
import { BreakpointService } from "src/app/core/services/layout/breakpoint.service";
import { VehicleService } from "src/app/core/services/vehicle/vehicle.service";
import { ConfirmationModalComponent } from "src/app/shared/components/confirmation-modal/confirmation-modal.component";
import { Vehicle } from "src/app/shared/models/Vehicle";
import { SubSink } from "subsink";

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.component.html",
  styleUrls: ["./vehicle.component.css"],
})
export class VehicleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  displayedColumnsAllElements: string[] = [
    "type",
    "model",
    "year",
    "plate",
    "actions",
  ];
  displayedColumnsMobile: string[] = ["type", "model", "plate", "actions"];
  dataSource = new MatTableDataSource<Vehicle>();

  private subs = new SubSink();
  vehicles: Vehicle[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isMobile: boolean = false;
  posts: Observable<any[]>;
  /**
   * Constructor Method
   * @param dialog
   * @param breakpointService
   * @param router
   * @param vehicleService
   */
  constructor(
    public dialog: MatDialog,
    public breakpointService: BreakpointService,
    private router: Router,
    private vehicleService: VehicleService
  ) {

  }

  /**
   * OnInitMethod
   */
  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getVehicles();
    this.getSizeScreen();
  }
  /**
   * get size Screen method verify when the screen is XS(mobile size)
   */
  getSizeScreen(): void {
    this.subs.sink = this.breakpointService.isMobile$.subscribe((value) => {
      if (value) {
        this.displayedColumns = this.displayedColumnsMobile;
      } else {
        this.displayedColumns = this.displayedColumnsAllElements;
      }
    });
  }
  /**
   * getVehicles method for get all vehicles.
   */
  getVehicles(): void {
    this.subs.sink = this.vehicleService.getVehicles().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  /**
   * onDestroy method
   */
  ngOnDestroy(): void {
    alert('ondestroy');
    this.subs.unsubscribe();
  }
  /**
   * ApplyFilter Method responsable for filter elements
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Open Dialog for Delete items
   * @param item
   */
  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { title: "Remove Vehicle", id: item._id, type: item.type },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result !== "") {
        this.subs.sink = this.vehicleService
          .removeVehicle(result)
          .subscribe((res) => {
            const index = this.dataSource.data.findIndex(
              (el) => el._id === res._id
            );
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.dataSource.data);
            }
          });
      }
    });
  }

  /**
   * Open edit Method for vehicles Edit router
   * @param obj
   */
  openEdit(obj): void {
    this.router.navigate(["/vehicles/edit", obj._id]);
  }
}
