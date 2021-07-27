import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public getAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${environment.userApi}`,
    );
  }
}
