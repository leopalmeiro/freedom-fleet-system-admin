import { BreakpointService } from "./../../../core/services/layout/breakpoint.service";
import { SubSink } from "subsink";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VehicleService } from "src/app/core/services/vehicle/vehicle.service";
import { Vehicle } from "src/app/shared/models/vehicle";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-new-vehicle",
  templateUrl: "./new-vehicle.component.html",
  styleUrls: ["./new-vehicle.component.css"],
})
export class NewVehicleComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  qrdata: string = null;
  isMobile: boolean = false;
  isEditMode: boolean = false;
  private subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute
  ) {
    this.qrdata = "Initial QR code data string";
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
    this.isEditMode ? this.vehicleService.updateVehicle(this.vehicleForm.value) :     this.vehicleService.addVehicle(this.vehicleForm.value);

  }

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      model: ["", Validators.required],
      plate: ["", Validators.required],
      year: ["", Validators.required],
    });
    const id = +this.route.snapshot.paramMap.get("id");
    if (id > 0) {
      this.isEditMode = true;

      this.setValues(this.vehicleService.getVehicleByID(id));

    }
    this.getScreenSize();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setValues(vehicle: Vehicle): void{
    this.vehicleForm.patchValue({
      id: vehicle.id,
      name: vehicle.name,
      model: vehicle.model,
      plate: vehicle.plate,
      year: vehicle.year
    });

  }
}
