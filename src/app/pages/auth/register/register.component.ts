import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router: Router) { }

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

    Swal.fire({
      title: 'Registrando usuario...',
      timerProgressBar: true,
      didOpen: async () => {
        try {
          Swal.showLoading();
          const result = await this.authService.signUp(this.registerForm.value);

          Swal.fire({
            position: 'center',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/'])
          });

        } catch (error) {
          Swal.fire({
            text: 'Ha ocurrido un error al registrar el usuario',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
    });
  }
}
