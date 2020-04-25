import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointService } from 'src/app/core/services/layout/breakpoint.service';
import { SubSink } from 'subsink';
import { Driver } from 'src/app/shared/models/Driver';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DriverService } from 'src/app/core/services/driver/driver.service';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  //dysplaycolumn
  displayedColumns: string[] = [];
  displayedColumnsAllElements: string[] = [
    'image',
    'name',
    'birthdate',
    'email',
    'actions'
  ];
  displayedColumnsMobile: string[] = [
    'image',
    'name',
    'birthdate',
    'email'
  ];
  dataSource = new MatTableDataSource<Driver>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isMobile: boolean = false;

  constructor(
    public dialog: MatDialog,
    public breakpointService: BreakpointService,
    private router: Router,
    private driverService: DriverService
    ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  ngOnInit(): void {

    this.getDrivers();
    this.getSizeScreen();
  }

  /**
   * Get All Drivers Method
   */
  getDrivers():void{
    this.subs.sink = this.driverService.getDrivers().subscribe((data) => {
      if(data){
        this.dataSource = new MatTableDataSource(data);
      }
    });
  }

    /**
   * ApplyFilter Method responsable for filter elements
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /**
   * get size Screen method verify when the screen is XS(mobile size)
   */
  getSizeScreen(): void {
    this.subs.sink = this.breakpointService.isMobile$.subscribe((value) => {
      if (value) {
        this.displayedColumns = this.displayedColumnsMobile;
      } else {
        this.displayedColumns = this.displayedColumnsAllElements;
      }
    });
  }

   /**
   * Open Dialog for Delete items
   * @param item
   */
  openDialog(item): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { title: "Remove Driver", id: item._id, objName: 'Driver' , objValue: item.name },
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result !== "") {
        this.subs.sink = this.driverService
          .removeDriver(result)
          .subscribe((res) => {
            const index = this.dataSource.data.findIndex(
              (el) => el._id === res._id
            );
            if (index > -1) {
              this.dataSource.data.splice(index, 1);
              this.dataSource = new MatTableDataSource(this.dataSource.data);
            }
          });
      }
    });
  }

  /**
   * Open edit Method for vehicles Edit router
   * @param obj
   */
  openEdit(obj): void {
    this.router.navigate(["/vehicles/edit", obj._id]);
  }
}
