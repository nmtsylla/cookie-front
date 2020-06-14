import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ? error.message : 'check your network';
  }

}
