// Services
import { PetService } from './services/app.service.pet';
import { AuthenticationService } from './services/app.authentication';
import { InterestsService } from './interests/app.interests.service';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './users/app.user';
import { PetsComponent } from './pets/app.pets';
import { LoginComponent } from './login/app.login';
import { InterestsComponent } from './interests/app.interests';


export class Container {
    declarations= [
        AppComponent,
        UserComponent,
        PetsComponent,
        LoginComponent,
        InterestsComponent
    ];
    providers= [AuthenticationService, PetService, InterestsService];
}
