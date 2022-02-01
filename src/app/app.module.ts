// ROOT APP IMPORTS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ROUTERS
import { AppRoutingModule } from './app-routing.module';

// SERVICES
import { ListService } from './_services/list.service';

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
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { GameListComponent } from './list-module/game-list/game-list.component';
import { ListCreationComponent } from './list-module/list-creation/list-creation.component';


// JWT IMPORTS
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import  { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomeComponent } from './home/home.component';

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
    ProfileComponent,
    HomeComponent,
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
  ],
  providers: [ListService, authInterceptorProviders], // Add Services to Provider
  bootstrap: [AppComponent]
})
export class AppModule { }
