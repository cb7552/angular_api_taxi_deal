import { CanDeactivate } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

export interface FormComponent {
    form: FormGroup;
}

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<FormComponent> {
    private count = 0;
    private canGo = true;
    canDeactivate(component: FormComponent) {
        Object.keys(component).forEach((key) => {
            if (component[key] instanceof FormGroup) {
                if (component[key].dirty) {
                    this.canGo = confirm('You have unsaved changes. Are you sure you want to navigate away?');
                }
            }
        });
        return this.canGo;
    }
}
