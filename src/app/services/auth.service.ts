import { Injectable } from "@angular/core";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() { }


    async loginUser(email: string, password: string) {

    }
    
    async createUser(data: User) {
        
    }
    
    async isAuth() {

    }

}