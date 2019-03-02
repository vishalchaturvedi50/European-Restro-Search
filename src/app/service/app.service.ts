import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResturantClass, ResturantFilterClass } from '../models/resturant';
import { all } from 'q';
import { Subject } from 'rxjs';



@Injectable()
export class AppService {

    /* A Variable to hold all resturants data */
    public allResturants: Array<ResturantClass> = [];

    /* ALl filtered location */
    public filData: ResturantFilterClass = new ResturantFilterClass();

    /* Subject for filData */
    public subjFilData: Subject<ResturantFilterClass> = new Subject();

    /* Subject to send data to Search comp */
    public subjResults: Subject<Array<ResturantClass>> = new Subject();

    constructor(public http: HttpClient) {
        this.getAllDataFn();
    }

    /* Function to be called in constructor for getting all the data */
    getAllDataFn() {
        /* Prepare required headers */
        let headers = new HttpHeaders();
        headers.append('Accept', 'application/json, text/plain, text/csv; charset=UTF-8');
        let options: any = { headers: headers, responseType: 'text/csv' };
        /* CALL WITH OBSERVBLE */
        this.http.get("./assets/euro_restrobeee02c.csv", options).subscribe(resp => {
            //  console.log(resp);
            /* TEMP ARR */
            let worker = new Worker("./assets/worker.js");
            worker.postMessage(resp);
            worker.onmessage = (message) => {
                this.allResturants = JSON.parse(JSON.stringify(message.data));
                let allLoc: Array<string> = [];
                let allCusine: Array<string> = [];
                let name: Array<string> = [];
                this.allResturants.forEach(res => {
                    if (allLoc.indexOf(res.city) == -1)
                        allLoc.push(res.city);

                    res.cuisineStyle.forEach(cus => {
                        if (allCusine.indexOf(cus) == -1)
                            allCusine.push(cus);
                    })
                    name.push(res.name);
                })
                this.filData.allCusines = allCusine;
                this.filData.allNames = name;
                this.filData.allState = allLoc;
                this.subjFilData.next(this.filData);
            };
        });
    };


    /* Filter by loc name or cus */
    searchItemsFn(type: string, searchString: string) {
        type = type.toLowerCase();
        if (type.indexOf("location") > -1) {
            return this.filData.allState.filter(x => { return x.indexOf(searchString) > -1 }).slice(0, 10);
        }
        else if (type.indexOf("name") > -1) {
            return this.filData.allNames.filter(x => { return x.indexOf(searchString) > -1 }).slice(0, 10);
        }
        else if (type.indexOf("cusine") > -1) {
            return this.filData.allCusines.filter(x => { return x.indexOf(searchString) > -1 }).slice(0, 10);
        }
    }


    /* On Submit click of search */
    onSubmitClickedFn(type: string, value: string) {
        let keyWord: string = "";
        let res: Array<ResturantClass> = [];
        type = type.toLowerCase();
        if (type.indexOf("location") > -1) {
            res = this.allResturants.filter(x => x.city == value);
        }
        else if (type.indexOf("name") > -1) {
            res = this.allResturants.filter(x => x.name == value);
        }
        else if (type.indexOf("cusine") > -1) {
            res = this.allResturants.filter(x => x.cuisineStyle.indexOf(value) > -1);
        }
        this.subjResults.next(res);
    }

}