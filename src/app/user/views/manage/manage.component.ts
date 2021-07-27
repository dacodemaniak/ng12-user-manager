import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';
import { UserModel } from '../../models/user-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  public form!: FormGroup;

  public showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private route: ActivatedRoute
  ) { }

  public get formControl(): any {
    return this.form.controls;
  }

  public get nickname(): AbstractControl {
    return this.form.controls.nickname;
  }

  ngOnInit(): void {

    // Get a UserModel
    let user: UserModel = new UserModel();

    this.route.data
      .pipe(
        take(1)
      )
      .subscribe((data: any) => {
        if (data.user) {
          user = data.user;
          this.form = this.formBuilder.group({
            nickname: [
              user.nickname,
              Validators.compose([
                Validators.required,
                Validators.minLength(8)
              ])
            ],
            email: [
              user.email,
              [
                Validators.required,
                Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
              ]
            ],
            confirmEmail: [
              user.email,
              Validators.required
            ],
            password: [
              user.password,
            [
              Validators.required,
              Validators.minLength(8)]
            ],
            confirmPassword: [
              user.password,
              [
                Validators.required,
                Validators.minLength(8)
              ]
            ]
          });
        }
      });


  }

  public add(): void {
    const user: UserModel = new UserModel().deserialize(this.form.value);
    this.service.add(user)
      .pipe(
        take(1),
        tap((data: UserModel) => {
          console.log(`Second tap : ${data.toString()}`);
          console.log(`L'id est bien : ${data.id}`);
        }),
        map((result: any) => new UserModel().deserialize(result))
      )
      .subscribe((user: UserModel) => {
        console.log('After deserialisation ', user.toString());
      });
  }
}
