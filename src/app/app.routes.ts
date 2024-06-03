import { Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-user', component: EditUserComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
