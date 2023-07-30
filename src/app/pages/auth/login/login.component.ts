import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService){}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    save_session: new FormControl(false),
  });
  showPassword: boolean = false;


  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
  async onSubmit() {
    const {email, password} = this.loginForm.value;
    await this.authService.loginUser(email, password);
  }
  
}
