import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fakeBackendProvider } from './services/fake-backend.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    fakeBackendProvider
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`Core Module must be import once in AppModule`);
    }
  }
}
