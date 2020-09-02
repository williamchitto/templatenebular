import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MaxDateValidator(data: string, hora: string ) {
    return (formGroup: FormGroup) => {
      const dataAtual: Date = new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate());
      const horaAtual: Date = new Date();
        const dataControl = formGroup.controls[data];
        const horaControl = formGroup.controls[hora];

        if (dataControl.errors && horaControl.errors) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        if (dataControl.value === null) {
          return;

        }


        if (dataAtual > dataControl.value) {

          horaControl.setErrors(null);
          return;
        }


        if (horaAtual < horaControl.value) {

          horaControl.setErrors({ endbefore: true });

        } else {
          horaControl.setErrors(null);
        }

    };
}
