import { Component } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dell-emc-hchal';
  constructor(private appService: AppService) { }

  scrollToTopFn() {
    window.scrollTo(0, 0);
  }
}
