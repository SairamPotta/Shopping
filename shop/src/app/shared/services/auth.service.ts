import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private _afAuth: AngularFireAuth,
    private _route: ActivatedRoute,
    private auth: AuthService,
    private _user: UserService) {
    this.user$ = _afAuth.authState;
  }

  login() {
    const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl') || '/';
    sessionStorage.setItem('returnUrl', returnUrl);
    const provider = new firebase.auth.GoogleAuthProvider();
    this._afAuth.auth.signInWithPopup(provider);
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  get AppUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this._user.get(user.uid).valueChanges();
        return of(null)
      }));
  }
}
