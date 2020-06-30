import { Component, OnInit,ViewChild, ElementRef, AfterViewChecked, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GithubSearchService } from 'src/app/services/github-search.service';

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

    if (!this.isAPIRunning && this.formGroup.valid) {
      this.isAPIRunning = true;
      this.githubSearchService.getUserInfo(this.formGroup.value.username).subscribe((res: any) => {
        this.isAPIRunning = false;
        console.log('Res: ', res);
        this.githubSearchService.setUserInfo(res);
        this.changeRef.detectChanges();
      })
    }
  }

  clearSearchResult() {
    this.formGroup.reset();
    this.githubSearchService.setUserInfo(null);
  }

}
