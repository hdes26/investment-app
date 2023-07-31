import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent {
  constructor(private authService: AuthService, private router: Router) { }
  recoverForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required])
  });

  async onSubmit() {
    const { email } = this.recoverForm.value;
    const recover = await this.authService.forgotPassword(email);

    if (!recover.status) {
      Swal.fire({
        text: recover.msg,
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
      this.router.navigate(['/auth/login'])
    });
  }
}
