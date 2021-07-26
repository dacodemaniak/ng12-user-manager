import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasUsersGuard } from './guards/has-users.guard';
import { ListComponent } from './views/list/list.component';
import { ManageComponent } from './views/manage/manage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [
      HasUsersGuard
    ]
  },
  {
    path:'add',
    component: ManageComponent
  },
  {
    path:'update/:id',
    component: ManageComponent
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
