import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, Workspace } from '../api-interface/product.model';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})

export class WorkspaceService {
  orderAmount: any;
  spaceId:any;
  city: any;
  productId: any;
  plans: any;
  planName:any;
  userName: any;
  email: any;
  isLoggedIn: boolean = false;
  token: any;
  selectedTenureYr: number = 1;
  addons: any;
  addons_S: any;
  addonTotal: number = 0;
  discountedPrice: number = 0;
  selectedPlan: any = '';
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;



  getSpaceById(id: any) {
    return this.httpClient.get(
      `${this.apiUrl}/workspaces/${id}`
    );
  }

  getOrderById(id: any) {
    return this.httpClient.get(
      `${this.apiUrl}/cashfree/getOrder/${id}`
    );
  }

  getPay(id: any) {
    return this.httpClient.get(
      `${this.apiUrl}/cashfree/Pay/${id}`
    );
  }
  getRenewPay(id: any) {
    return this.httpClient.get(
      `${this.apiUrl}/cashfree/RenewPay/${id}`
    );
  }

  items = [];

  createTransaction(data: any): Observable<any> {
    const url = `${this.apiUrl}/cashfree/makePayment`;
    return this.httpClient.post(url, data);
  }
  createTransactionForPay(data: any): Observable<any> {
    const url = `${this.apiUrl}/cashfree/Pay`;
    return this.httpClient.post(url, data);
  }
  createTransactionForRenewPay(data: any): Observable<any> {
    const url = `${this.apiUrl}/cashfree/RenewPay`;
    return this.httpClient.post(url, data);
  }

  initiateBooking(booking: any): Observable<any> {
    const url = `${this.apiUrl}/booking`;
    return this.httpClient.post<any>(url, booking);
  }


  deleteBooking(customerEmail: string, orderId: string): Observable<any> {
    const url = `${this.apiUrl}/cashfree/${customerEmail}/${orderId}`;
    return this.httpClient.delete<any>(url);
  }

  searchData(
    size: number,
    city: string,
    state: string,
    page: number
  ): Observable<Page<Workspace>> {
    const url = `${this.apiUrl}/workspaces/search`;

    const params = new HttpParams()
      .set('size', size.toString())
      .set('city', city)
      .set('state', state)
      .set('page', page.toString());

    return this.httpClient.get<Page<Workspace>>(url, { params });
  }

  getRecentlyAddedWorkspaces(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/workspaces/recentlyAdded`);
  }
  createOrder(order: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/rzpay/order`,order, httpOptions);
  }
  updateOrder(order: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/rzpay/order`, order, httpOptions);
  }

}
