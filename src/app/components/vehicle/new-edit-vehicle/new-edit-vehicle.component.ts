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
import { Vehicle } from "src/app/shared/models/vehicle";
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
  ) {}

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
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      model: new FormControl("", [Validators.required]),
      plate: new FormControl("", [Validators.required]),
      year: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{4}"),
      ]),
      qrdata: new FormControl(""),
    });

    const id = +this.route.snapshot.paramMap.get("id");
    if (id > 0) {
      this.isEditMode = true;
      this.showRQCode = true;
      this.setValues(this.vehicleService.getVehicleByID(id));
    }
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setValues(vehicle: Vehicle): void {
    this.vehicleForm.patchValue({
      id: vehicle._id,
      name: vehicle.type,
      model: vehicle.model,
      plate: vehicle.plate,
      year: vehicle.year,
      qrdata: vehicle.qrdata,
    });
  }
}
