import { FormControl, FormGroup } from "@angular/forms";

export function getFormFromGroup(name : string, form: FormGroup){ return form.get(name) as FormControl }
