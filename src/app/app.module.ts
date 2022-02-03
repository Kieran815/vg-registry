// ROOT APP IMPORTS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// SERVICES
import { ListService } from './_services/list.service';

// ROUTERS
import { AppRoutingModule } from './app-routing.module';

// SEARCH API IMPORTS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// NGX Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';

// COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SearchComponent } from './search/search.component';
import { GameListComponent } from './game-list/game-list.component';
import { ListCreationComponent } from './game-list/list-creation/list-creation.component';

// Boostrap Imports


// JWT IMPORTS
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// Router Guards

import  { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    // SEARCH API
    SearchComponent,
    GameListComponent,
    ListCreationComponent,
    // JWT IMPORTS
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // SEARCH API, LOGIN
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, // search
    ModalModule.forRoot(),
  ],
  providers: [ListService, authInterceptorProviders], // Add Services to Provider
  bootstrap: [AppComponent]
})
export class AppModule { }
