import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.subscribers.push(
      this.httpClient.get<any[]>(
        `${environment.userApi}`,
        {
          observe: 'response'
        }
      )
      .subscribe((response: HttpResponse<any>) => {
        console.log(response.status);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribers.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
