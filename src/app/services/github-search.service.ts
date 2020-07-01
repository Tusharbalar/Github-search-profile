import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  baseURL = environment.baseURL;
  public userInfo = new Subject<string>();

  constructor(private http: HttpClient) { }

  getUserInfo(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}`);
  }

  getUserRepos(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}/repos`);
  }

  setUserInfo(userInfo: any) {
    this.userInfo.next(userInfo);
  }

  showNoUserFoundSection() {

  }
}
