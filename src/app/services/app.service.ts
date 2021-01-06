import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserAssessment} from '../models/userassessments.model';
import {UserAssessmentGraph} from '../models/userassessmentGraph.model';
import {UserForAdmin} from '../models/userForAdmin.model';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getUserAssessments(): Observable<UserAssessment[]> {
    return this.http.get<UserAssessment[]>(`${environment.apiBaseUrl}/userassessments`);
  }

  getUserAssessmentGraph(id: number): Observable<UserAssessmentGraph> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<UserAssessmentGraph>(`${environment.apiBaseUrl}/userassessment/graph`, {params});
  }

  getUsers(): Observable<UserForAdmin[]> {
    return this.http.get<UserForAdmin[]>(`${environment.apiBaseUrl}/users`);
  }
}
