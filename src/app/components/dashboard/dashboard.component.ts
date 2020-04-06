import { Component, OnInit } from '@angular/core';
import { ConfirmationMessage } from './../../shared/models/confirmation-message';
import { TestservService } from './../../core/services/testserv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service : TestservService) { }
  //constructor() { }
  ngOnInit(): void {

    this.service.getUsers().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
