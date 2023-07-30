import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) { }


  async signIn(email: string, password: string) {
    try {
      const result = await this.fireAuth.signInWithEmailAndPassword(email, password);
      const user = result.user;
      if (user) {
        const isEmailVerified = await this.isEmailVerified();
        if (!isEmailVerified) {
          return {
            status: false,
            msg: 'Email no ha sido verificado'
          };
        }
      }
      return {
        status: true,
        msg: 'OK'
      }
    } catch (error) {
      return {
        status: false,
        msg: 'Email o contraseña invalidos'
      };
    }
  }
  async signUp({email, password, ...user}: User) {
    try {
      await this.fireAuth.createUserWithEmailAndPassword(email, password);
      await this.fireStore.collection('users').add(user)
      await this.sendVerificationEmail();
      return {
        status: true,
        msg: 'OK'
      };

    } catch (error) {
      return {
        status: false,
        msg: 'Hubo un error al crear usuario'
      };
    }
  }
  async sendVerificationEmail() {
    try {
      const user = await this.fireAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
      }
    } catch (error) {
      console.log(error);
    }
  }
  async forgotPassword(email: string): Promise<void> {
    return await this.fireAuth.sendPasswordResetEmail(email);
  }
  async isAuth() {

  }
  async isEmailVerified() {
    try {
      const user = await this.fireAuth.currentUser;
      return user ? user.emailVerified : false;
    } catch (error) {
      return false;
    }
  }
  async signOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

}