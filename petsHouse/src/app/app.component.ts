import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PetService } from './services/app.service.pet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  cats = [];
  constructor(private petService: PetService) { }
  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.petService.getCats().subscribe(data => this.cats = data);
  }


}
