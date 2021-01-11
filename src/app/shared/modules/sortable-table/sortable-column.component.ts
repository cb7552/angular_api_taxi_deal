import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { SortService } from './sort.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[sortable-column]',
    templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent implements OnInit, OnDestroy {
    constructor(private sortService: SortService) {}

    // tslint:disable-next-line:no-input-rename
    @Input('sortable-column') columnName: string;

    // tslint:disable-next-line:no-input-rename
    @Input('sort-direction') sortDirection = '';

    private columnSortedSubscription: Subscription;

    @HostListener('click')
    sort() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
    }

    ngOnInit() {
        // subscribe to sort changes so we can react when other columns are sorted
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe((event) => {
            // reset this column's sort direction to hide the sort icons
            if (this.columnName !== event.sortColumn) {
                this.sortDirection = '';
            }
        });
    }

    ngOnDestroy() {
        if (this.columnSortedSubscription) {
            this.columnSortedSubscription.unsubscribe();
        }
    }
}
