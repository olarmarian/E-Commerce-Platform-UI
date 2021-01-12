import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-filter',
  templateUrl: './checkbox-filter.component.html',
  styleUrls: ['./checkbox-filter.component.scss'],
})
export class CheckboxFilterComponent implements OnInit {
  @Input('values') values: any[] = [];

  @Output('filters') checkboxValuesEmmiter = new EventEmitter();

  checkboxValues = {};

  onValueCheck() {
    const filtersKeys = Object.keys(this.checkboxValues);
    const filters = [];
    filtersKeys.forEach((key) => {
      if (this.checkboxValues[key]) filters.push(key);
    });
    this.checkboxValuesEmmiter.emit(filters);
  }

  constructor() {}
  ngOnInit(): void {
    this.values.forEach((value) => {
      this.checkboxValues[value] = false;
    });
  }
}
