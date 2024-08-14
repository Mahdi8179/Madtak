import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  users: any[] = [];

  data: any;

  constructor(private httpClient: HttpClient,private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.httpClient.get('https://api.madtalk.ir/api/v1.0.0/management/school/all_data/').subscribe(
      (response: any) => {
        this.data = response;
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  goOnlineClass(){
    this.router.navigate(['/class-list']);
  }
}
