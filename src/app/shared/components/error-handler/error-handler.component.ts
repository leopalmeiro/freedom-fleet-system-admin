import { ErroHandlerService } from './../../../core/services/erro-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.css']
})
export class ErrorHandlerComponent implements OnInit {

  constructor(private erroService: ErroHandlerService) { }

  ngOnInit(): void {
    const studentsObservable = this.erroService.getErrors();
        studentsObservable.subscribe((data: String) => {
            console.log(`errofff ${data}`);
            
        });
  }

}
