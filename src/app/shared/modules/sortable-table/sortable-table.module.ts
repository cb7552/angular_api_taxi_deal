import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableTableDirective } from './sortable-table.directive';
import { SortableColumnComponent } from './sortable-column.component';
import { SortService } from './sort.service';

@NgModule({
    imports: [CommonModule],
    declarations: [SortableTableDirective, SortableColumnComponent],
    exports: [SortableTableDirective, SortableColumnComponent],
    providers: [SortService]
})
export class SortTableModule {}
