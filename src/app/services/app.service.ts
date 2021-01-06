import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserAssessment} from '../models/userassessments.model';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getUserAssessments(): Observable<UserAssessment[]> {
    return this.http.get<UserAssessment[]>(`${environment.apiBaseUrl}/userassessments`);
  }
}
