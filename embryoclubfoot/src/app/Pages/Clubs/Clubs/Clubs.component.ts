import { Component, OnInit } from '@angular/core';
import { EmbryoService } from 'src/app/Services/Embryo.service';
import { baseurl } from 'src/app/AdminPanel/Models/basurl.data';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminGenericService } from 'src/app/AdminPanel/Service/AdminGeneric.service';
import { ToastaService } from 'ngx-toasta';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-clubs',
   templateUrl: './Clubs.component.html',
   styleUrls: ['./Clubs.component.scss']
})
export class ClubsComponent implements OnInit {


   type: any;
   pips: boolean = true;
   tooltips: boolean = true;
   category: any;
   pageTitle: string;
   subPageTitle: string;
   baseUrl: any = baseurl;

   public subscribers: any = {};

   constructor(private route: ActivatedRoute,
      private router: Router,
      public embryoService: EmbryoService,
      private clubService: AdminGenericService
   ) {

      
   }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.route.queryParams.forEach(queryParams => {
            this.category = queryParams['category'];
            this.type = null;
            this.type = params['type'];
            this.getPageTitle();
         });
      });
      this.clubService.get(this.baseUrl + '/clubs/algolia').subscribe(res => {
         console.log(res);
      }, err => {
         console.log(err);
      });
   }

   public getPageTitle() {
      this.pageTitle = null;
      this.subPageTitle = null;

      switch (this.type || this.category) {
         case undefined:
            this.pageTitle = "Clubs";
            this.subPageTitle = "Explore your favourite Club.";
            break;

         case "gadgets":
            this.pageTitle = "Gadgets";
            this.subPageTitle = "Check out our new gadgets.";
            break;

         case "accessories":
            this.pageTitle = "Accessories";
            this.subPageTitle = "Choose the wide range of best accessories.";
            break;

         default:
            this.pageTitle = "Products";
            this.subPageTitle = null;
            break;
      }
   }

   public addToCart(value) {
      this.embryoService.addToCart(value);
   }

   public addToWishList(value) {
      this.embryoService.addToWishlist(value);
   }

   public transformHits(hits) {
      hits.forEach(hit => {
         hit.stars = [];
         for (let i = 1; i <= 5; i) {
            hit.stars.push(i <= hit.rating);
            i += 1;
         }
      });
      return hits;
   }

}
