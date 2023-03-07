import {City} from "./city";
export interface CityResponse {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  data: City[];
}
