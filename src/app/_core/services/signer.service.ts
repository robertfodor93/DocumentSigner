import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignerService {

  constructor(private http: HttpClient) { }

  create(files : File[]) {
    return this.http.post<any>('https://cloudsuite.intarsys.de/cloudsuite-gears-preview/core/api/v1/flow/signer/create', files)
  }
}
