import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressBarService } from 'src/app/core/services/progress-bar/progress-bar.service';
import { SubSink } from 'subsink';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnDestroy {
  private subs = new SubSink();
  mode = '';
  /**
   * Constructor Method
   * @param progressBarService
   */
  constructor(private progressBarService: ProgressBarService) {
    this.subs.sink = this.progressBarService.active().subscribe( async mode =>{
      this.mode = await mode;
    });
    this.subs.sink = this.progressBarService.desactive().subscribe(async mode =>{
      this.mode = await mode;
    });
   }
  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

}
