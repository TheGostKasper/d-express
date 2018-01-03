import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PetService } from './services/app.service.pet';
import { AuthenticationService } from './services/app.authentication';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
}
