import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy } from "@angular/core";
import { Subscription, timer } from "rxjs";
import { ErroHandlerService } from 'src/app/core/services/erro-handler.service';
import { ResponseError } from '../../models/ResponseError';

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
export class ErrorHandlerComponent implements OnDestroy {
  closeTime = timer(5000);
  show: boolean = false;
  subscription: Subscription;
  errorMessages: ResponseError;
  /**
   * Constructor Method
   * @param erroService
   */
  constructor(private erroService: ErroHandlerService) {
    this.subscription = this.erroService.getMessages().subscribe((data) => {
      if (data) {
        this.errorMessages = data;
      }
      this.show = true;
      this.setTimer();
    });
  }
  /**
   * Set Timer Method
   */
  setTimer() {
    this.closeTime.subscribe(() => {
      this.show = false;
    });
  }
  /**
   * OnDestroy Method
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
