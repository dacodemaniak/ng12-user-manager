import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  add(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(
      `${environment.userApi}`,
      user
    );
  }

  all(): Observable<any> {
    return this.httpClient.get<any[]>(
      `${environment.userApi}`,
      {
        observe: 'response'
      }
    );
  }

  public byId(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.userApi}/${id}`,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          return new UserModel().deserialize(response.body);
        }
        return response;
      })
    );
  }

  public getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.userApi}`,
    );
  }

  public byNickname(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.httpClient.get<any>(
        `http://localhost:4200/api/v1/byname/${encodeURI(control.value)}`,
        {
          observe: 'response'
        }
      )
      .pipe(
        take(1),
        tap((response: HttpResponse<any>) => {
          console.log(`Response was : ${response.status}`)
        }),
        map((response: HttpResponse<any>) => {
          return response.status === 200 ? {userExists: true} : null
        })
      );
    }
  }

}

export class MyValidators extends Validators {
  constructor() {
    super();
  }

  public static mustMatch(initialControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(`${control.value} ${initialControl.value}`);
      if (control.errors && !control.errors!.mustMatch) {
        return null;
      }
      if (control.value !== initialControl.value) {
        return {error: true}
      }
      return null;
    }
  }
}
