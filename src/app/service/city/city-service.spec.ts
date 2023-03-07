import { TestBed } from '@angular/core/testing';

import { CityService } from './city.service';
import {HttpClient} from "@angular/common/http";
import {LoggerService} from "../logger/logger.service";
import {City} from "../../model/city";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {CityResponse} from "../../model/cityResponse";

describe('CityService', () => {
  let service: CityService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new CityService(httpClientSpy, new LoggerService());
  });

  it('should return expected cities (HttpClient called once)', (done: DoneFn) => {
    const expectedCities: City[] =
      [{ id: 1, name: 'A', url: 'http://andresenlab.com/1.jpg' }, { id: 2, name: 'B', url: 'http://andresenlab.com/2.jpg'  }];
    const cityResponse: CityResponse = {
      currentPage: 0,
      totalElements: 2,
      totalPages: 1,
      data: expectedCities
    }
    httpClientSpy.get.and.returnValue(of(cityResponse));

    service.getCityResponse(0,5, '').subscribe({
      next: cities => {
        expect(cities)
          .withContext('expected cities')
          .toEqual(cityResponse);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
