import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SessionStorageService } from '../@core/services';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _storage: SessionStorageService, private _authService: AuthService) { }

  ngOnInit() {
    // if (!this._authService.getCurrentUser().jwt) {
    //         this._authService.populate();
    //       //  this.router.navigate(['/search-home']);
    //       }
    //      }
  }
}

