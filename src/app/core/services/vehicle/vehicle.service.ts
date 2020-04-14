import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Vehicle } from "src/app/shared/models/vehicle";
import { VEHICLES } from "src/app/mocks/mocks";
import { delay, map } from "rxjs/operators";
import { ProgressBarService } from "../progress-bar/progress-bar.service";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private v = [...VEHICLES];
  private subject = new Subject<Vehicle[]>();

  constructor(private progressBarService: ProgressBarService) {}

  getVehicles(): Observable<Vehicle[]> {
    this.getDelay();
    this.subject.next(this.v);
    return this.subject.asObservable();
  }

  addVehicle(vehicle: Vehicle): void {
    this.getDelay();
    vehicle.id = this.v.length + 1;
    this.v.push(vehicle);
    console.log(this.v);
  }

  removeVehicle(vehicleId): void {
    this.getDelay();
    const index = vehicleId - 1;
    this.v.splice(index, 1);
    for (var i = 0; i < this.v.length; i++) {
      if (this.v[i].id === vehicleId) {
        this.v.splice(i, 1);
      }
    }
    this.subject.next(this.v);
  }

  updateVehicle(vehicle: Vehicle): void {
    this.getDelay();
    const index = this.v.indexOf(this.getVehicleByID(vehicle.id), 0);
    if (index > -1) {
      this.v[index] = vehicle;
      this.subject.next(this.v);
    }
  }
  getVehicleByID(id): Vehicle {
    return this.v.find((veih) => veih.id === +id);
  }

  getDelay(): void {
    this.progressBarService.active();
    setTimeout(() => {
      this.progressBarService.desactive();
    }, 2000);
  }
}
