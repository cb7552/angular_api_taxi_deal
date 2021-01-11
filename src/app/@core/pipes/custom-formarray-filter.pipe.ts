import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Pipe({
  name: 'searchFormArray'
})
export class SearchFormArrayPipe implements PipeTransform {
  transform(FormControlArray: FormArray, filter: string, isAnd: boolean) {
    if (!filter || typeof filter === 'undefined' || filter === '' || filter === null) {
      const forms = <Array<FormControl>>FormControlArray.controls;
      return forms;
    }
    if (filter && Array.isArray(FormControlArray)) {
      const filterKeys = Object.keys(filter);
      if (isAnd) {
        // tslint:disable-next-line:max-line-length
        return FormControlArray.filter((item) => filterKeys.reduce((memo, keyName) => (memo && new RegExp(filter[keyName], 'gi').test(item.value[keyName])) || filter[keyName] === '', true));
      } else {
        return FormControlArray.filter((item) => {
          return filterKeys.some((keyName) => {
            return new RegExp(filter[keyName], 'gi').test(item.value[keyName]) || filter[keyName] === '';
          });
        });
      }
    } else {
      return FormControlArray;
    }

    // return (<Array<FormControl>>FormControlArray.controls).filter((x) => x.value['p6ActivityCode'].indexOf(searchFormArray) !== -1);
  }
}
