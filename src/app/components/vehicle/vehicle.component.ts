import { Component, OnInit, ViewChild } from "@angular/core";

import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

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
  { id: 5, name: "Lambo", model: "aventor01", year: 2020, plate: "tes-45200" }
];

@Component({
  selector: "app-vehicle",
  templateUrl: "./vehicle.component.html",
  styleUrls: ["./vehicle.component.css"]
})
export class VehicleComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "model", "year", "plate"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  constructor() {}

  onSubmit() {}
}
