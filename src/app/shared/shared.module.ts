import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredDirective } from './directives/required.directive';

const sharedModules = [
  HttpClientModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [
    RequiredDirective
  ],
  imports: [],
  exports: [
    ...sharedModules,
    RequiredDirective
  ]
})
export class SharedModule { }
