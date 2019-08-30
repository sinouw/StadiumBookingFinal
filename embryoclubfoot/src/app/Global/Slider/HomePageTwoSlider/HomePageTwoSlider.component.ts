import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { UserMapService } from 'src/app/Services/user-map.service';
import { Router } from '@angular/router';


declare var H: any;

@Component({
   selector: 'embryo-HomePageTwoSlider',
   templateUrl: './HomePageTwoSlider.component.html',
   styleUrls: ['./HomePageTwoSlider.component.scss']
})
export class HomePageTwoSliderComponent implements OnInit, OnChanges {

   @Input() isRTL: any;



   private ui: any;
   private search: any;


   @ViewChild("map", { static: false })
   public mapElement: ElementRef;

   public appId: any = "cds80cGlDkOWep5ZOsIR";
   public appCode: any = "2UPvM6oqL1c0HNVYMJ0QMQ";

   public start: any;
   public finish: any;
   public width: any = "60%";
   public height: any = "700px";

   @Output() sendData: EventEmitter<string> = new EventEmitter<string>();

   // Claiming variables which enable to create a route
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

   // Data for the card which containt infos about a club
   public NameCard: string = "";
   public AddressCard: string = "";
   public RateCard: string = "";
   public SiteWebCard: string = "";

   // Initialize the the list of club location  
   public listOfLocations: any = [];

   public query: string;
   public adresse: string;
   public locations: Array<any>;
   public lat;
   public lng;

   public IdClub;
   mapobjects: any=null


   /**
    *  Constructor & Life Cycle hook
    *  
    * @param service 
    * @param toastr 
    */
   public constructor(
      private service: UserMapService,
      private rout: Router
      ) {

      this.start = "36.8481502,10.2695116";
      this.finish = "36.8583851,10.2731775";
      this.query = "";
      
   }



   // ngOnInit lifecycle hook
   public ngOnInit() {


      // Initialize Variables

      // ... Direction List
      this.directions = [];
      this.distance = 0;
      this.duration = 0;

      // Initialize the list of markers from the backend
      this.service.getClubLocations().subscribe(result => {
         this.fillLocations(result);
      }, error => {
         console.log(error);
      });



      // Initialize Functions related to the map

      // ... Initialize the user location with the auto geoloaction
      this.userGeolocation();
      // ... Step 1: initialize communication with the platform
      // ... We initialize our platform with the app id and app code for our project
      this.platform = new H.service.Platform({
         "app_id": this.appId,
         "app_code": this.appCode
      });

      // ... Initializing the router
      this.router = this.platform.getRoutingService();


      
   }


   /**
    * The Map is a UI component, we cannot begin working with 
    * it until the ngAfterViewInit method has triggered 
    */
   public ngAfterViewInit() {
      let defaultLayers = this.platform.createDefaultLayers();

       setTimeout(() => {
         // Step 2: initialize a map
         this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
               zoom: 7,
               center: new H.geo.Point(34.247835499999995, 10.267448199999999),
               pixelRatio: window.devicePixelRatio || 1
            }
         );
   
         // Add a resize listener to make sure that the map occupies the whole container
         window.addEventListener('resize', () => this.map.getViewPort().resize());
   
         // Step 3: make the map interactive
         // MapEvents enables the event system
         // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
         var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
   
         // Create the default UI components
         this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
   
         // Add event listener
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
               this.addMarker(this.map, location);
            });
            
         }, 1000);
         this.map.getViewPort().resize()
      }, 2000);

   }

   
   // We’ll be using the ngOnChanges hook for when component attribute values change in realtime
   public ngOnChanges(changes: SimpleChanges) {
      // So if the start or finish coordinates change, this method will execute
      if ((changes["start"] && !changes["start"].isFirstChange()) || (changes["finish"] && !changes["finish"].isFirstChange())) {
         this.route(this.start, this.finish);
      }
   }

   fillLocations(response: any) {
      response.map(location => { this.listOfLocations.push(location) });
      const productsToDisplay = this.listOfLocations.forEach(element => {
      });
   }

   setPosition() {
      this.choosing = !this.choosing
      //  if (this.choosing)
      //   this.toastr.info('Click On The Map!', 'Setting Position', { timeOut: 1500 });
   }


   public route(start: any, finish: any) {
      // Set the parameters Choice , Starting position, Finishing position
      let params = {
         "mode": "fastest;" + this.choice + ";",
         "waypoint0": "geo!" + this.start,
         "waypoint1": "geo!" + this.finish,
         "representation": "display",
      }
         setTimeout(() => {
            this.map.removeObjects(this.map.getObjects());
            this.addCircleToMap(this.map, this.position);
            
            
            // Add the Circle to the current position
                  this.listOfLocations.forEach(location => {
                     this.addMarker(this.map, location);
                  });
            
         }, 2000);


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
            }
            else if (this.duration > 60 && this.duration < 3600) {
               this.duration = Math.round(this.duration / 60)
               this.tunit = "Min"
            } else {
               this.duration = Math.round((this.duration / 3600) * 100) / 100
               this.tunit = "Hour"
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
            setTimeout(() => {
               this.map.addObjects([routeLine, startMarker, finishMarker]);
               //    this.map.addObjects([startMarker]);
               this.map.setViewBounds(routeLine.getBounds());
               
            }, 3000);
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
         this.IdClub = location.IdClub;

         var coord = event.target.getPosition();
         this.finish = coord.lat + "," + coord.lng;

         this.route(this.start, this.finish);

      }, false);
   }

   // Adds a circle over a location with a radius of 1000 metres onto the map
   addCircleToMap(map, position) {
      if (this.position != undefined) {
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

   public getAddress() {

      if (this.query != "") {
         this.service.getAddress(this.query).then(result => {

            this.locations = <Array<any>>result;
            this.locations = this.locations.filter(l => l.Location.Address.Country == "TUN");

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

   viewTerrain(id) {
      this.rout.navigate(['/client/terrains',id]);
   }

}
