import { BreakpointService } from "./../../../core/services/layout/breakpoint.service";
import { SubSink } from "subsink";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-new-vehicle",
  templateUrl: "./new-vehicle.component.html",
  styleUrls: ["./new-vehicle.component.css"],
})
export class NewVehicleComponent implements OnInit, OnDestroy {
  vehicleForm: FormGroup;
  qrdata: string = null;
  isMobile: boolean = false;
  private subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointService
  ) {
    this.qrdata = "Initial QR code data string";
  }

  get vehicleName() {
    return this.vehicleForm.get("vehicleName");
  }
  get vehicleModel() {
    return this.vehicleForm.get("vehicleModel");
  }
  get vehiclePlate() {
    return this.vehicleForm.get("vehiclePlate");
  }
  get vehicleYear() {
    return this.vehicleForm.get("vehicleYear");
  }
  get vehicleColor() {
    return this.vehicleForm.get("vehicleColor");
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
    // TODO: Use EventEmitter with form value
    console.warn(this.vehicleForm.value);
  }
  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      vehicleName: ["", Validators.required],
      vehicleModel: ["", Validators.required],
      vehiclePlate: ["", Validators.required],
      vehicleYear: ["", Validators.required],
      vehicleColor: ["", Validators.required],
    });
    this.getScreenSize();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
