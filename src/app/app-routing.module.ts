import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Route Guards
import { AuthGuard } from './auth.guard';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { GameListComponent } from './game-list/game-list.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { ListCreationComponent } from './game-list/list-creation/list-creation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'my-lists', component: GameListComponent, canActivate: [AuthGuard] },
  { path: "my-lists/create-list/add/:id", component: ListCreationComponent, canActivate: [AuthGuard]},
  { path: "my-lists/create-list/edit/:id", component: ListCreationComponent, canActivate: [AuthGuard]},
  {path: '**', component: FourOhFourComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }