import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './views/list/list.component';
import { ManageComponent } from './views/manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    UserRoutingModule,
  ]
})
export class UserModule { }
