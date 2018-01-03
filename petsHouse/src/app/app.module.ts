import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';

import { PetService } from './services/app.service.pet';
import { AuthenticationService } from './services/app.authentication';


import { AppComponent } from './app.component';
import { UserComponent } from './users/app.user';
import { PetsComponent } from './pets/app.pets';
import { LoginComponent } from './login/app.login';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PetsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [AuthenticationService, PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
