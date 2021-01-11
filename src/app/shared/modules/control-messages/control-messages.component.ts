import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationService } from '../../../@core/services';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'control-messages',
    template: `<small *ngIf="errorMessage !== null" class="text-danger">{{errorMessage}}</small>`
})
export class ControlMessagesComponent {
    @Input() control: FormControl;
    @Input() controlMessage: string;
    constructor() { }

    get errorMessage() {
        if (this.control && this.control.touched && this.control.errors) {
            // tslint:disable-next-line:forin
            for (const propertyName in this.control.errors) {
                // return ValidationService.getValidatorErrorMessage(
                //     propertyName,
                //     this.control.errors[propertyName]
                // );
                return this.controlMessage;
            }

            return null;
        }
    }
}
