import {Component, Input, OnInit} from '@angular/core';
import {City} from "../../model/city";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {CityService} from "../../service/city/city.service";
import {catchError, tap} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../../service/notification/notification.service";

@Component({
  selector: 'app-city-editor',
  templateUrl: './city-editor.component.html',
  styleUrls: ['./city-editor.component.css']
})
export class CityEditorComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private location: Location,
              private cityService: CityService,
              private notificationService: NotificationService
  ) {
  }

  @Input()
  city?: City;
  private errorMessage: HttpErrorResponse | undefined;

  ngOnInit(): void {
    this.getCity();
  }

  getCity(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cityService.getCity(id)
      .subscribe(city => this.city = city);
  }

  goBack(): void {
    this.location.back();
  }

  save() {
    if (this.city) {
      this.cityService.updateCity(this.city)
        .subscribe(
        (response) => {                           //Next callback
          console.log('response received')
          this.goBack()
        },
        (error) => {                              //Error callback
          console.error('error caught in component')
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error;
            this.notificationService.showError(this.errorMessage.error.errorMessage);
          }

          //throw error;   //You can also throw the error to a global error handler
        });
    }
  }
}
