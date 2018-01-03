import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PetService } from './../services/app.service.pet';
import { AuthenticationService } from './../services/app.authentication';

@Component({
    selector: 'app-pets',
    templateUrl: './app.pets.html',
    styleUrls: ['./app.pets.css']
})
export class PetsComponent implements OnInit {
    title = 'app';
    cats = [];
    constructor(private petService: PetService, private authentication: AuthenticationService) {
        authentication.checkToken();
    }
    ngOnInit() {
    }
}
