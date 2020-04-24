import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Vehicle } from "src/app/shared/models/Vehicle";
import { AddQuery, QueryGraph, RemoveQuery, UpdateQuery } from "src/app/shared/types/Query";
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
  mutation addVehicle(
    $type: String!
    $model: String!
    $year: Int!
    $plate: String!
  ) {
    addVehicle(type: $type, model: $model, year: $year, plate: $plate) {
      _id
      type
      model
      year
      plate
      qrdata
    }
  }
`;
const updateVehicle = gql`
  mutation updateVehicle(
    $id: String!
    $type: String!
    $model: String!
    $year: Int!
    $plate: String!
  ) {
    updateVehicle(id: $id, type: $type, model: $model, year: $year, plate: $plate) {
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
  removeVehicle(vehicleId: String): Observable<Vehicle> {
    this.progressBarService.active();
    return this.apollo
      .mutate<RemoveQuery>({
        mutation: removeVehicle,
        variables: {
          id: vehicleId,
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
    this.progressBarService.active();
    return this.apollo
      .mutate<AddQuery>({
        mutation: addVehicle,
        variables: {
          type: vehicle.type,
          model: vehicle.model,
          year: new Number(vehicle.year),
          plate: vehicle.plate,
        },
      })
      .pipe(
        map((result) => {
          const message = `Vehicle: Type: ${result.data.addVehicle.type} has been add`;
          this.progressBarService.desactive();
          this.handlerService.addsuccess(message);
          return result.data.addVehicle;
        })
      );
  }

  /**
   * Update Vehicle Method
   * @param vehicle Object
   */
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    this.progressBarService.active();
    return this.apollo.mutate<UpdateQuery>({
      mutation: updateVehicle,
      variables: {
        id: vehicle._id,
        type: vehicle.type,
        model: vehicle.model,
        year: new Number(vehicle.year),
        plate: vehicle.plate,
      },
    }).pipe(
      map((result) => {
        const message = `Vehicle: Type: ${result.data.updateVehicle.type} has been Updated`;
        this.progressBarService.desactive();
        this.handlerService.addsuccess(message);
        return result.data.updateVehicle;
      })
    );
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
