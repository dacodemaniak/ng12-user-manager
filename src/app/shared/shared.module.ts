import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredDirective } from './directives/required.directive';
import { UiModule } from './ui/ui.module';

const sharedModules = [
  HttpClientModule,
  ReactiveFormsModule,
  UiModule
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
