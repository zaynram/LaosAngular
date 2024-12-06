// src/app/core/auth.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable, from } from 'rxjs';
import { PersistenceService } from '../shared/services/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly persistence: PersistenceService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const formId = route.queryParams['formId'];
    
    console.log('state', _state);

    if (!formId) {
      return true;
    }

    return from(this.persistence.loadProgress(formId).then(progress => {
      if (!progress) {
        return this.router.createUrlTree(['/'], {
          queryParams: {}
        });
      }
      return true;
    }));
  }
}