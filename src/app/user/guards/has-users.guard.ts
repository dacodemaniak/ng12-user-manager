import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HasUsersGuard implements CanActivate {
  public constructor(
    private httpClient: HttpClient,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.httpClient.get(
        `${environment.userApi}`,
        {
          observe: 'response'
        }
      )
      .pipe(
        take(1)
      ).subscribe((response: HttpResponse<any>) => {
        if (response.status !== 200) {
          this.router.navigate(['/', 'user', 'add']);
          resolve(false);
        }
        resolve(true);
      })
    });

  }

}
