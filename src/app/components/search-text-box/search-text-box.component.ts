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
    this.input.nativeElement.focus();
  }

  onSearch() {
    const username = this.formGroup.value && this.formGroup.value.username;
    if (!this.isAPIRunning && this.formGroup.valid && this.oldValue != username) {
      this.isAPIRunning = true;
      this.oldValue = username;
      this.githubSearchService.getUserInfo(username).subscribe((res: any) => {
        this.handleResponse(res);
      }, (err) => {
        this.handleError(err);
      });
    }
  }

  handleResponse(userInfo: any) {
    console.log('Res: ', userInfo);
    this.isAPIRunning = false;
    this.userInfo.emit(userInfo);
  }

  handleError(err: any) {
    this.isAPIRunning = false;
    this.showUserNotFoundSection = true;
    this.userInfo.emit(err);
  }

  resetEverything() {
    this.formGroup.reset();
    this.isAPIRunning = false;
    this.userInfo.emit(null);
  }

}
