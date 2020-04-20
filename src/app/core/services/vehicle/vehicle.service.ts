import { Injectable, Query } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Vehicle } from "src/app/shared/models/vehicle";
import { VEHICLES } from "src/app/mocks/mocks";
import { delay, map } from "rxjs/operators";
import { ProgressBarService } from "../progress-bar/progress-bar.service";
import { Apollo,} from "apollo-angular";
import gql from "graphql-tag";
import { QueryGraph, RemoveQuery } from "src/app/shared/types/Query";
import { ErroHandlerService } from "../erro-handler.service";
import {
  ErroHandlerMessage,
  SuccessMessage,
} from "src/app/shared/models/erro-handler-message";

const removeVehicle = gql`
  mutation removeVehicle($id: String!) {
    removeVehicle(id: $id) {
      _id
      type
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
        query:findAll
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
  removeVehicle(vehicleId: number): Observable<any> {
    this.progressBarService.active();
    return this.apollo
      .mutate<RemoveQuery>({
        mutation: removeVehicle,
        variables: {
          id: vehicleId,
        },
      })
      .pipe(
        map(
          (result) => {
            this.progressBarService.desactive();
            this.successMessage = {
              message: `Vehicle type: ${result.data.removeVehicle.type} has been removed`,
            };
            this.handlerService.addsuccess(this.successMessage);
            return result.data.removeVehicle;
          },
          (error) => {
            this.progressBarService.desactive();
            this.erroMessages = {
              codeError: null,
              error: `Erro to remove vehicle: ${error}`,
            };
            this.handlerService.addError(this.erroMessages);
          }
        )
      );
  }

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
   * Update Vehicle Method
   * @param vehicle Object
   */
  updateVehicle(vehicle: Vehicle): void {
    this.getDelay();
    const index = this.v.indexOf(this.getVehicleByID(vehicle._id), 0);
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
