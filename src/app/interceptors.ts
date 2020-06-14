import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackNotifierService } from './services/snack-notifier';
import { ErrorService } from './services/error.service';

export const currentTokenCookieName = 'currentToken';

@Injectable()
export class ApiRequestInterceptor implements HttpInterceptor {
  constructor(public snack: SnackNotifierService, public errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.snack.showError(this.errorService.getServerErrorMessage(error));
        return throwError(error);
      })
    );
  }
}
