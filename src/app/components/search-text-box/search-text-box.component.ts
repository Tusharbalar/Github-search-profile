import { Component, OnInit,ViewChild, ElementRef, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GithubSearchService } from 'src/app/services/github-search.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'github-search-text-box',
  templateUrl: './search-text-box.component.html',
  styleUrls: ['./search-text-box.component.scss']
})
export class SearchTextBoxComponent implements OnInit, AfterViewChecked {

  @ViewChild("username", { static: true }) input: ElementRef;
  @Output() userInfo = new EventEmitter();

  formGroup: FormGroup;
  isAPIRunning: boolean = false;
  oldValue: string = null; // Used for prevent unncessary API call

  constructor(private fb: FormBuilder,
              private githubSearchService: GithubSearchService) {
  }

  ngOnInit() {
    this.initForm();
  }

  // Initialize the form
  initForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  // Focus in textbox
  ngAfterViewChecked() {
    this.input.nativeElement.focus();
  }

  onSearch() {
    const username = this.formGroup.value && this.formGroup.value.username;
    if (!this.isAPIRunning && this.formGroup.valid && this.oldValue != username) {
      this.isAPIRunning = true;
      this.oldValue = username;
      forkJoin([this.githubSearchService.getUserInfo(username),
                this.githubSearchService.getUserRepos(username)]).subscribe(res => {
        this.handleResponse(res);
      }, (err) => {
        this.handleError(err);
      });
    }
  }

  handleResponse(userInfo: any) {
    this.isAPIRunning = false;
    let topFiveRepos = userInfo[1].sort((a, b) => {
      return b.stargazers_count-a.stargazers_count
    }).slice(0, 5);
    this.userInfo.emit({userInfo: userInfo[0], topFiveRepos: topFiveRepos});
  }

  handleError(err: any) {
    this.isAPIRunning = false;
    this.userInfo.emit({error: err});
  }

  resetEverything() {
    this.formGroup.reset();
    this.isAPIRunning = false;
    this.userInfo.emit(null);
  }

}
