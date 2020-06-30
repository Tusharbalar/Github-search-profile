import { Component, OnInit,ViewChild, ElementRef, AfterViewChecked, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GithubSearchService } from 'src/app/services/github-search.service';
import * as CONST from "../../constants";

@Component({
  selector: 'github-search-text-box',
  templateUrl: './search-text-box.component.html',
  styleUrls: ['./search-text-box.component.scss']
})
export class SearchTextBoxComponent implements OnInit, AfterViewChecked {

  @ViewChild("username", { static: true }) input: ElementRef;
  @Input() showClearOption: boolean = false;
  @Output() userInfo = new EventEmitter();

  formGroup: FormGroup;
  isAPIRunning: boolean = false;
  showUserNotFoundSection: boolean = false;
  oldValue: string = null;

  constructor(private fb: FormBuilder,
              private changeRef: ChangeDetectorRef,
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
    // this.input.nativeElement.focus();
  }

  onSearch() {
    console.log("form val", this.formGroup.value);
    if (!this.isAPIRunning && this.formGroup.valid && this.oldValue != this.formGroup.value.username) {
      this.isAPIRunning = true;
      this.oldValue = this.formGroup.value.username;
      this.githubSearchService.getUserInfo(this.formGroup.value.username).subscribe((res: any) => {
        this.isAPIRunning = false;
        console.log('Res: ', res);
        this.githubSearchService.setUserInfo(res);
        this.changeRef.detectChanges();
      }, (err) => {
        this.handleError(err);
      })
    }
  }

  handleResponse() {

  }

  handleError(err: any) {
    console.log(err)
    this.isAPIRunning = false;
    this.showUserNotFoundSection = true;
    if (err.status == 404) {
      this.githubSearchService.setUserInfo(CONST.USER_NOT_FOUND);
    }
  }

  resetEverything() {
    this.formGroup.reset();
    this.isAPIRunning = false;
    this.githubSearchService.setUserInfo(null);
  }

}
