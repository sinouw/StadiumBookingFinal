import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserMapService } from 'src/app/Services/user-map.service';

declare var H: any;

@Component({
  selector: 'embryo-HomePageOneSlider',
  templateUrl: './HomePageOneSlider.component.html',
  styleUrls: ['./HomePageOneSlider.component.scss']
})
export class HomePageOneSliderComponent implements OnInit, OnChanges {

    @Input() isRTL : boolean = false;

   // slideConfig : any;

   // constructor() { }

   // ngOnInit() {
   // }

   // ngOnChanges() {
   //    this.slideConfig = {
   //       slidesToShow: 1,
   //       slidesToScroll:1,
   //       autoplay: true,
   //       autoplaySpeed: 2000,
   //       dots: false,
   //       rtl: this.isRTL,
   //       responsive: [
   //        {
   //           breakpoint: 768,
   //           settings: {
   //              arrows: false,
   //              slidesToShow: 1
   //           }
   //           },
   //        {
   //           breakpoint: 480,
   //           settings: {
   //              arrows: false,
   //              slidesToShow: 1
   //           }
   //        }
   //       ]
   //    };
   // }

   
   private ui: any;
   private search: any;


   @ViewChild("map", { static: false })
   public mapElement: ElementRef;

   // @Input()
   public appId: any= "cds80cGlDkOWep5ZOsIR";

   // @Input()
   public appCode: any="2UPvM6oqL1c0HNVYMJ0QMQ";

   // @Input()
   public start: any="36.8481502,10.2695116"

   // @Input()
   public finish: any= "36.8583851,10.2731775";

   // @Input()
   public width: any="60%";

   // @Input()
   public height: any = "700px";

   @Output() sendData: EventEmitter<string> = new EventEmitter<string>();

   public directions: any;
   public distance: any;
   public duration: any;
   public choosing: boolean = false;
   private platform: any;
   private map: any;
   private router: any;
   public choice: any = "pedestrian";
   unit: string = "Metre";
   tunit: string;
   position: any;

   // Data for the card
   public NameCard: string = "";
   public AddressCard: string = "";
   public RateCard: string = "";
   public SiteWebCard: string = "";


   public listOfLocations: any = [];


   public query: string;
   public destinationQuery: string;
   public adresse: string;
   public locations: Array<any>;
   public lat;
   public lng;

   public constructor(private service: UserMapService) {
       this.start = "36.8481502,10.2695116";
       this.finish = "36.8583851,10.2731775";
       this.query = "";
   }



   //the ngOnInit lifecycle hook
   public ngOnInit() {


       this.userGeolocation();

       //we initialize our platform with the app id and app code for our project
       this.platform = new H.service.Platform({
           // "app_id": this.appId,
           // "app_code": this.appCode
           "app_id": this.appId,
           "app_code": this.appCode
       });

       //Direction List
       this.directions = [];
       this.distance = 0;
       this.duration = 0;

       //initializing the router
       this.router = this.platform.getRoutingService();


       this.service.getClubLocations().subscribe(result => {
           this.fillLocations(result);
       }, error => {
           console.log(error);
       });
   }

   fillLocations(response: any) {
       response.map(location => { this.listOfLocations.push(location) });
       const productsToDisplay = this.listOfLocations.forEach(element => {
           console.log(element)
       });
   }

   //the map is a UI component, we cannot begin working with it until the ngAfterViewInit method has triggered
   public ngAfterViewInit() {
       let defaultLayers = this.platform.createDefaultLayers();
       this.map = new H.Map(
           this.mapElement.nativeElement,
           defaultLayers.normal.map,
           {
               zoom: 7,
               center: new H.geo.Point(34.247835499999995, 10.267448199999999)
           }
       );

        // Add a resize listener to make sure that the map occupies the whole container
        window.addEventListener('resize', () => this.map.getViewPort().resize());

       //map Events 
       let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

       this.ui = H.ui.UI.createDefault(this.map, defaultLayers);

       // Add event listener:
       this.map.addEventListener('tap', evt => {
           if (this.choosing) {
               var coord = this.map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY);

               // variables
               this.start = coord.lat + "," + coord.lng
               let coords = { latitude: coord.lat, longitude: coord.lng };
               this.position = { coords: coords };

               this.addCircleToMap(this.map, this.position);
               this.route(this.start, this.finish);
               // this.sendData.emit(this.start);
               this.setPosition();
               // this.toastr.success('Location Successfully Setted!', 'Setting Position', { timeOut: 1500 });
           }
       });

       setTimeout(() => {
           this.listOfLocations.forEach(location => {
               console.log(location);
               this.addMarker(this.map, location);
           });
       }, 800);



   }

   // We’ll be using the ngOnChanges hook for when component attribute values change in realtime
   public ngOnChanges(changes: SimpleChanges) {
       // So if the start or finish coordinates change, this method will execute
       if ((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
           this.route(this.start, this.finish);
       }
   }

   setPosition() {
       this.choosing = !this.choosing
      //  if (this.choosing)
         //   this.toastr.info('Click On The Map!', 'Setting Position', { timeOut: 1500 });
   }


   public route(start: any, finish: any) {
       if(this) {

       }
       // Set the parameters Choice , Starting position, Finishing position
       let params = {
           "mode": "fastest;" + this.choice + ";",
           "waypoint0": "geo!" + this.start,
           "waypoint1": "geo!" + this.finish,
           "representation": "display",
       }

       this.map.removeObjects(this.map.getObjects());

       // Add the Circle to the current position
       this.addCircleToMap(this.map, this.position);


       this.listOfLocations.forEach(location => {
           this.addMarker(this.map, location);
       });

       this.router.calculateRoute(params, data => {
           if (data.response) {
               this.directions = data.response.route[0].leg[0].maneuver;
               // Distance
               this.distance = 0
               data.response.route[0].leg[0].maneuver.forEach(element => {
                   this.distance += parseInt(element.length)
               });
               if (this.distance > 1000) {
                   this.distance /= 1000
                   this.distance = Math.round((this.distance) * 100) / 100
                   this.unit = "Km"
               }
               else {
                   this.unit = "Metre"
               }

               // Duration
               this.duration = 0
               data.response.route[0].leg[0].maneuver.forEach(element => {
                   this.duration += parseInt(element.travelTime)
               });

               if (this.duration < 60) {
                   this.tunit = "Sec"
                   console.log(this.tunit)
               }
               else if (this.duration > 60 && this.duration < 3600) {
                   this.duration = Math.round(this.duration / 60)
                   this.tunit = "Min"
                   console.log(this.tunit)
               } else {
                   this.duration = Math.round((this.duration / 3600) * 100) / 100
                   this.tunit = "Hour"
                   console.log(this.tunit)

               }

               data = data.response.route[0];

               let lineString = new H.geo.LineString();
               data.shape.forEach(point => {
                   let parts = point.split(",");
                   lineString.pushLatLngAlt(parts[0], parts[1]);
               });
               let routeLine = new H.map.Polyline(lineString, {
                   style: { strokeColor: "blue", lineWidth: 4 },
               });
               let startMarker = new H.map.Marker({
                   lat: this.start.split(",")[0],
                   lng: this.start.split(",")[1]
               });
               let finishMarker = new H.map.Marker({
                   lat: this.finish.split(",")[0],
                   lng: this.finish.split(",")[1]
               });
               this.map.addObjects([routeLine, startMarker, finishMarker]);
               //    this.map.addObjects([startMarker]);
               this.map.setViewBounds(routeLine.getBounds());
           }
       }, error => {
           console.error(error);
       });
   }

   // Change the mode of the route
   modeType(mode) {
       if (mode == "Walk") {
           // ... If the routing mode is Walk
           this.choice = "pedestrian";
         //   this.toastr.success('Walk Mode Successfully Setted!', 'Setting Mode', { timeOut: 1500 });
       }
       else if (mode == "Car") {
           // ... If the routing mode is Car
           this.choice = "car"
         //   this.toastr.success('Car Mode Successfully Setted!', 'Setting Mode', { timeOut: 1500 });
       }
       else {
           // ... If the routing mode is bicycle
           this.choice = "bicycle"
         //   this.toastr.success('Bicycle Mode Successfully Setted!', 'Setting Mode', { timeOut: 1500 });
       }
       // ... recalculate the route
       this.route(this.start, this.finish);
   }

   // Change the Geolocation automatically
   userGeolocation() {
       if (navigator.geolocation) {
           // ... If the geolocation is supported 
           navigator.geolocation.getCurrentPosition(position => {
               this.start = position.coords.latitude + "," + position.coords.longitude;

               this.position = position;
               // this.toastr.success('Your location is set automatically!', 'Setting Current Position', { timeOut: 1500 });
               this.route(this.start, this.finish);
           });
       } else {
           // ... If the geolocation is not supported
           this.start = "36.7949999,10.0732374";
           this.route(this.start, this.finish);
           console.error("Geolocation is not supported by this browser!");
       }
   }

   // Create a Marker with an event listener
   addMarker(map: any, location: any) {
       // Create an object holding the latitude and longitude, and a marker:
       var coords = { lat: location.lat, lng: location.lng },
           marker = new H.map.Marker(coords);

       // Add the marker to the map and center the map at the location of the marker:
       map.addObject(marker);
       map.setCenter(coords);

       // Add event listener to the list of markers ( we get this markers from the data ).
       marker.addEventListener("tap", event => {
           this.ui.getBubbles().forEach(bub => this.ui.removeBubble(bub));
           var bubble = new H.ui.InfoBubble(event.target.getGeometry(), {
               // read custom data
               content: `Name: 
               ` + location.Name + `
               Address: 
               ` + location.Address
           });
           // show info bubble
           this.ui.addBubble(bubble);

           // Add Card
           this.NameCard = location.Name;
           this.AddressCard = location.Address;
           this.RateCard = location.Rate;
           this.SiteWebCard = location.SiteWeb;

           var coord = event.target.getPosition();
           this.finish = coord.lat + "," + coord.lng;

           this.route(this.start, this.finish);

       }, false);
   }

   // Adds a circle over a location with a radius of 1000 metres onto the map
   addCircleToMap(map, position) {
       console.log("position", position);
       if(this.position != undefined) {
           map.addObject(new H.map.Circle(
               // The central point of the circle
               { lat: position.coords.latitude, lng: position.coords.longitude },
               // The radius of the circle in meters
               500,
               {
                   style: {
                       strokeColor: 'rgba(55, 85, 170, 0.6)', // Color of the perimeter
                       lineWidth: 2,
                       fillColor: 'rgba(17, 136, 221,0.7)'  // Color of the circle
                   }
               }
           ));
   
       }
       
   }

   deleteDelete(lat, lng) {

   }

   public getAddress() {

       if (this.query != "") {
           this.service.getAddress(this.query).then(result => {

               this.locations = <Array<any>>result;
               this.locations = this.locations.filter(l => l.Location.Address.Country == "TUN");
               console.log(this.locations);

               this.lat = this.locations[0].Location.DisplayPosition.Latitude;
               this.lng = this.locations[0].Location.DisplayPosition.Longitude;

               // variables
               this.start = this.lat + "," + this.lng
               let coords = { latitude: this.lat, longitude: this.lng };
               this.position = { coords: coords };
               this.route(this.start, this.finish);
           }, error => {
               console.error(error);
           });

           //   this.route(this.start,this.finish);
       }

   }

}
