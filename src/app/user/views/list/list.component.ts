import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Model } from 'src/app/core/classes/model';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../models/user-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private subscribers: Subscription[] = [];

  public users: UserModel[] = [];

  public subscribe$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private service: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribers.push(
      this.service.all()
      .pipe(
        map((response: HttpResponse<any>) => {
          return response.body.map((user: any) => new UserModel().deserialize(user))
        })
      ).subscribe((users: UserModel[]) => {this.users = users})
    );

    // Second way
    this.service.getAll()
        .pipe(
          takeUntil(this.subscribe$),
          map((users: any[]) => users
          .filter((user: any) => [...user.nickname][0] === 'j')
          .map((user: any) => new UserModel().deserialize(user)))
        )
        .subscribe((users: UserModel[]) => {
          console.log(`Got ${users.length} element, element 0 ${users[0] instanceof Model}`);
        })
  }

  public goTo(user: UserModel): void {}

  ngOnDestroy(): void {
    this.subscribers.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscribe$.next(false);
  }
}
