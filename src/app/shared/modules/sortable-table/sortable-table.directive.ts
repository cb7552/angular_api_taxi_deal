import { Directive, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { SortService } from './sort.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sortable-table]'
})
export class SortableTableDirective implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  @Output() sorted = new EventEmitter();
  @Output() sortedPopup = new EventEmitter();

  private columnSortedSubscription: Subscription;
  private columnSortedSubscriptionPopup: Subscription;

  ngOnInit() {
    // subscribe to sort changes so we emit and event for this data table
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe((event) => {
      this.sorted.emit(event);
    });
    this.columnSortedSubscriptionPopup = this.sortService.columnSorted$.subscribe((event) => {
      this.sortedPopup.emit(event);
    });
  }

  ngOnDestroy() {
    if (this.columnSortedSubscription) {
      this.columnSortedSubscription.unsubscribe();
    }
    if (this.columnSortedSubscriptionPopup) {
      this.columnSortedSubscriptionPopup.unsubscribe();
    }
  }
}
