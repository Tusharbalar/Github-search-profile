import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GithubSearchService } from 'src/app/services/github-search.service';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewChecked {

  @ViewChild("username", { static: true }) input: ElementRef;

  formGroup: FormGroup;
  userInfo: any;

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
    console.log("form val", this.formGroup.value);
    this.githubSearchService.getUserInfo(this.formGroup.value.username).subscribe((res) => {
      console.log('Res: ', res);
      this.userInfo = res;
    })
  }

}
