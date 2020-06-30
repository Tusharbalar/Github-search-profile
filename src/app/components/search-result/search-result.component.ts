import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as CONST from "../../constants";
import { GithubSearchService } from 'src/app/services/github-search.service';

@Component({
  selector: 'github-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnChanges {

  @Input() selectedUser: any;
  userCreationDate: any;
  isUserNotFound: boolean = false;
  userInfo = null;

  constructor(private githubSerachService: GithubSearchService) { }

  ngOnInit() {
       
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      if (change && change.currentValue) {
        this.selectedUser = change.currentValue;
        this.userCreationDate = new Date(this.selectedUser.created_at).toLocaleDateString();
        this.checkIfUserFoundOrNot(); 
      }
      console.log('aaaa', change);
    }
    // changes.prop contains the old and the new value...
  }

  checkIfUserFoundOrNot() {
    if (this.selectedUser.status == 404) {
      this.selectedUser = null;
      this.isUserNotFound = true;
    } else {
      this.isUserNotFound = false;
    }
  }

}
