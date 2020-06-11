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
    return this.http.post<Website>(apiUrl, this.fromModelToApi(website)).pipe(
      tap((c: Website) => console.log(`added Website id=${c.id}`)),
      catchError(this.handleError<Website>('addWebsite'))
    )
  }

  deleteWebsite (id: number): Observable<Website> {
    const url = `${apiUrl}/${id}`
    return this.http.delete<Website>(url).pipe(
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
      customerId: apiRow.customer_id,
      kookies: apiRow.kookies.map(kookie => this.kookieApiToModel(kookie) )
    }
  }

  kookieApiToModel(cookie){
    return {
      id: cookie.id,
      url: cookie.url,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
      secure: cookie.secure,
      httpOnly: cookie.httponly,
      seenDate: cookie.seen_data,
      expiry: cookie.expiry,
      description: cookie.description
    }
  }

  fromModelToApi (row): any {
    return {
      url: row.url,
      weekly_scan_day: row.weeklyScanDay,
      scan_schedule: row.scanSchedule,
      added_date: row.addedDate,
      customer_id: row.customerId
    }
  }

}
