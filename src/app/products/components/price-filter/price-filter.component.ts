import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss']
})
export class PriceFilterComponent implements OnInit {

  @Input("minValue") minValue = 0;
  @Input("maxValue") maxValue = 0;
  @Output("onSliderChange") onSliderChangeEmmiter = new EventEmitter();

  sliderValue;

  constructor() { }

  onSliderChange(event) {
    this.sliderValue = event.value;
    this.onSliderChangeEmmiter.emit(event.value)
  }

  ngOnInit(): void {
    this.sliderValue = this.minValue;
  }

}
