import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination-actions',
  templateUrl: './pagination-actions.component.html',
  styleUrls: ['./pagination-actions.component.scss'],
})
export class PaginationActionsComponent implements OnInit {
  @Input('total') total: number;
  @Output('onPaginationChange') onPaginationChangeEmitter = new EventEmitter();

  pageSizes: number[] = [10, 30, 60];

  pageEvent: PageEvent;
  constructor() {}

  ngOnInit(): void {}

  onPaginationChange(event) {
    this.onPaginationChangeEmitter.emit(event);
    return event;
  }
}
