import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authData = ('Test' + ':' + 'Test')
    let requestClone = request.clone({
      setHeaders: {
        Authorization: `Basic ${authData}`
      }
    })

    return next.handle(requestClone)
  }
}
