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

  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.bookingService.getAll("contacto@tuten.cl").subscribe( data => {
      this.bookings = data;
    });
  }

}