import { AbstractControl, ValidationErrors,  ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reg = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$');
    const forbidden = reg.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}

export function MinuminAgeValidator(age: number): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    let date = moment(control.value, 'dd/MM/yyyy');
    let minimumDate = moment().add(-age, 'years');
    return date.isAfter(minimumDate) ? { minimumAge : { value: control.value} } : null;
  };
}
