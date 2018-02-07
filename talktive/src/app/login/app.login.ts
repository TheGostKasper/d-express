import { Component, OnInit } from '@angular/core';
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
            (res: any) => {
                if (res.data == null) {
                    alert(res.message);
                } else {
                    localStorage.setItem('token', res.token);
                    window.location.href = '';
                }
                alert(res.message);
            });
    }
    // this.petService.getCats().subscribe(data => this.cats = data);
}
