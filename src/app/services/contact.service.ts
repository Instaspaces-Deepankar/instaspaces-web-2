import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {environment} from "../environments/environment";
import {CallCoordinator} from "../api-interface/CallCoordinator.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitForm(name:any,email:any,number:any,msg:any,ploc:any,type:any,PageInput:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('name', name);
    body.set('email', email);
    body.set('prefLoc', ploc);
    body.set('plantype', type);
    body.set('pax', '5');
    body.set('message', msg);
    body.set('telephone', number);
    body.set('PageInput', PageInput);

    return this.http.post<any>(this.apiUrl+'/Contact', body.toString(), { headers });
  }
  private apiUrl6 = `${this.apiUrl}/api/sales-coordinator/active`;

  getActiveCoordinators(): Observable<CallCoordinator[]> {
    return this.http.get<CallCoordinator[]>(this.apiUrl6);
  }
  fallBackSubmitForm(name: any, email: any, number: any, msg: any, ploc: any, type: any,timestamp:any): Observable<any> {
    const contactDetails = [
      {
        fullName: name,
        email: email,
        mobile: number,
        preferredLocation: ploc,
        selectedPlan: type,
        message: msg,
        timestamp:timestamp
      }
    ];

    return this.http.post<any>(this.apiUrl + '/fallback/Contact', contactDetails, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),    observe: 'response'
    }
  ).pipe(
      map((response:any) => {
        // Handle successful response
        // alert( response.body)

        return response.body; // Return the body for normal subscribers
      }),
      catchError(error => {
        const connectionHeader = error;
        alert(connectionHeader);
        if (connectionHeader === 'close') {
          alert('The server has closed the connection.');
        } else if (!navigator.onLine) {
          alert('Connection is closed. Please check your internet connection.');
        } else {
          alert('An error occurred: ' + (error.message || 'Unknown error'));
        }
        return throwError(error); // Re-throw the error after handling it
      })
    );;
  }
  getNextCoordinator(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/sales-coordinator/next-coordinator`);
  }


}
