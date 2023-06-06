import { AbstractControl, FormControl, FormGroup, ValidationErrors,  ValidatorFn } from "@angular/forms";
import * as moment from "moment";


export function PasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const reg = new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$');
    const forbidden = reg.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  }
}

export function MinuminAgeValidator(age: number): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    let date = moment(control.value, 'dd/MM/yyyy');
    let minimumDate = moment().add(-age, 'years');
    return date.isAfter(minimumDate) ? { minimumAge : { value: control.value} } : null;
  }
}

export function SameAs(otherControlName: string): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    let parentControl = control.parent;
    let expectedControl = parentControl?.get(otherControlName) as FormControl;
    return control.value != expectedControl?.value ? { same : { value: control.value} } : null;
  }
}

export function RequiredIf(condition: boolean): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(!condition)
      return null;
    return condition && !control.value ? { requiredif : { value: control.value} } : null;
  }
}

export function OneOf(formNames: string[]): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(formNames.length <= 0)
      return null;
      
    let formGroup = control.parent as FormGroup;
    if(formGroup == null)
      return null;

    const hasAtLeastOne = formNames.some(f => formGroup.controls[f].value != null && formGroup.controls[f].value !== '');
    return hasAtLeastOne ? null :{ oneOf : { value: control.value} } ;
  }
}
export function MaxFileSize(maxSize: number): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value == null)
      return null;
    console.log(control.value)
    const file: File = control.value
    var size = file.size
    console.log(size);
    return control.value ? null : { maxsize : { value: control.value} };
  }
}

export function PermitedFiles(permittedExtensions: string[]): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value == null)
      return null;

    let fileExt = splitOnLast(control.value, '.').pop() ?? '';
    let extInPermitedExt = permittedExtensions.includes(fileExt, 0);

    return extInPermitedExt ? null : { permittedExtension : { value: control.value} };
  }
}

export const atLeastOne = (validator: ValidatorFn, controls:string[]) => (
  group: FormGroup,
): ValidationErrors | null => {
  if(!controls){
    controls = Object.keys(group.controls)
  }

  const hasAtLeastOne = group && group.controls && controls
    .some(k => !validator(group.controls[k]));

  return hasAtLeastOne ? null : {
    atLeastOne: true,
  };
};

export function GroupOneOf(validator: ValidatorFn, controls:string[]|null): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    var group = control as FormGroup;
    if(!controls || controls.length<= 0){
      controls = Object.keys(group.controls)
    }
    const hasAtLeastOne = group && group.controls && controls
    .some(k => !validator(group.controls[k]));
    return hasAtLeastOne ? null : {
      atLeastOne: true,
    };
  }
};





export function splitOnLast(value: string, e: string) {
  var t = value.lastIndexOf(e);
  return t < 0 ? [value] : [value.substring(0, t), value.substring(t)]
}