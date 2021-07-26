import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const sharedModules = [
  BrowserModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports: [
    ...sharedModules
  ]
})
export class SharedModule { }
