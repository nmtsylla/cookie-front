import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'Please check your network';
        }
        return error.message ? error.message : error.toString();
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

}
