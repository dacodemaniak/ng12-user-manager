import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';
import { controls } from 'src/app/shared/decorators/model-decorator';
import { MustMatchValidator } from 'src/app/shared/validators/must-match-validator';
import { UserModel } from '../../models/user-model';
import { UserService, MyValidators } from '../../services/user.service';

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
        tap((data: any) => console.log(`${JSON.stringify(data)}`)),
        take(1)
      )
      .subscribe((data: any) => {
        if (data.user) {
          user = data.user;
        } else {
          user = new UserModel();
        }
          this.form = this.formBuilder.group({
            confirmEmail: [
              user.email,
              MyValidators.required
            ],
            confirmPassword: [
              user.password,
              [
                MyValidators.required,
                MyValidators.minLength(8),
              ]
            ]
          }
          );
          controls.forEach((control: FormControl, controlName: string) => {
            control.setValue(user[controlName]);
            this.form.addControl(controlName, control);
          });

          this.form.controls.confirmEmail.setValidators([
            MyValidators.mustMatch(this.form.controls.email)
          ]);
          this.form.controls.nickname.setAsyncValidators(
            this.service.byNickname()
          )
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
