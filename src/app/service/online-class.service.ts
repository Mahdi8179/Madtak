import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RunPlan {
  id: number;
  start_time: string;
  end_time: string;
  online_class: number;
  day: number;
}

interface ClassData {
  id: number;
  school_book_str: string;
  classroom_str: string;
  duration: number;
  name: string;
  run_plans: RunPlan[];
}

@Injectable({
  providedIn: 'root',
})
export class ClassDataService {
  private apiUrl = 'https://api.madtalk.ir/api/v1.0.0/online-class/list/?size=20&page=1&day=1';

  constructor(private http: HttpClient) {}

  getClassData(): Observable<ClassData[]> {
    return this.http.get<ClassData[]>(this.apiUrl);
  }
}
