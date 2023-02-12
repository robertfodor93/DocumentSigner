import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Snapshot } from '../models/snapshot';

@Injectable({
  providedIn: 'root'
})
export class SignerService {

  constructor(private http: HttpClient) { }

  signatureCreate(documents : any) {
    return this.http.post<any>('https://cloudsuite.intarsys.de/cloudsuite-gears-preview/core/api/v1/flow/signer/create', documents)
  }

  explorerCreate(documents: any) {
    return this.http.post<any>('https://cloudsuite.intarsys.de/cloudsuite-gears-preview/core/api/v1/flow/explorer/create', documents)
  }

  viewCreate(documents: any) {
    return this.http.post<any>('https://cloudsuite.intarsys.de/cloudsuite-gears-preview/core/api/v1/flow/viewer/create', documents)
  }

  acknowledge(conversation: any) {
    return this.http.post<Snapshot>('https://cloudsuite.intarsys.de/cloudsuite-gears-preview/core/api/v1/flow/conversation/acknowledge', conversation)
  }
}
