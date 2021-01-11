import { Validators } from '@angular/forms';
export const GLOBAL_MESSAGES = {
    ERROR_MESSAGE: 'Unable to process your request.'
};

export const REGEX = {
    NOT_EMPTY_VALIDATOR: Validators.pattern(/(?!$|\s+)/),
    NAME_VALIDATOR: Validators.pattern(/^[\\p{L} .'-]+$/),
};

export const LENGTH = {
    MIN_LENGTH_VALIDATOR: Validators.minLength(1),
};
