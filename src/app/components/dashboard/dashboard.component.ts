import { Component, OnInit } from '@angular/core';
import { ConfirmationMessage } from './../../shared/models/confirmation-message';
import { TestservService } from './../../core/services/testserv.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //msg : ConfirmationMessage;

  //constructor(private service : TestservService) { }
  constructor() { }
  ngOnInit(): void {
    //this.msg = this.service.getUsers();

  }

}
