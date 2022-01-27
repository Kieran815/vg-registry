import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// ROUTERS
import { AppRoutingModule } from './app-routing.module';

// SEARCH API IMPORTS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// MATERIAL-UI DEPENDENCIES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { GameListComponent } from './game-list/game-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    FourOhFourComponent,
    // SEARCH API
    SearchComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // SEARCH API, LOGIN
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule, // search
    // MATERIAL API
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,


    RouterModule.forRoot([
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'my-list',
        component: GameListComponent
      },
      {
        path: '**',
        component: FourOhFourComponent
      },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
