import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PetService } from './../services/app.service.pet';
import { AuthenticationService } from './../services/app.authentication';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.html',
    styleUrls: ['./app.login.css']
})
export class LoginComponent implements OnInit {
    title = 'app';
    cats = [];
    user: any = {
        email: 'Jie@gmail.com', password: '123456'
    };
    constructor(private petService: PetService, private authenticationService: AuthenticationService) { }
    ngOnInit() {
        // this.loadUser();
    }

    login(user) {
        this.authenticationService.
            logIn(user).
            subscribe(
            response => {
                console.log(response);
                if (response.data == null) {
                    alert(response.message);
                } else {
                    localStorage.setItem('token', response.token);
                    window.location.href = '';
                }
            }
            );
        // this.petService.getCats().subscribe(data => this.cats = data);
    }


}
