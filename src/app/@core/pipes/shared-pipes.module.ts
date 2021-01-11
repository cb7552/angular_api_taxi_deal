import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KeysPipe } from './array-keys.pipe';
import { ValidDateFormatPipe } from './custom-date.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './orderby.pipe';
import { CustomFilterPipe } from './custom-filter.pipe';
import { SearchFormArrayPipe } from './custom-formarray-filter.pipe';
import { RoundPipe } from './round.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ValidDateFormatPipe, OrderByPipe, KeysPipe, FilterPipe, CustomFilterPipe, SearchFormArrayPipe, RoundPipe],
  exports: [ValidDateFormatPipe, OrderByPipe, KeysPipe, FilterPipe, CustomFilterPipe, SearchFormArrayPipe, RoundPipe],
  providers: [ValidDateFormatPipe, OrderByPipe, KeysPipe, FilterPipe, CustomFilterPipe, SearchFormArrayPipe, RoundPipe]
})
export class SharedPipesModule {}
