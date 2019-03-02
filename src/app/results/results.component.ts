import { Component, OnInit, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { ResturantClass } from '../models/resturant';
import { AppService } from '../service/app.service';
import * as $ from "jquery";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterViewInit {

  /* list of resturant to showq */
  public resturantList: Array<ResturantClass> = [];

  /* MAIN LIST WHICH CONTAIN ALL DATA */
  public mainResturantList: Array<ResturantClass> = [];

  constructor(private appService: AppService, private elementRef: ElementRef) {

  }

  ngAfterViewInit() {

  }



  ngOnInit() {
    this.appService.subjResults.subscribe(resp => {
      this.mainResturantList = resp;
      this.resturantList = this.mainResturantList.slice(0, 10);
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScrollFn() {
    //We know there will be a body hence 
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height();
    var winHeight = $(window).height();
    var scrollPercent = scrollTop / (docHeight - winHeight);
    if (scrollPercent > 0.8) {
      let length = this.resturantList.length;
      let newEL = this.mainResturantList.slice(length, length + 10);
      this.resturantList.push(...newEL);
    }
  }

  getImgNoFn(id: number) {
    return Math.abs(id % 5);
  }

  /* COMPUTE RATING */
  computeStarFn(rating: number) {
    let arr = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        arr.push("fa-star");
      }
      else if (rating < i && Math.ceil(rating) != Math.floor(rating)) {
        arr.push("fa-star-half-o");
        rating = Math.floor(rating);
      }
      else if (rating < i) {
        arr.push("fa-star-o");
      }
    }
    return arr;
  }

}
