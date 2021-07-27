import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, take, tap } from "rxjs/operators";
import { UserModel } from "../models/user-model";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
  public constructor(
    private service: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserModel> | Observable<void> {
    const id: any = route.paramMap.get('id');

    if (id !== null && !isNaN(id)) {
      // Use service to get back a UserModel
      return this.service.byId(id)
        .pipe(
          tap((data: any) => {
            console.log(`${JSON.stringify(data)}`)
          }),
          take(1),
          catchError((error: any) => {
            return this.errorHandler(error);
          })
        );
    } else {
      return this.errorHandler(401);
    }
  }

  private errorHandler(error: any): Observable<any> {
    if (error === 401) {
      this.router.navigate(['/', 'user', 'list']);
    }

    return of(null);
  }
}
