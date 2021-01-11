import { FormArray, FormBuilder, FormControl, FormControlDirective, FormControlName, FormGroup } from '@angular/forms';
import { CheckboxModel } from '../entities/common.entities';
declare var $: any;
export class ControlUtils {
    public static buildCheckBoxGroup(formBuilder: FormBuilder, checkboxItems: CheckboxModel[], selectedIds: string[]): FormArray {
        checkboxItems = checkboxItems.map((item) => {
            if (selectedIds.length) {
                selectedIds.map((id) => {
                    if (item.value === id) {
                        item.isSelected = true;
                    }
                });
            }
            return item;
        });
        const selectedCheckBoxes = checkboxItems.map((item) => {
            return formBuilder.control(item.isSelected);
        });
        return formBuilder.array(selectedCheckBoxes);
    }
    public static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    public static setFocusOnInvalidFields() {
        const invalidItem = <any>$('.ng-invalid');
        if (invalidItem.length) {
            $('input.ng-invalid')
                .first()
                .focus();
        }
    }
    public static setFocus(controlId: string) {
        const control = <any>$('#' + controlId);
        if (control.length) {
            control.first().focus();
        }
    }

    public static disableElements(el, exclusionList: string[] = []) {
        for (let i = 0; i < el.length; i++) {
            if (exclusionList.length) {
                if (exclusionList.indexOf(el[i].id) > -1) {
                    continue;
                }
            }
            if (el[i].nodeName === 'A') {
            } else {
                el[i].disabled = true;
                this.disableElements(el[i].children, exclusionList);
            }
        }
    }

    public static enableElements(el) {
        for (let i = 0; i < el.length; i++) {
            el[i].disabled = false;
            this.enableElements(el[i].children);
        }
    }

    public static markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach((control) => {
            control.markAsTouched();

            if (control.controls) {
                control.controls.forEach((c) => this.markFormGroupTouched(c));
            }
        });
    }
}
