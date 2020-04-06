import { ErroHandlerService } from './../../../core/services/erro-handler.service';
import { Component, OnInit } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class ErrorHandlerComponent implements OnInit {
  hasError : boolean = false;

  constructor(private erroService: ErroHandlerService) { }

  ngOnInit(): void {
    const studentsObservable = this.erroService.getErrors();
        studentsObservable.subscribe((data: String) => {
            console.log(`errofff ${data}`);
            this.hasError = true;
        });
  }

}
