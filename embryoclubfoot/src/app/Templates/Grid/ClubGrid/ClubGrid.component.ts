import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-club-grid',
  templateUrl: './ClubGrid.component.html',
  styleUrls: ['./ClubGrid.component.scss']
})
export class ClubGridComponent implements OnInit {

  @Input() clubs : any ;

  @Input() currency : string;

  @Input() gridLength : any;

  @Input() gridThree : boolean = false;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();

  @Output() addToWishList: EventEmitter<any> = new EventEmitter();

  loaded = false;
  lg     = 25;
  xl     = 25;

  trackByObjectID(index, hit) {
     return hit.objectID;
  }

  constructor() { }

  ngOnInit() {

     if(this.gridThree) {
        this.lg = 33;
        this.xl = 33;
     }
  }

  public addToCartProduct(value:any) {
     this.addToCart.emit(value);
  }

  public onLoad() {
     this.loaded = true;
  }

  public productAddToWishlist(value:any, parentClass) {
     if(!(document.getElementById(parentClass).classList.contains('wishlist-active'))){
        let element = document.getElementById(parentClass).className += " wishlist-active";
     }
     this.addToWishList.emit(value);
  }

  public checkCartAlready(singleProduct) {
     let clubs = JSON.parse(localStorage.getItem("cart_item")) || [];
     if (!clubs.some((item) => item.name == singleProduct.name)) {
        return true;
     }
  }

}
