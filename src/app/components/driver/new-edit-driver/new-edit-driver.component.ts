import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { BreakpointService } from "src/app/core/services/layout/breakpoint.service";
import { VehicleService } from "src/app/core/services/vehicle/vehicle.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SubSink } from "subsink";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Subject, Observable } from "rxjs";
import { ErroHandlerService } from "src/app/core/services/erro-handler.service";
import { DriverService } from "src/app/core/services/driver/driver.service";
import { Driver } from "src/app/shared/models/Driver";

@Component({
  selector: "app-new-edit-driver",
  templateUrl: "./new-edit-driver.component.html",
  styleUrls: ["./new-edit-driver.component.css"],
})
export class NewEditDriverComponent implements OnInit, OnDestroy {
  driverForm: FormGroup;
  isMobile: boolean = false;
  isEditMode: boolean = false;
  isTakePhoto: boolean = false;
  //camera config
  public showWebcam = false;
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  showResult: boolean = false;

  private subs = new SubSink();

  constructor(
    private fb: FormBuilder,
    public breakpointService: BreakpointService,
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router,
    private erroHandlerService: ErroHandlerService
  ) {}

  get _id() {
    return this.driverForm.get("_id");
  }
  get name() {
    return this.driverForm.get("name");
  }
  get birthdate() {
    return this.driverForm.get("birthdate");
  }
  get image() {
    return this.driverForm.get("image");
  }
  get email() {
    return this.driverForm.get("email");
  }

  createForm(): void {
    this.driverForm = this.fb.group({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      birthdate: new FormControl("", [Validators.required]),
      image: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }
  /**
   * OnDestroy method.
   */
  ngOnDestroy(): void {
    this.trigger.unsubscribe;
    this.subs.unsubscribe;
  }
  /**
   * OnIniti Method
   */
  ngOnInit(): void {
    this.createForm();
    WebcamUtil.getAvailableVideoInputs();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.getDriverByID(id);
    }
  }
  /**
   * setValues Method
   * @param driver
   */
  setValues(driver: Driver): void {

    this.driverForm.patchValue({
      _id: driver._id,
      name: driver.name,
      birthdate: driver.birthdate,
      image: driver.image,
      email: driver.email,
    });

  }
  /**
   * getDriverID method
   * @param id
   */
  getDriverByID(id: String) {
    this.subs.sink = this.driverService.getDriverByID(id).subscribe((res)=> {
      this.setValues(res);
      if(res.image){
        this.showResult = true;
      }
    });
  }

  /**
   * SubmitForm Method
   */
  submitForm(): void {
    const driver: Driver = this.driverForm.value;
    if (!this.isEditMode) {
      this.addDriver(driver);
    }else{
      this.updateDriver(driver);
    }
  }

  updateDriver(driver: Driver){
    this.subs.sink = this.driverService.updateDriver(driver).subscribe((result) =>{
      if (result) {
        this.router.navigate(["/drivers"]);
      }
    });
  }

  /**
   * addDriver Method
   * @param driver
   */
  addDriver(driver: Driver): void {
    this.subs.sink = this.driverService
      .addDriver(driver)
      .subscribe((result) => {
        if (result) this.router.navigate(["/drivers"]);
      });
  }

  /**
   * trigger method for camera SnapShot
   */
  public triggerSnapshot(): void {
    this.showResult = true;
    this.trigger.next();
  }
  /**
   * ToggleWebCam method
   */
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.showResult = !this.showResult;
  }
  /**
   * handlerInitError method
   * @param error
   */
  public handleInitError(error: WebcamInitError): void {
    this.erroHandlerService.addError(error);
    //this.errors.push(error);
  }

  /**
   * Handler Image Method
   * @param webcamImage
   */
  public handleImage(webcamImage: WebcamImage): void {
    console.info("received webcam image", webcamImage);
    this.webcamImage = webcamImage;
    if (this.webcamImage) {
      this.image.setValue(this.webcamImage.imageAsDataUrl);
      this.showResult = true;
    }
  }

  /**
   * get TriggerObservable
   */
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  /**
   * Delete Picture Method
   */
  deletePicture() {
    this.showResult = true;
    this.webcamImage = null;
    this.image.setValue("");
  }
}
