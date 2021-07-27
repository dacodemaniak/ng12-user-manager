import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs/operators';
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
    private service: UserService
  ) { }

  public get formControl(): any {
    return this.form.controls;
  }

  public get nickname(): AbstractControl {
    return this.form.controls.nickname;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nickname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]
      ],
      confirmEmail: [
        '',
        Validators.required
      ],
      password: [
        '',
      [
        Validators.required,
        Validators.minLength(8)]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  public add(): void {
    const user: UserModel = new UserModel().deserialize(this.form.value);
    this.service.add(user)
      .pipe(
        take(1),
        map((result: any) => new UserModel().deserialize(result))
      )
      .subscribe((user: UserModel) => {
        console.log(JSON.stringify(user));
      });
  }
}
