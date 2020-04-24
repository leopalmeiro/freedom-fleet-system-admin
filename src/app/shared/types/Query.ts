import { Vehicle } from '../models/Vehicle';
import { Driver } from '../models/Driver';

export type QueryGraph = {
  vehicles: Vehicle[];
  vehicle: Vehicle;
  drivers: Driver[];
  driver: Driver;
}

export type RemoveQuery = {
  removeVehicle: Vehicle;
  removeDriver: Driver;

}

export type AddQuery = {
  addVehicle: Vehicle;
  addDriver: Driver;
}

export type UpdateQuery = {
  updateVehicle: Vehicle;
  updateDriver: Driver;
}
