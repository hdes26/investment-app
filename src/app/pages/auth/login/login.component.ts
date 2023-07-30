import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    save_session: new FormControl(false),
  });
  showPassword: boolean = false;

  saveSession(){
    localStorage.setItem('key', 'Mykey')
  }
  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.loginForm.value?.save_session) {
      this.saveSession()
    }
  }
  
}
