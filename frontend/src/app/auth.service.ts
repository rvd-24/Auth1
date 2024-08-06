import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<string> {
    return this.http.get('/.auth/me').pipe(
      map((response: any) => {
        if (response && response.length > 0 && response[0].access_token) {
          console.log("Access token",response[0].access_token)
          return response[0].access_token;
        }
        throw new Error('Access token not found');
      })
    );
  }
}