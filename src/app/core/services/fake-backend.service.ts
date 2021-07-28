import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, map, materialize, mergeMap } from 'rxjs/operators';
import { notFound, ok } from '../helpers/http-helper';
import { UserModel } from 'src/app/user/models/user-model';

const users: any[] = localStorage.getItem('users') ?
  JSON.parse(localStorage.getItem('users')!) :
  [];

const routerMatchers: Map<string, {path: RegExp, method: string, action: any}> = new Map()
  .set(
    'all_users',
    {
      path: /\api\/v1\/user$/,
      method: 'GET',
      action: (): Observable<any> => {
        if (users.length) {
          return ok(users);
        }
        return notFound('No users found');
      }
    }
  )
  .set(
    'add_user',
    {
      path: /\api\/v1\/user/,
      method: 'POST',
      action: (body: UserModel): Observable<any> => {
        let nextId = 1;
        if (users.length) {
          nextId = users
            .sort((u1: UserModel, u2: UserModel) => u2.id - u1.id)[0].id + 1;
        }
        body.id = nextId;
        users.push(body);
        localStorage.setItem('users', JSON.stringify(users));
        return ok(body);
      }
    }
  )
  .set(
    'user_byid',
    {
      path: /\/api\/v1\/user\/\d+$/,
      method: 'GET',
      action: (body: any, ...args: any[]): Observable<any> => {
        const urlParts: string[] = args[0].split('/');
        console.log(`URL : ${JSON.stringify(urlParts)}`);
        const rawId: any = urlParts.pop();

        let id: number = 0;
        if (!isNaN(rawId)) {
          id = +rawId;
        } else {
          return of(
            new HttpResponse<any>({
              status: 401,
              body: {message: `Unauthorized`}
            })
          )
        }
        console.log(`Try to get user with id : ${id}`);
        const rawUser: any = users.find((user: any) => user.id === id);
        if (rawUser !== undefined) {
          return ok(rawUser);
        } else {
          return notFound({message: `User was not found with ${id}`})
        }

      }
    }
  )
  .set(
    'user_bynickname',
    {
      path: /\/api\/v1\/byname\/\w+$/,
      method: 'GET',
      action: (body: any, ...args: any[]): Observable<any> => {
        const urlParts: string[] = args[0].split('/');
        console.log(`URL : ${JSON.stringify(urlParts)}`);
        const rawNick: any = urlParts.pop();
        const nickname: string = rawNick === undefined ? '' : rawNick;
        console.log(`Try to get user with nickname : ${nickname}`);
        const rawUser: any = users.find((user: any) => user.nickname === nickname);
        if (rawUser !== undefined) {
          return ok(rawUser);
        } else {
          return notFound({message: `User was not found with ${nickname}`})
        }

      }
    }
  );

@Injectable(
  {
    providedIn: 'root'
  }
)
class FakeBackendService implements HttpInterceptor {

  constructor() {
    console.log(`I'm the fakebackend provider`);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    console.log(`URI ${method} ${url} was intercepted with ${JSON.stringify(body)}`);

    const handleRoute = (): Observable<HttpEvent<any>> => {
      const routes: {path: RegExp, method: string, action: any}[] = [...routerMatchers.values()];
      for (const route of routes) {
        if (route.path.test(url) && route.method === method) {
          return route.action(body, url);
        }
      }
      return next.handle(request);
    }

    return of(null)
      .pipe(
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      )
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
}
