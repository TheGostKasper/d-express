import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token: boolean;

  constructor() {
    this.token = (localStorage.getItem('token')) ? true : false;
  }
  logout() {
    localStorage.removeItem('token');
    location.href = '/login';
  }
  ngOnInit() {
  }
}
