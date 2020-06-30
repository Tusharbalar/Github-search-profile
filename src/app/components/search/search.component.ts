import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewChecked {

  @ViewChild("username", { static: true }) input: ElementRef;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  ngAfterViewChecked() {
    this.input.nativeElement.focus();
  }

  onSave() {

  }

}