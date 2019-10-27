import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';

import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{

  constructor(private auth: AuthService) { }

  canActivate() {
    // return true;
    return this.auth.AppUser$.pipe(map(appUser => appUser.isAdmin));
  }
}
