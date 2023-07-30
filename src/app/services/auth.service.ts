import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private angularFireAuth: AngularFireAuth, public router: Router) { }


    async loginUser(email: string, password: string) {
        await this.angularFireAuth.signInWithEmailAndPassword(email, password)
        .then(() => {          
            this.angularFireAuth.authState.subscribe((user) => {
              if (user) {
                this.router.navigate(['/']);
              }
            });
          })
          .catch((error) => {
            return error.message;
          });
    }

    async createUser(data: User) {
        await this.angularFireAuth.createUserWithEmailAndPassword(data.email, data.password);
    }

    async isAuth() {

    }

}