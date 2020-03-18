
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit{

  vehicleForm: FormGroup;
  public qrdata: string = null;




 ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleName: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehiclePlate: ['', Validators.required],
      vehicleYear: ['', Validators.required],
      vehicleColor: ['', Validators.required],
    });
}


get vehicleName(){
  return this.vehicleForm.get('vehicleName');
}
get vehicleModel(){
  return this.vehicleForm.get('vehicleModel');
}
get vehiclePlate(){
  return this.vehicleForm.get('vehiclePlate');
}
get vehicleYear(){
  return this.vehicleForm.get('vehicleYear');
}
get vehicleColor(){
  return this.vehicleForm.get('vehicleColor');
}


  constructor(private fb: FormBuilder) {     this.qrdata = 'Initial QR code data string';
}

onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.vehicleForm.value);
  }
}


