import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { HttpCancelService } from './core/http-cancel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private httpCancelService: HttpCancelService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.httpCancelService.cancelPendingRequests()
      }
    })
  }
}
