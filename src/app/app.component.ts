import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from './_services/authentication.service';
import {User} from './_models/user';
import {NotificationService} from "./_services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Broker Terminal';
  // @ts-ignore
  user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    protected _notificationSvc: NotificationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
    if (!this.authenticationService.userValue) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authenticationService.logout();
  }
}
