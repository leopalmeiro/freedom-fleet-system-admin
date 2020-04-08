import { Router, ActivatedRoute } from "@angular/router";
import { SubSink } from "subsink";
import { BreakpointService } from "./../../core/services/layout/breakpoint.service";
import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

import { ConfirmationModalComponent } from "./../../shared/components/confirmation-modal/confirmation-modal.component";
import { ConfirmationMessage } from "./../../shared/models/confirmation-message";

export interface Vehicle {
  id: number;
  name: String;
  model: String;
  year: number;
  plate: String;
}

const ELEMENT_DATA: Vehicle[] = [
  { id: 1, name: "Lambo", model: "aventor", year: 2020, plate: "tes-45200" },
  { id: 2, name: "Lambo", model: "aventor", year: 2018, plate: "tes-45200" },
  { id: 3, name: "Lambo", model: "aventor", year: 1255, plate: "tes-45200" },
  { id: 4, name: "Lambo", model: "aventor", year: 1920, plate: "tes-45200" },
  { id: 5, name: "Lambo", model: "aventor01", year: 2020, plate: "tes-45200" },
  { id: 6, name: "Lambo", model: "aventor", year: 2020, plate: "tes-45200" },
  { id: 7, name: "Lambo", model: "aventor", year: 2018, plate: "tes-45200" },
  { id: 8, name: "Lambo", model: "aventor", year: 1255, plate: "tes-45200" },
  { id: 9, name: "Lambo", model: "aventor", year: 1920, plate: "tes-45200" },
  { id: 10, name: "Lambo", model: "aventor01", year: 2020, plate: "tes-45200" },
];

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
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  isMobile: boolean;
  private subs = new SubSink();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private breakpointService: BreakpointService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumnsAllElements;
    this.dataSource.sort = this.sort;
    this.getScreenSize();
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
