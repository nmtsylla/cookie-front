import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-website-add',
  templateUrl: './website-add.component.html',
  styleUrls: ['./website-add.component.css']
})
export class WebsiteAddComponent implements OnInit {

  websiteForm: FormGroup;
  isLoadingResults = false;
  weeklyScanDayList = [{id: 1, name: 'Weekly'}, {id: 2, name: 'Daily'}];
  scanScheduleList = [{id: 0, name: 'Monday'}, {id: 1, name: 'Tuesday'}, {id: 2, name: 'Wednesday'}];
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.websiteForm = this.formBuilder.group({
      url : [null, Validators.required],
      weeklyScanDay : [null, Validators.required],
      scanSchedule : [null, Validators.required],
      customerId : [null, Validators.required],
      addedDate : [null]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addWebsite(this.websiteForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/websites-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
