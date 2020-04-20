import { Vehicle } from '../models/vehicle';

export type QueryGraph = {
  vehicles: Vehicle[];
}

export type RemoveQuery = {
  removeVehicle: Vehicle;
}
