import { HttpResponse } from "@angular/common/http"
import { Observable, of } from "rxjs"

export const ok = (body: any): Observable<HttpResponse<any>> => {
  return of(new HttpResponse({
    status: 200,
    body
  }))
};

export const notFound = (body: any): Observable<HttpResponse<any>> => {
  return of(new HttpResponse(
    {
      status: 404,
      body
    }
  ))
};
