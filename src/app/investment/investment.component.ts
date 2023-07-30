import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent {
  investmentForm: FormGroup = new FormGroup({
    project: new FormControl('', [Validators.required, this.validateDropdown]),
    amount: new FormControl('', [Validators.required, Validators.minLength(8),Validators.pattern('^[0-9]+$')]),
    units: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    terms_condition: new FormControl(false, [Validators.requiredTrue]),
  });
  projectOptions: string[] = ['Nido de agua ', 'Indie Universe'];
  buttonStyle = 'cursor: not-allowed;';

  onCheckboxChange() {
    const checkboxValue = this.investmentForm.get('terms_condition')?.value;
    if (checkboxValue) {
      this.investmentForm.get('terms_condition')?.setValue(false);
    } else {
      this.investmentForm.get('terms_condition')?.setValue(true);
    }
  }

  validateDropdown(control: AbstractControl) {
    if (!control.value) {
      return { required: true };
    }
    return null;
  }

  onSubmit() {
    console.log('hola');
    
  }
}
