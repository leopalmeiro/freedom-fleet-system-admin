
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit{

  vehicleForm: FormGroup;




 ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleName: ['', Validators.required],
      vehicleModel: ['', Validators.required],
      vehiclePlaca: ['', Validators.required],
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
get vehiclePlaca(){
  return this.vehicleForm.get('vehiclePlaca');
}
get vehicleYear(){
  return this.vehicleForm.get('vehicleYear');
}
get vehicleColor(){
  return this.vehicleForm.get('vehicleColor');
}


  constructor(private fb: FormBuilder) { }

onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.vehicleForm.value);
  }
}


