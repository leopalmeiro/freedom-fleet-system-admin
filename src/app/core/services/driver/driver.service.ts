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
import { MatDialog } from "@angular/material/dialog";
import { variable } from "@angular/compiler/src/output/output_ast";

const removeDriver = gql`
  mutation removeDriver($id: String!) {
    removeDriver(id: $id) {
      _id
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
      _id
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
    $name: String!
    $birthdate: Date!
    $image: String!
    $email: String!
  ) {
    updateDriver(
      id: $id,
      name: $name,
      birthdate: $birthdate,
      image: $image,
      email: $email
    ) {
      _id
      name
      birthdate
      image
      email
    }
  }
`;
const findAll = gql`
  {
    drivers {
      _id
      name
      birthdate
      image
      email
    }
  }
`;

const getDriverByID = gql`
  query driver($driverId: String) {
    driver(id: $driverId) {
      _id
      name
      birthdate
      image
      email
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
    private handlerService: ErroHandlerService,
    public dialog: MatDialog
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
  /**
   * Get all Drivers
   */
  getDrivers(): Observable<Driver[]> {
    this.progressBarService.active();
    return this.apollo
      .watchQuery<QueryGraph>({
        query: findAll,
      })
      .valueChanges.pipe(
        map((result) => {
          if (!result.loading) {
            this.progressBarService.desactive();
            return result.data.drivers;
          }
        })
      );
  }

  /**
   * getDriverById method
   * @param id
   */
  getDriverByID(id: String): Observable<Driver> {
    this.progressBarService.active();
    return this.apollo.watchQuery<QueryGraph>({
      query: getDriverByID,
      variables: {driverId : id}
    }).valueChanges.pipe(
      map((result) => {
        if(!result.loading){
          this.progressBarService.desactive();
          return result.data.driver;
        }

      })
    )
  }

  /**
   * Remove Driver Method
   * @param id driver
   */
  removeDriver(id: String): Observable<Driver> {
    this.progressBarService.active();
    return this.apollo
      .mutate<RemoveQuery>({
        mutation: removeDriver,
        variables: { id: id },
      })
      .pipe(
        map((result) => {
          if(result){
            const message = `Driver Name: ${result.data.removeDriver.name} has been removed`;
            this.progressBarService.desactive();
            this.handlerService.addsuccess(message);
            return result.data.removeDriver;
          }

        })
      );
  }

  /**
   * UpdateDriver Method
   * @param driver
   */
  updateDriver(driver: Driver): Observable<Driver>{
    this.progressBarService.active();
    return this.apollo.mutate<UpdateQuery>({
      mutation: updateDriver,
      variables: {
        id: driver._id,
        name: driver.name,
        birthdate: driver.birthdate,
        image: driver.image,
        email: driver.email
      }
    }).pipe(
      map((result)=>{
        if(result){
          const message = `Driver Name: ${result.data.updateDriver.name} has been Updated`;
          this.progressBarService.desactive();
          this.handlerService.addsuccess(message);
          return result.data.updateDriver;
        }
      })
    )
  };

}
