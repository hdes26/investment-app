import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) { }


  async signIn(email: string, password: string, save_session: boolean) {
    console.log(save_session);

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
        const token = await user.getIdToken();
        if (!save_session) {
          const expirationTimeMs = 300000; // 5 minutos en milisegundos
          const expirationTime = new Date().getTime() + expirationTimeMs;
          const dataToStore = {
            token: token,
            expirationTime: expirationTime
          };
          localStorage.setItem("loginData", JSON.stringify(dataToStore));
        } else {
          localStorage.setItem("loginData", JSON.stringify(token));
        }
        return {
          status: true,
          msg: 'OK'
        }
      }
      throw new Error();
    } catch (error) {
      return {
        status: false,
        msg: 'Email o contraseña invalidos'
      };
    }
  }
  async signUp({ email, password, ...userData }: User) {
    try {
      const { user } = await this.fireAuth.createUserWithEmailAndPassword(email, password);
      if (user) {
        await this.fireStore.collection('users').add(userData)
        await this.sendVerificationEmail();
        const token = await user.getIdToken();
        localStorage.setItem("firebaseToken", token);
      }
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
  async forgotPassword(email: string) {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);
      return {
        status: true,
        msg: 'Hemos enviado el link de recuperacion a tu correo'
      }
    } catch (error) {
      return {
        status: false,
        msg: 'Error al enviar correo'
      }
    }
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
  isAuth(): string | null {
    const data = localStorage.getItem("loginData");
    if (data) {
      const dataObj = JSON.parse(data);
      if (!dataObj.expirationTime) {
        return dataObj.token;
      }
      const now = new Date().getTime();
      if (now <= dataObj.expirationTime) {
        return dataObj.token;
      } else {
        localStorage.removeItem("loginData");
      }
    }
    return null;
  }

}