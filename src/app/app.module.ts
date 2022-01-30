// ROOT APP IMPORTS
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
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

// COMPONENT IMPORTS
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { GameListComponent } from './list-module/game-list/game-list.component';
import { ListCreationComponent } from './list-module/list-creation/list-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LandingComponent,
    FourOhFourComponent,
    // SEARCH API
    SearchComponent,
    GameListComponent,
    ListCreationComponent,
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
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,

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
        path: 'my-lists',
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
