import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/services';
import { Booking } from '../shared/models';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public bookings:Array<Booking>;
  public bookingsSelected:Array<Booking>;
  public searchEnabled: boolean = false;
  public showFilter: boolean = false;
  public searchText: string= "";
  public bookingIDOp: string="";
  public bookingPrice: string="";
  public filters: Array<string> = [];

  constructor(
    private bookingService: BookingService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.bookingService.getAll("contacto@tuten.cl").subscribe( data => {
      this.bookings = data;
      this.bookingsSelected = data;
    });
  }

  showSearch () {
    this.showFilter = false;
    this.searchEnabled = !this.searchEnabled;
    if (!this.searchEnabled) {
      this.bookingsSelected = this.bookings;
      this.searchText = "";
    }
  }

  filterResult() {
    this.bookingsSelected = this.bookings.filter( x => (this.searchText == "" ||  x.bookingId.toString().includes(this.searchText) || x.bookingPrice.toString().includes(this.searchText)))
    if (this.bookingIDOp != "")
      this.bookingsSelected =  this.bookingsSelected.sort((a:Booking, b:Booking) => 
        this.bookingIDOp == "asc" ? a.bookingId - b.bookingId : b.bookingId - a.bookingId)
    if (this.bookingPrice != "")
      this.bookingsSelected =  this.bookingsSelected.sort((a:Booking, b:Booking) => 
          this.bookingIDOp == "asc" ? a.bookingId - b.bookingId : b.bookingId - a.bookingId)  
    
    this.updateFilterTag();
    this.showFilters(null);
  }

  updateFilterTag() {
    let filterSelected: Array<string> = []; 
    if (this.bookingIDOp != "") {
      filterSelected.push("BookingID "+this.bookingIDOp);
    }
    if (this.bookingPrice != "") {
      filterSelected.push("Price "+this.bookingPrice);
    }
    this.filters = filterSelected;
  }

  async showFilters(ev: any) {
    this.searchEnabled = false;
    this.showFilter = !this.showFilter;
  }

  removeFilter (filterToRemove) {
    if(filterToRemove.split(" ")[0] == "BookingID") {
      this.bookingIDOp = "";
    }
    else {
      this.bookingPrice = "";
    }
    this.showFilter = true;
    this.filterResult();
  }

  
}