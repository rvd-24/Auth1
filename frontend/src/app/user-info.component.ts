import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-user-info',
  template: `
    <button (click)="getUserInfo()">Get User Info</button>
    <div *ngIf="userInfo">
      <h2>User Information</h2>
      <p>Name: {{ userInfo.name }}</p>
    </div>
    <div *ngIf="error">
      {{ error }}
    </div>
  `
})
export class UserInfoComponent {
  userInfo: any;
  error: string = '';

  constructor(private apiService: ApiService) { }

  getUserInfo() {
    this.apiService.getUserInfo().subscribe(
      (data) => {
        this.userInfo = data;
        console.log("Data",data);
        this.error = '';
      },
      (error) => {
        this.error = 'Failed to fetch user information. Please ensure you are logged in.';
        console.error('Error fetching user info:', error);
        this.userInfo = null;
      }
    );
  }
}