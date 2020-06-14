import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../utils/error-matcher';


@Component({
  selector: 'app-website-add',
  templateUrl: './website-add.component.html',
  styleUrls: ['./website-add.component.css']
})
export class WebsiteAddComponent implements OnInit {

  websiteForm: FormGroup;
  isLoadingResults = false;
  scanScheduleList = ['weekly', 'daily'];
  weeklyScanDayList = [{id: 0, name: 'Monday'}, {id: 1, name: 'Tuesday'}, {id: 2, name: 'Wednesday'}];
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.websiteForm = this.formBuilder.group({
      url : [null, Validators.required],
      weeklyScanDay : [null, Validators.required],
      scanSchedule : [null, Validators.required],
      customerId : [null, Validators.required],
      addedDate : [new Date(), ]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addWebsite(this.websiteForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/website-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
