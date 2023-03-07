import {Component, OnInit} from '@angular/core';
import {City} from "../../model/city";
import {CityService} from "../../service/city/city.service";
import {Observable, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {CityResponse} from "../../model/cityResponse";


@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities: City[] = [];
  page: number = 1;
  pageSize: number = 5;
  totalItems: number = 0;
  pageSizes: number[] = [5, 10, 15, 20];

  private searchTerms = new Subject<string>();
  cityResponse$!: Observable<CityResponse>;


  constructor(private cityService: CityService) {
  }

  ngOnInit(): void {

    this.getCities();

    this.cityResponse$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.cityService.getCityResponse(this.page - 1, this.pageSize, term)),
    );

    this.cityResponse$.subscribe(cityResponse => {
      this.cities = cityResponse.data;
      this.page = cityResponse.currentPage + 1;
      this.totalItems = cityResponse.totalElements;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getCities();
  }

  getCities(): void {
    this.cityService.getCityResponse(this.page - 1, this.pageSize, '').subscribe(cityResponse => {
      this.cities = cityResponse.data;
      this.page = cityResponse.currentPage + 1;
      this.totalItems = cityResponse.totalElements;
    });
  }

  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.getCities()
  }

  search(term: string): void {
    console.log("term")
    this.searchTerms.next(term);
  }
}
