import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointService } from 'src/app/core/services/layout/breakpoint.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(
    //public dialog: MatDialog,
    public breakpointService: BreakpointService,
    private router: Router,
    //private vehicleService: VehicleService
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }

}
