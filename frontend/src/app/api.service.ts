import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../environments/environments';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,private authService: AuthService) { }

  getPublicData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}/public`, { headers: headers, withCredentials: true });
  }

  getPrivateData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(`${this.apiUrl}/private`, { headers: headers, withCredentials: true });
  }
  getUserInfo(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        console.log("Headers:",headers);
        return this.http.get(`${this.apiUrl}/api/user-info`, { headers:headers,withCredentials:true });
      })
    );
  }
}
