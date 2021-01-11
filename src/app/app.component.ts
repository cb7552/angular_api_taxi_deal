import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { scan } from 'rxjs/operators';

import { AuthService, SessionStorageService } from './@core/services';
import { TranslateService } from '@ngx-translate/core';
declare  var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentlyLoadingCount = this.router.events.pipe(scan((c: number, e: any) => this.countLoads(c, e), 0));
  // tslint:disable-next-line:max-line-length
  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute, private _storage: SessionStorageService, private _authService: AuthService) {
    const language = localStorage.getItem('language');
    this.translate.use(language);
  }
  private countLoads(counter: number, event: any): number {
    if (event instanceof RouteConfigLoadStart) {
      return counter + 1;
    }
    if (event instanceof RouteConfigLoadEnd) {
      return counter - 1;
    }
    return counter;
  }
  ngOnInit() {
    if (!this._authService.getCurrentUser().jwt) {
         this._authService.populate();
      setTimeout(() => {
        $('body').addClass('hideloader');
      }, 500);
      // this.router.navigate(['/search-home']);
    }
  }
}
