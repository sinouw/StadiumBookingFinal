import { Component, OnInit, Input, OnChanges, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { EmbryoService } from 'src/app/Services/Embryo.service';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { ReservsationService } from 'src/app/Services/reservsation.service';


@Component({
  selector: 'app-terrain-detail',
  templateUrl: './terrain-detail.component.html',
  styleUrls: ['./terrain-detail.component.scss']
})
export class TerrainDetailComponent implements OnInit {

  @Input() detailData: any;
  @Input() currency: string;

  mainImgPath: string;
  totalPrice: any;
  type: any;
  colorsArray: string[] = ["Red", "Blue", "Yellow", "Green"];
  sizeArray: number[] = [36, 38, 40, 42, 44, 46, 48];
  quantityArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  productReviews: any;


  terrainDetails: any;
  IdTerrain;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService,
    public service: AdminGenericService,
    private resservice :ReservsationService
  ) {
    // console.log(this.IdTerrain);
    
    this.embryoService.getProductReviews().valueChanges().subscribe(res => { this.productReviews = res });
  }

  ngOnInit() {
    this.mainImgPath = "";
    this.totalPrice = "";

    this.route.params.subscribe(res => {
      this.type = null;
      this.type = res.type;
      this.IdTerrain = res.id;
      console.log(res.id);
    });

    this.getTerrainDetail(this.IdTerrain).subscribe(result => {
      console.log(result);
      this.terrainDetails = result;
    }, error => {
      console.log(error);
    });

  }

  ngOnChanges() {
    this.mainImgPath = null;
    this.totalPrice = null;
    this.mainImgPath = "";
    this.totalPrice = "";
  }

  getTerrainDetail(id) {
    return this.service.get(baseurl+"/terrains/" + this.IdTerrain);
  }

  /**
   * getImagePath is used to change the image path on click event. 
   */
  public getImagePath(imgPath: string, index: number) {
    document.querySelector('.border-active').classList.remove('border-active');
    this.mainImgPath = imgPath;
    document.getElementById(index + '_img').className += " border-active";
  }

  public calculatePrice(detailData: any, value: any) {
    detailData.quantity = value;
    this.totalPrice = detailData.price * value;
  }

  public AddReservationPopup() {
    this.embryoService.addNewReservationDialog(this.IdTerrain);
  }

  public reviewPopup(detailData) {
    let reviews: any = null;
    for (let review of this.productReviews) {
      reviews = review.user_rating;
    }

    this.embryoService.reviewPopup(detailData, reviews);
  }

  public addToWishlist(value: any) {
    this.embryoService.addToWishlist(value);
  }

  public addToCart(value: any) {
    this.embryoService.addToCart(value);
  }

  public buyNow(value: any) {
    this.embryoService.buyNow(value);
    this.router.navigate(['/checkout']);
  }

  NavigateCalendar() {
    this.resservice.putIdTerrain(this.IdTerrain)
    this.router.navigate(['/calendar/']);
  }
}
