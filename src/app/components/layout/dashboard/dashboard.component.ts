import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../services/app.service';
import {UserAssessment} from '../../../models/userassessments.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {UserAssessmentGraph} from '../../../models/userassessmentGraph.model';
import {Router} from '@angular/router';
import {User} from '../../../models/user.model';
import {userObj} from '../../../shared/get-logged-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userAssessments: UserAssessment[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    {data: [], label: 'User Assessment Bar Chart'}
  ];
  loggedUser?: User;

  constructor(private appService: AppService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loggedUser = userObj();
    this.onGetUserAssessments();
  }

  onGetUserAssessments(): void {
    this.appService.getUserAssessments().subscribe((userAssessments: UserAssessment[]) => {
      this.userAssessments = userAssessments;
      this.onGetUserAssessmentGraph(this.userAssessments[0].id);
    }, (errors: HttpErrorResponse) => {
      console.log('errors', errors);
    });
  }

  onGetUserAssessmentGraph(id: number): void {
    this.appService.getUserAssessmentGraph(id).subscribe((userAssessmentGraph: UserAssessmentGraph) => {
      this.prepareBarChartData(userAssessmentGraph);
    }, (errors: HttpErrorResponse) => {
      console.log('errors', errors);
    });
  }

  goToUsers(): void {
    this.router.navigate([`/app/users`]);
  }

  onLogout(): void {
    localStorage.clear();
    this.router.navigate([`/auth/login`]);
  }

  private prepareBarChartData(userAssessmentGraph: any): void {
    const barChartData = [];
    this.barChartLabels = [];
    for (const graphData in userAssessmentGraph.data) {
      if (graphData) {
        this.barChartLabels.push(graphData);
        barChartData.push(userAssessmentGraph.data[graphData]);
      }
    }
    this.barChartData = [
      {data: barChartData, label: 'User Assessment Bar Chart'}
    ];
  }
}
