import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  getAllCities,
  getAllCountry,
  getALLStates,
} from './franchise-enquiry/apiURL';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI0YjViNGUzNy03YjRkLTRiMDctYmRjNS04OGY0NDgwNWRkOWYiLCJhaWQiOiJDQUQ1MDU5MC1BMTg5LTQxNEYtQTJGNS0xMDMzOUQxRjlGOTciLCJkaWQiOiI0NDQ5NkIwMy0zNjQ3LTQ5MEMtQjJGMC0yRTE1OUIyN0QyNzgiLCJuYmYiOjE2NjM5MDc0NzIsImV4cCI6MTY2Mzk5Mzg3MiwiaWF0IjoxNjYzOTA3NDcyfQ.rsgushAbnaWjk_g9s47FSCWmFjpj13KAZy2JgbVJtd4';

  constructor(private http: HttpClient) {}

  tokenHeaders = new HttpHeaders({
    // 'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.token,
  });

  options = { headers: this.tokenHeaders };

  //get contries code
  getAllCountries() {
    return this.http.get(getAllCountry, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  //get States Code
  getAllStates(countryId: any) {
    return this.http.get(getALLStates + countryId, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  //get all cities
  getAllCities(url: string, sentData: any) {
    let model = Object.assign({}, sentData);
    return this.http.post(url, model, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // submit data API With Image
  post(url: string, data: any) {
    // let model = Object.assign({}, sentData);

    return this.http.post(url, data, this.options).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
