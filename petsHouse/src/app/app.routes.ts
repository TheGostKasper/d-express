import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsComponent } from './pets/app.pets';
import { UserComponent } from './users/app.user';
import { LoginComponent } from './login/app.login';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: PetsComponent },
    { path: 'users', component: UserComponent },
    { path: 'login', component: LoginComponent },
    // implement notfound page later
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
