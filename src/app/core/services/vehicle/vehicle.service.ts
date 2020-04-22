import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { VEHICLES } from "src/app/mocks/mocks";
import { ErroHandlerMessage, SuccessMessage } from "src/app/shared/models/erro-handler-message";
import { Vehicle } from "src/app/shared/models/vehicle";
import { AddQuery, QueryGraph, RemoveQuery } from "src/app/shared/types/Query";
import { ErroHandlerService } from "../erro-handler.service";
import { ProgressBarService } from "../progress-bar/progress-bar.service";
const removeVehicle = gql`
  mutation removeVehicle($id: String!) {
    removeVehicle(id: $id) {
      _id
      type
    }
  }
`;
const addVehicle = gql`
  mutation addVehicle($type: String!,$model: String!,$year: Int!,$plate: String!) {
    addVehicle(type: $type, model: $model, year: $year, plate: $plate){
      _id
      type
      model
      year
      plate
      qrdata
    }
  }
`;
const findAll = gql`
  {
    vehicles {
      _id
      type
      model
      year
      plate
      qrdata
    }
  }
`;

const getVehicleByID = gql`
  query vehicle($vehicleId: String) {
    vehicle(id: $vehicleId) {
      _id
      type
      model
      year
      plate
      qrdata
    }
  }
`;



@Injectable({
  providedIn: "root",
})
export class VehicleService {
  private v = [...VEHICLES];
  private subject = new Subject<Vehicle[]>();
  private vehicles: Observable<Vehicle[]>;
  private erroMessages: ErroHandlerMessage;
  private successMessage: SuccessMessage;

  constructor(
    private progressBarService: ProgressBarService,
    private apollo: Apollo,
    private handlerService: ErroHandlerService
  ) {}

  getVehicles(): Observable<Vehicle[]> {
    this.progressBarService.active();
    return this.apollo
      .watchQuery<QueryGraph>({
        query: findAll,
      })
      .valueChanges.pipe(
        map((resut) => {
          if (!resut.loading) this.progressBarService.desactive();
          return resut.data.vehicles;
        })
      );
  }

  /**
   * Remove Vehicle Method
   * @param vehicleId
   */
  removeVehicle(vehicleId: number): Observable<Vehicle> {
    this.progressBarService.active();
    return this.apollo
      .mutate<RemoveQuery>({
        mutation: removeVehicle,
        variables: {
          id: "vehicleId",
        },
      })
      .pipe(
        map((result) => {
          const message = `Vehicle: Type: ${result.data.removeVehicle.type} has been removed`;
          this.progressBarService.desactive();
          this.handlerService.addsuccess(message);
          return result.data.removeVehicle;
        })
      );
  }

  /**
   * AddVehicle Method
   * @param vehicle
   * @returns Observable of Vehicle
   */
  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    console.log(vehicle);

    this.progressBarService.active();
    return this.apollo
      .mutate<AddQuery>({
        mutation: addVehicle,
        variables: {
          type: vehicle.type,
          model: vehicle.model,
          year: vehicle.year,
          plate: vehicle.plate,
        },
      })
      .pipe(
        map((result) => {
          console.log(result.errors);
          const message = `Vehicle: Type: ${result.data.addVehicle.type} has been add`;
          this.progressBarService.desactive();
          this.handlerService.addsuccess(message);
          return result.data.addVehicle;
        }),
      );
  }

  /**
   * Update Vehicle Method
   * @param vehicle Object
   */
  updateVehicle(vehicle: Vehicle): void {
    /* this.getDelay();
    const index = this.v.indexOf(this.getVehicleByID(vehicle._id), 0);
    if (index > -1) {
      this.v[index] = vehicle;
      this.subject.next(this.v);
    } */
  }

  /**
   * getVehicleByID method
   * @param id Id of Vehicle
   * @returns Object of Vehicle
   */
  getVehicleByID(id): Observable<Vehicle> {
    this.progressBarService.active();
    return this.apollo
      .watchQuery<QueryGraph>({
        query: getVehicleByID,
        variables: { vehicleId: id },
      })
      .valueChanges.pipe(
        map((resut) => {
          console.log(resut);
          if (!resut.loading) this.progressBarService.desactive();
          return resut.data.vehicle;
        })
      );
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
  /**
   * AddErrors method for add error when httt response = 200 but has error
   */
  addErrors(message: String): void {}
}
