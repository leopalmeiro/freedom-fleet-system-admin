import { ErroHandlerMessage } from "./../../models/erro-handler-message";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import {
  trigger,
  style,
  animate,
  state,
  transition,
} from "@angular/animations";
import { ErroHandlerService } from "./../../../core/services/erro-handler.service";
import { timer, Subscription } from "rxjs";

@Component({
  selector: "app-error-handler",
  templateUrl: "./error-handler.component.html",
  styleUrls: ["./error-handler.component.css"],
  animations: [
    trigger("faded", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("1s", style({ opacity: 0 }))]),
    ]),
  ],
})
export class ErrorHandlerComponent implements OnInit, OnDestroy {
  closeTime = timer(5000);
  hasError: boolean = false; // hasError
  show: boolean = false;
  error: ErroHandlerMessage;
  subscription: Subscription;

  constructor(private erroService: ErroHandlerService) {
    this.subscription = this.erroService.getErrors().subscribe((data) => {
      console.log(`data: ${data}`);
      if (data) {
        this.hasError = true;
        this.error = data;
      } else {
        this.hasError = false;
      }
      this.show = true;
      this.setTimer();
    });
  }

  ngOnInit(): void {}

  setTimer() {
    this.closeTime.subscribe(() => {
      this.show = false;
    });
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    console.log("Ondestroy");
    this.subscription.unsubscribe();
  }
}
