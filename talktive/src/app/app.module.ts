import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { Container } from './container.modules';

import { AppComponent } from './app.component';

const ctr = new Container();

@NgModule({
  declarations: ctr.declarations,
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: ctr.providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
