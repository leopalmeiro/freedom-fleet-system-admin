import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BreakpointService } from "src/app/core/services/layout/breakpoint.service";
import { VehicleService } from "src/app/core/services/vehicle/vehicle.service";
import { Vehicle } from "src/app/shared/models/Vehicle";
import { SubSink } from "subsink";

@Component({
  selector: "app-new-vehicle",
  templateUrl: "./new-edit-vehicle.component.html",
  styleUrls: ["./new-edit-vehicle.component.css"],
})
export class NewEditVehicleComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  showRQCode: boolean = false;
  isMobile: boolean = false;
  isEditMode: boolean = false;
  private subs = new SubSink();

  //matcher=  new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    public breakpointService: BreakpointService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.vehicleForm = this.fb.group({
      _id: new FormControl(""),
      type: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      plate: new FormControl("", [Validators.required]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{4}"),
      ]),
      qrdata: new FormControl(""),
    });
  }

  get _id() {
    return this.vehicleForm.get("_id");
  }
  get type() {
    return this.vehicleForm.get("type");
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

  submitForm(): void {
    const vehicle: Vehicle = this.vehicleForm.value;
    if (this.isEditMode) {
      this.updateVehicle(vehicle);
    } else {
      this.addvehicle(vehicle);
    }
  }
  /**
   * Method for update vehicle
   * @param vehicle
   */
  updateVehicle(vehicle: Vehicle): void {
    this.subs.sink = this.vehicleService
      .updateVehicle(vehicle)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(["/vehicles"]);
        }
      });
  }
  /**
   * method for add a new vehicle
   * @param vehicle
   */
  addvehicle(vehicle: Vehicle): void {
    this.subs.sink = this.vehicleService
      .addVehicle(this.vehicleForm.value)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(["/vehicles"]);
        }
      });
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.showRQCode = true;
      //this.setValues(this.vehicleService.getVehicleByID(id));
      this.getVehiclebyID(id);
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getVehiclebyID(id): void {
    this.subs.sink = this.vehicleService
      .getVehicleByID(id)
      .subscribe((data) => {
        //populate vehicle
        this.setValues(data);
      });
  }

  /**
   * SetValues Method
   * @param vehicle
   */
  setValues(vehicle: Vehicle): void {
    this.vehicleForm.patchValue({
      _id: vehicle._id,
      type: vehicle.type,
      model: vehicle.model,
      plate: vehicle.plate,
      year: vehicle.year,
      qrdata: vehicle.qrdata,
    });
  }
}
