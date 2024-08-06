import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to My App and Auth</h1>
    <button (click)="callPublic()">Call Public</button>
    <button (click)="callPrivate()">Call Private</button>
    <h2>API Responses:</h2>
    <p>API 1: {{ publicResponse }}</p>
    <p>API 2: {{ privateResponse }}</p>
    <app-user-info></app-user-info>
  `,
  styles: []
})
export class AppComponent {
  publicResponse: string = 'Not called yet';
  privateResponse: string = 'Not called yet';

  constructor(private apiService: ApiService) {}

  callPublic() {
    this.apiService.getPublicData().subscribe(
      (data) => {
        console.log('Public response:', data);
        this.publicResponse = JSON.stringify(data);
      },
      (error) => {
        console.error('Error calling API 1:', error);
        this.publicResponse = 'Error occurred';
      }
    );
  }

  callPrivate() {
    this.apiService.getPrivateData().subscribe(
      (data) => {
        console.log('Private response:', data);
        this.privateResponse = JSON.stringify(data);
      },
      (error) => {
        console.error('Error calling API 2:', error);
        this.privateResponse = 'Error occurred';
      }
    );
  }
}