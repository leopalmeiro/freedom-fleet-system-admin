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
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

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
  showResult:boolean = false;

  private subs = new SubSink();


  constructor(
    private fb: FormBuilder,
    public breakpointService: BreakpointService,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  get id() {
    return this.driverForm.get("id");
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
      image: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
    });
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.createForm();
    WebcamUtil.getAvailableVideoInputs();
  }
  submitForm():void{

  }
  public triggerSnapshot(): void {
    this.showResult = true;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    if(this.webcamImage){
      this.showResult = true;
    }
  }


  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  closeResult(){

  }
  deletePicture(){
    this.showResult = false;
    this.webcamImage = null;
  }
}
