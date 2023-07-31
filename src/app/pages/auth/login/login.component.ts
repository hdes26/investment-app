import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    save_session: new FormControl(false),
  });
  showPassword: boolean = false;


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  async forgotPassword() {
    //await this.authService.forgotPassword()
  }
  async onSubmit() {
    const { email, password, save_session } = this.loginForm.value;
    const login = await this.authService.signIn(email, password, save_session);

    if (!login.status) {
      Swal.fire({
        text: login.msg,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigate(['/'])
    });
  }

}
