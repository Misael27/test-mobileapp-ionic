import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/services';
import { Booking } from '../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public bookings:Array<Booking>;
  public bookingsSelected:Array<Booking>;
  public searchEnabled: boolean = false;
  public searchText: string= "";

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingService.getAll("contacto@tuten.cl").subscribe( data => {
      this.bookings = data;
      this.bookingsSelected = data;
    });
  }

  showSearch () {
    this.searchEnabled = !this.searchEnabled;
    if (!this.searchEnabled) {
      this.bookingsSelected = this.bookings;
      this.searchText = "";
    }
  }

  filterResult() {
    this.bookingsSelected = this.bookings.filter( x => (this.searchText == "" ||  x.bookingId.toString().includes(this.searchText) || x.bookingPrice.toString().includes(this.searchText)));
  }

}