import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
    name: 'formatDate'
})
export class ValidDateFormatPipe implements PipeTransform {
    transform(value: any) {
        if (moment(value, 'MM/DD/YYYY', true).isValid()) {
            return value;
        }
        return '';
    }
}
