import { Component, OnInit, OnDestroy } from '@angular/core';
import { GithubSearchService } from 'src/app/services/github-search.service';
import { Observable, throwError, Subject, pipe, Subscription } from 'rxjs';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  userInfo = null;
  subscription: Subscription;

  constructor(private githubSerachService: GithubSearchService) {
    

  }

  ngOnInit() {
    this.subscription = this.githubSerachService.userInfo.subscribe(userInfo => {
      this.userInfo = userInfo;
    })
  }

  setUserInfo(userInfo: any) {
    this.userInfo = userInfo;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
