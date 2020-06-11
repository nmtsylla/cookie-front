import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Website } from './models/website';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const apiUrl = environment.apiUrl + '/websites';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (private http: HttpClient) {}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

  getWebsites (): Observable<Website[]> {
    return this.http.get<Website[]>(`${apiUrl}`).pipe(
      tap(websites => console.log('fetched websites')),
      catchError(this.handleError('getWebsites', []))
    )
  }

  getWebsiteById (id: number): Observable<Website> {
    const url = `${apiUrl}/${id}`
    return this.http.get<Website>(url).pipe(
      tap(_ => console.log(`fetched Website id=${id}`)),
      catchError(this.handleError<Website>(`getWebsiteById id=${id}`))
    )
  }

  addWebsite (website: Website): Observable<Website> {
    return this.http.post<Website>(apiUrl, website, httpOptions).pipe(
      tap((c: Website) => console.log(`added Website id=${c.id}`)),
      catchError(this.handleError<Website>('addWebsite'))
    )
  }

  deleteWebsite (id: number): Observable<Website> {
    const url = `${apiUrl}/${id}`
    return this.http.delete<Website>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Website id=${id}`)),
      catchError(this.handleError<Website>('deleteWebsite'))
    )
  }
}
