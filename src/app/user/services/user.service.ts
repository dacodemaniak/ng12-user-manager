import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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
}
