import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    prefix: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    cellphone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    met: new FormControl('', [Validators.required, this.validateDropdown]),
    referral_code: new FormControl('', [Validators.pattern('^[0-9]+$')]),
    terms_condition: new FormControl(false, [Validators.requiredTrue, Validators.required]),
  });
  showPassword: boolean = false;
  metOptions: string[] = ['Linkedin', 'Torre', 'Glassdoor', 'Otros'];


  validateDropdown(control: AbstractControl) {
    if (!control.value) {
      return { required: true };
    }
    return null;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;

  }
  async onSubmit() {
    await this.authService.createUser(this.registerForm.value)
  }
}
