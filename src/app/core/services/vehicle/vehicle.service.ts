import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Vehicle } from "src/app/shared/models/vehicle";
import { VEHICLES } from "src/app/mocks/mocks";
import { delay, map } from "rxjs/operators";
import { ProgressBarService } from "../progress-bar/progress-bar.service";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { QueryGraph } from 'src/app/shared/types/Query';




@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private v = [...VEHICLES];
  private subject = new Subject<Vehicle[]>();
  vehicles: Observable<Vehicle[]>;

  constructor(
    private progressBarService: ProgressBarService,
    private apollo: Apollo
  ) {}

  getVehicles(): Observable<Vehicle[]> {
    this.progressBarService.active();
        this.subject.next(this.v);
        //this.getVeic();

    return this.apollo
    .watchQuery<QueryGraph>({
      query: gql `{ vehicles {
        _id
        type
        model
        year
        plate
        qrdata
       }
      }`

      })
      .valueChanges.
      pipe(
        map( (resut) => {
          if(!resut.loading) this.progressBarService.desactive();
          return resut.data.vehicles;
        }
      ));

      }
  /**
   * getVehicles method retrive all Vehicles

  getVehicles(): Observable<Vehicle[]> {
    this.progressBarService.active();
        this.subject.next(this.v);
      return this.subject.asObservable();
  }
  */
      /**
   * AddVehicle Method
   * @param vehicle
   */
  addVehicle(vehicle: Vehicle): void {
    this.getDelay();
    //vehicle.id = this.v.length + 1;
    this.v.push(vehicle);
  }
  /**
   * Remove Vehicle Method
   * @param vehicleId
   */
  removeVehicle(vehicleId: number): void {
    this.getDelay();
    const index = vehicleId - 1;
    this.v.splice(index, 1);
    for (var i = 0; i < this.v.length; i++) {
      /* if (this.v[i].id === vehicleId) {
        this.v.splice(i, 1);
      } */
    }
    this.subject.next(this.v);
  }
  /**
   * Update Vehicle Method
   * @param vehicle Object
   */
  updateVehicle(vehicle: Vehicle): void {
    this.getDelay();
    const index = this.v.indexOf(this.getVehicleByID(vehicle.id), 0);
    if (index > -1) {
      this.v[index] = vehicle;
      this.subject.next(this.v);
    }
  }

  /**
   * getVehicleByID method
   * @param id Id of Vehicle
   * @returns Object of Vehicle
   */
  getVehicleByID(id): Vehicle {
    return null;
    //return this.v.find((veih) => veih.id === +id);
  }
  /**
   * getdelay
   */
  getDelay(): void {
    this.progressBarService.active();
    setTimeout(() => {
      this.progressBarService.desactive();
    }, 2000);
  }
}
