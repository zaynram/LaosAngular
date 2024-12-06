// src/app/core/auth.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, ActivatedRouteSnapshot, 
  RouterStateSnapshot, Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { PersistenceService } from '../shared/services/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private persistence: PersistenceService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if there's a form in progress
    const formId = route.queryParams['formId'];
    if (formId) {
      return this.persistence.loadProgress(formId).then(progress => {
        if (!progress) {
          // Redirect to new form if no saved progress found
          this.router.navigate(['/'], {
            queryParams: {},
            replaceUrl: true
          });
          return false;
        }
        return true;
      });
    }
    return true;
  }
}