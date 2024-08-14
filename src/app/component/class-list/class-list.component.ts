import { Component, OnInit } from '@angular/core';
import { ClassDataService } from '../../service/online-class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.css'
})
export class ClassListComponent implements OnInit {
  classData: any[] = [];

  constructor(private classDataService: ClassDataService) {}

  ngOnInit(): void {
    this.classDataService.getClassData().subscribe(data => {
      this.classData = data;
    });
  }
}
