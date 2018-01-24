import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { Container } from './container.modules';

import { AppComponent } from './app.component';

import 'rxjs/add/operator/do';
const ctr = new Container();

@NgModule({
  declarations: ctr.declarations,
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: ctr.providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
