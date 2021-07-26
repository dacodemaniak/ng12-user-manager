import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fakeBackendProvider } from './services/fake-backend.service';
import { ModuleLoadedOnce } from './helpers/module-loaded-once';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule extends ModuleLoadedOnce {
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

  public static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        fakeBackendProvider
      ]
    }
  }
}
