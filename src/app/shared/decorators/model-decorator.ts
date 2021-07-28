import { FormControl, ValidatorFn, Validators } from "@angular/forms"

export const controls: Map<string, FormControl> = new Map<string, FormControl>();

export const Field = (content?: any) => (target: any, propertyKey: string) => {
  console.log(`Decorate ${propertyKey}`);

  const control: FormControl = new FormControl();

  if (content) {
    const legacyValidators: ValidatorFn[] = [];
    if (content.hasOwnProperty('validators')) {
      for (const validator of content.validators) {
        switch (validator) {
          case 'required':
            legacyValidators.push(Validators.required);
            break;
          case 'requiredTrue':
            legacyValidators.push(Validators.requiredTrue);
            break;
          case 'email':
            legacyValidators.push(Validators.email);
            break;
        }
      }
    }

    if (legacyValidators.length) {
      control.setValidators(legacyValidators);
    }

    if (content.hasOwnProperty('disabled')) {
      control.disable();
    }

    // Add control to controls list
    controls.set(propertyKey, control);
  }
}
