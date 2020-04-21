import { Vehicle } from '../models/vehicle';

export type QueryGraph = {
  vehicles: Vehicle[];
  vehicle: Vehicle;
}

export type RemoveQuery = {
  removeVehicle: Vehicle;
}
