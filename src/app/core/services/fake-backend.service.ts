import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, dematerialize, map, materialize, mergeMap } from 'rxjs/operators';

const users: any[] = localStorage.getItem('users') ?
  JSON.parse(localStorage.getItem('users')!) :
  [];

const routerMatchers: Map<string, {path: RegExp, method: string, action: any}> = new Map()
  .set(
    'all_users',
    {
      path: /\api\/v1\/user/,
      method: 'GET',
      action: (): Observable<any> => {
        return of(users);
      }
    }
  );

@Injectable()
class FakeBackendService implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;

    console.log(`URI ${method} ${url} was intercepted`);

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
