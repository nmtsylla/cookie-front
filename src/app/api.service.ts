import { environment } from '../environments/environment'
import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http'
import { catchError, tap, map } from 'rxjs/operators'
import { Website } from './models/website'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
const apiUrl = environment.apiUrl + '/websites'

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
      map(websites => websites.map(website => this.fromApiToModel(website))),
      catchError(this.handleError('getWebsites', []))
    )
  }

  getWebsiteById (id: number): Observable<Website> {
    const url = `${apiUrl}/${id}`
    return this.http.get<Website>(url).pipe(
      map(website => this.fromApiToModel(website)),
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

  fromApiToModel (apiRow): Website {
    return {
      id: apiRow.id,
      url: apiRow.url,
      weeklyScanDay: apiRow.weekly_scan_day,
      scanSchedule: apiRow.scan_schedule,
      addedDate: apiRow.added_date,
      lastScanned: apiRow.last_scanned,
      active: apiRow.active,
      customerId: apiRow.customer_id
    }
  }
}
