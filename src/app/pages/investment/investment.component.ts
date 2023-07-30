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
    amount: new FormControl('', [Validators.required, Validators.minLength(10)]),
    units: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]+$')]),
    terms_condition: new FormControl(false, [Validators.requiredTrue]),
  });
  projectOptions: string[] = ['Nido de agua ', 'Indie Universe'];
  buttonStyle = 'cursor: not-allowed;';


  onInputChange() {
    if (isNaN(parseInt(this.investmentForm.get('amount')?.value))) {
      this.investmentForm.get('amount')?.setValue('');
      return;
    }

    const value: number = parseInt(this.investmentForm.get('amount')?.value.replace(/\./g, ''), 10)
    if (value >= 10000000) {
      this.investmentForm.get('units')?.setValue(this.calculateUnits(value));
    }else{
      this.investmentForm.get('units')?.setValue(0);
    }

    const formatValue = value.toLocaleString('es');

    this.investmentForm.get('amount')?.setValue(formatValue.toString());

  }
  calculateUnits(value: number): number {
    const unitValue = 100000;  
    return Math.trunc(value/unitValue);
  }
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
    const number: number = 11000000;
    console.log(number.toLocaleString('es-CO'));
  }
}