import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const sharedModules = [
  HttpClientModule
];

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    ...sharedModules
  ]
})
export class SharedModule { }
