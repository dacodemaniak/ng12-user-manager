import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RequiredDirective } from './directives/required.directive';
import { UiModule } from './ui/ui.module';
import { SortDirective } from './directives/sort.directive';

const sharedModules = [
  HttpClientModule,
  ReactiveFormsModule,
  UiModule
];

@NgModule({
  declarations: [
    RequiredDirective,
    SortDirective
  ],
  imports: [],
  exports: [
    ...sharedModules,
    RequiredDirective,
    SortDirective
  ]
})
export class SharedModule { }
