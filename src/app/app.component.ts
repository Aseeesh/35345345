import { Component, OnInit,AfterViewInit , NgZone, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  ngOnInit() {
   // $('.carousel.carousel-slider').carousel({fullWidth: true});
}
ngAfterViewInit(){
 // $('.carousel.carousel-slider').carousel({fullWidth: true});
  
  }
}
