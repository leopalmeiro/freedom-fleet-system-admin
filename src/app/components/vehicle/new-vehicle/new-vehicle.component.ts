import { SubSink } from "subsink";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl,NgForm, MinLengthValidator} from "@angular/forms";
import { VehicleService } from "src/app/core/services/vehicle/vehicle.service";
import { Vehicle } from "src/app/shared/models/vehicle";
import { ActivatedRoute, Router } from "@angular/router";
import { BreakpointService } from 'src/app/core/services/layout/breakpoint.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: "app-new-vehicle",
  templateUrl: "./new-vehicle.component.html",
  styleUrls: ["./new-vehicle.component.css"],
})

export class NewVehicleComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  showRQCode: boolean= false;
  isMobile: boolean = false;
  isEditMode: boolean = false;
  private subs = new SubSink();

  //matcher=  new MyErrorStateMatcher();
  constructor(

    private fb: FormBuilder,
    private breakpointService: BreakpointService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,

  ) {
  }

  get id() {
    return this.vehicleForm.get("id");
  }
  get name() {
    return this.vehicleForm.get("name");
  }

  get model() {
    return this.vehicleForm.get("model");
  }
  get plate() {
    return this.vehicleForm.get("plate");
  }
  get year() {
    return this.vehicleForm.get("year");
  }
  get qrdata() {
    return this.vehicleForm.get("qrdata");
  }
  getScreenSize(): void {
    this.subs.sink = this.breakpointService.screenSizeObserver.subscribe(
      (data) => {
        const screenSize = data;
        screenSize.find((size) => {
          if (size === "xs" || size === "sm" || size == "md") {
            this.isMobile = true;
          } else {
            this.isMobile = false;
          }
        });
      }
    );
  }
  onSubmit(): void {
    const vehicle: Vehicle = this.vehicleForm.value;
    if (this.isEditMode) {
      this.vehicleService.updateVehicle(this.vehicleForm.value);
    } else {
      this.vehicleService.addVehicle(this.vehicleForm.value);
    }
    this.router.navigate(["/vehicles"]);
  }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('',[Validators.required]),
      model: new FormControl('',[Validators.required]),
      plate: new FormControl('',[Validators.required]),
      year: new FormControl('',[Validators.required,  Validators.pattern('[0-9]{4}')]),
      qrdata: new FormControl(''),
    });

    const id = +this.route.snapshot.paramMap.get("id");
    if (id > 0) {
      this.isEditMode = true;
      this.showRQCode = true;
      this.setValues(this.vehicleService.getVehicleByID(id));
    }
    this.getScreenSize();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setValues(vehicle: Vehicle): void {
    this.vehicleForm.patchValue({
      id: vehicle.id,
      name: vehicle.name,
      model: vehicle.model,
      plate: vehicle.plate,
      year: vehicle.year,
      qrdata: "96a3be3cf272e017046d1b2674a52bd3"
    });
  }
}
