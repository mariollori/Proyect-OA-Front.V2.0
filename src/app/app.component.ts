import { Component } from '@angular/core';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'Proyect';
  
  // Sets initial value to true to show loading spinner on first load
  loading = false

  constructor(private router: Router,private loadingBar: SlimLoadingBarService ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
 
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
       if (event instanceof NavigationStart) {
      this.loading = true
      this.loadingBar.start();
     
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      this.loadingBar.complete();
     
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false
      this.loadingBar.stop();  
    }
    if (event instanceof NavigationError) {
      this.loading = false
      this.loadingBar.stop();  
    }
  }
}
