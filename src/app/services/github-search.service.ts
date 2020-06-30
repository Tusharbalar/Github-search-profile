import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubSearchService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  getUserInfo(username: string) {
    return this.http.get(`${this.baseURL}/users/${username}`);
  }
}
