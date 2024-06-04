import { Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ConnexionComponent } from './connexion/connexion.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-user', component: EditUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
