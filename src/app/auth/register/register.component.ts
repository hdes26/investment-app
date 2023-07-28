import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm:FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    last_name : new FormControl('', Validators.required),
    email : new FormControl('', Validators.required),
    prefix : new FormControl('', Validators.required),
    cellphone : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    met : new FormControl('', Validators.required),
    referral_code : new FormControl('', Validators.required),
  })

  onSubmit(){
    
  }
}
