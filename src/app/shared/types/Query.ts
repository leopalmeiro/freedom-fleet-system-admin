import { Vehicle } from '../models/vehicle';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export type QueryGraph = {
  vehicles: Vehicle[];
  vehicle: Vehicle;
}

export type RemoveQuery = {
  removeVehicle: Vehicle;
}

export type AddQuery = {
  addVehicle: Vehicle;
}

export type UpdateQuery = {
  updateVehicle: Vehicle;
}
