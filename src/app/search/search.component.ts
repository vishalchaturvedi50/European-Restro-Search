import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  /* Allowed filter type */
  public allowedFilterType = ["Location", "Name", "Cusine"];

  /* Item for dropdown */
  public itemsForDropDown: Array<string> = [];

  /* Filter type */
  public selectedFilterType = "";

  /* Current search text */
  public currentSearchText = "";

  constructor(private appService: AppService) { }

  ngOnInit() {
    /* ON INIT DO THE FIRST SEARCH */
    this.selectedFilterType = this.allowedFilterType[0];
    this.appService.subjFilData.subscribe(resp => {
      this.itemsForDropDown = resp.allState.slice(0, 10);
      this.currentSearchText = this.itemsForDropDown[0];
      this.onSubmitClickedFn();
    })
  }


  /* WHEN THE FILTER TYPE CHANGE : JS behavior Event Delegation used */
  clickOnRestroFilterFn(ev: Event) {
    let newVal = (<Element>ev.target).innerHTML;
    this.selectedFilterType = newVal;
  }

  /* Search item */
  searchItemsFn(ev: any) {
    //  this.currentSearchText = ev.target.value; //NOT USING AN NGMODEL TO BIND BECAUSE WE CAN UPDATE HERE
    this.itemsForDropDown = this.appService.searchItemsFn(this.selectedFilterType, this.currentSearchText);
  }

  /* On click of submit */
  onSubmitClickedFn() {
    this.appService.onSubmitClickedFn(this.selectedFilterType, this.currentSearchText);
  }

}

