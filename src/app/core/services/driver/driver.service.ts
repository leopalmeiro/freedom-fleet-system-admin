import { Injectable } from "@angular/core";
import gql from "graphql-tag";
import { ProgressBarService } from "../progress-bar/progress-bar.service";
import { Apollo } from "apollo-angular";
import { ErroHandlerService } from "../erro-handler.service";
import { Driver } from "src/app/shared/models/Driver";
import {
  AddQuery,
  UpdateQuery,
  QueryGraph,
  RemoveQuery,
} from "src/app/shared/types/Query";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

/* id: String,
  name: String,
  birthdate: Date,
  image: String,
  pass: String,
  email: String,
  dt_create: {type: Date, default: Date.now()},
  dt_update: Date, */

const removeDriver = gql`
  mutation removeDriver($id: String!) {
    removeDriver(id: $id) {
      id
      name
    }
  }
`;
const addDriver = gql`
  mutation addDriver(
    $name: String!
    $birthdate: Date!
    $image: String!
    $email: String!
  ) {
    addDriver(
      name: $name
      birthdate: $birthdate
      image: $image
      email: $email
    ) {
      id
      name
      birthdate
      image
      email
    }
  }
`;

const updateDriver = gql`
  mutation updateDriver(
    $id: String!
    $type: String!
    $model: String!
    $year: Int!
    $plate: String!
  ) {
    updateDriver(
      id: $id
      type: $type
      model: $model
      year: $year
      plate: $plate
    ) {
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
    Drivers {
      _id
      type
      model
      year
      plate
      qrdata
    }
  }
`;

const getDriverByID = gql`
  query Driver($DriverId: String) {
    Driver(id: $DriverId) {
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
export class DriverService {
  constructor(
    private progressBarService: ProgressBarService,
    private apollo: Apollo,
    private handlerService: ErroHandlerService
  ) {}

  /**
   * AddDriver Method
   * @param driver
   * @returns Observable of Vehicle
   */
  addDriver(driver: Driver): Observable<Driver> {
    this.progressBarService.active();
    return this.apollo
      .mutate<AddQuery>({
        mutation: addDriver,
        variables: {
          name: driver.name,
          birthdate: driver.birthdate,
          image: driver.image,
          email: driver.email,
        },
      })
      .pipe(
        map((result) => {
          alert(result.data.addDriver.name);
          const message = `Driver: Name: ${result.data.addDriver.name} has been add`;
          this.progressBarService.desactive();
          this.handlerService.addsuccess(message);
          return result.data.addDriver;
        })
      );
  }
}
