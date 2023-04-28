import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reg = new RegExp('/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/');
    const forbidden = reg.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}
