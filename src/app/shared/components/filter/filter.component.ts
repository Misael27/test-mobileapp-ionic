import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  @Input('bookingIDOp') bookingIDOp: string;
  @Input('bookingPrice') bookingPrice: string;
  @Output() onChangeFilter = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  changeFilter () {
    this.onChangeFilter.emit({bookingIDOp:this.bookingIDOp,bookingPrice:this.bookingPrice});
  }

}
