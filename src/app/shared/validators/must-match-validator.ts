import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MustMatchValidator {
  public static mustMatch(
    controlName: string,
    confirmControlName: string
  ) {
    return (formGroup: FormGroup) => {
      console.log(`${controlName} / ${confirmControlName}`);

      const controlValue: string = formGroup.controls[controlName].value;
      const confirmControlValue: string = formGroup.controls[confirmControlName].value;

      if (formGroup.controls[confirmControlName].errors && !formGroup.controls[confirmControlName].errors!.mustMatch) {
        return null;
      }

      // My logic here
      if (controlValue !== confirmControlValue) {
        return {mustMatch: true};
      }

      return null;
    }
  }
}

const mustMatch = (controlName: string, confirmControlName: string) => {
  return (formGroup: FormGroup)  => {
    const control: AbstractControl = formGroup.controls[controlName];
    const confirmControl: AbstractControl = formGroup.controls[confirmControlName];

    if (confirmControl.errors && confirmControl.errors!.mustMatch) {
      return null;
    }

    if (control.value !== confirmControl.value) {
      return {mustMatch: true}
    }
    return null;
  }
}
