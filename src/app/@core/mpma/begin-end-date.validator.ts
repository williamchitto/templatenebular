import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function BeginEndValidator(begin: string, end: string ) {
    return (formGroup: FormGroup) => {
        const beginControl = formGroup.controls[begin];
        const endControl = formGroup.controls[end];

        if (beginControl.errors && endControl.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (beginControl.value > endControl.value) {
          endControl.setErrors({ endbefore: true });
        } else {
          endControl.setErrors(null);
        }
    };
}
