import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {UserAssessment} from '../../../models/userassessments.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userAssessments: UserAssessment[] = [];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.onGetUserAssessments();
  }

  onGetUserAssessments(): void {
    this.appService.getUserAssessments().subscribe((userAssessments: UserAssessment[]) => {
      this.userAssessments = userAssessments;
    }, (errors: HttpErrorResponse) => {
      console.log('errors', errors);
    });
  }

}
