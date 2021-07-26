import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  public form!: FormGroup;

  public showPassword = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public get formControl(): any {
    return this.form.controls;
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

}
