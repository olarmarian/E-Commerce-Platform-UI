import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-sort',
  templateUrl: './select-sort.component.html',
  styleUrls: ['./select-sort.component.scss']
})
export class SelectSortComponent {

  @Output("onSelectChange") onSelectChangeEmitter = new EventEmitter();

  options = [

    'Price Increase',
    'Price Decrease',
    'Name Increase',
    'Name Decrease'
  ]

  selected = false;

  constructor() { }

  onSelectChange(event) {
    this.selected = event.value;
    this.onSelectChangeEmitter.emit(this.selected);
    console.log("mwie");
  }

}
