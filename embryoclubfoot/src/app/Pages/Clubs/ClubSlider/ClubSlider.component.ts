import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-club-slider',
  templateUrl: './ClubSlider.component.html',
  styleUrls: ['./ClubSlider.component.scss']
})
export class ClubSliderComponent implements OnInit, OnChanges {

  @Input() isRTL: any;

  slideConfig: any;


  slides = [
    {
      img: "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      content: "<h4 class='white-text' >New Arrival</h4><h1 class='text-main white-text'>Biggest Sale</h1><h1 class='text-bold mb-4 white-text'>50% <sup class='bold-sup white-text'>Flat Off</sup></h1>"
    },
    {
      img: "https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      content: "<h4 class='white-text' >New Arrival</h4><h1 class='text-main white-text'>Biggest Sale</h1><h1 class='text-bold mb-4 white-text'>50% <sup class='bold-sup white-text'>Flat Off</sup></h1>"
    },
    {
      img: "https://images.pexels.com/photos/1667583/pexels-photo-1667583.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      content: "<h4 class='white-text' >Best Collection</h4><h1 class='text-main white-text'>Biggest Sale</h1><h1 class='text-bold mb-4 white-text'>70% <sup class='bold-sup white-text'>Flat Off</sup></h1>"
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.slideConfig = {
      infinite: true,
      centerMode: true,
      centerPadding: '400px',
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: false,
      rtl: this.isRTL,
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '300px',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        },
        {
          breakpoint: 1199,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '150px',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        },
        {
          breakpoint: 899,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '75px',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        },
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '0',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            centerPadding: '0',
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000
          }
        }
      ]
    };
  }

}
