import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private _auth: AuthService, 
    private _router: Router,
    private _userService: UserService) {
    _auth.user$.subscribe(user => {
      if(user) {
        if(!user) return;
        this._userService.save(user);

        const returnUrl = sessionStorage.getItem('returnUrl');
        if(!returnUrl) return;
        
        sessionStorage.removeItem('returnUrl');
        this._router.navigateByUrl(returnUrl);
      }
    });
  }
}
