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
  noUserFound: boolean = false;
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
    }
  }

  checkIfUserFoundOrNot() {
    console.log(this.selectedUser)
    if (this.selectedUser.status == 404) {
      this.selectedUser = false;
      this.noUserFound = true;
    } else {
      this.noUserFound = false;
    }
  }

}
