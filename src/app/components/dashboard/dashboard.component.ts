import { Component, OnInit, OnDestroy } from "@angular/core";
import { ConfirmationMessage } from "./../../shared/models/confirmation-message";
import { TestservService } from "./../../core/services/testserv.service";
import { SubSink } from "subsink";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  constructor(private service: TestservService) {}
  ngOnInit(): void {
    this.subs.sink = this.service.getUsers().subscribe((data) => {
      console.log(data);
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
