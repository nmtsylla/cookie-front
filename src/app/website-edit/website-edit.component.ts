import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteForm: FormGroup;
  websiteId: null;
  isLoadingResults = false;
  scanScheduleList = ['weekly', 'daily'];
  weeklyScanDayList = [{id: 0, name: 'Monday'}, {id: 1, name: 'Tuesday'}, {id: 2, name: 'Wednesday'}];
  matcher = new MyErrorStateMatcher();
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getWebsiteById(this.route.snapshot.params.id);
    this.websiteForm = this.formBuilder.group({
      url : [null, Validators.required],
      weeklyScanDay : [null, Validators.required],
      scanSchedule : [null, Validators.required],
      customerId : [null, Validators.required]
    });
  }

  getWebsiteById(id: any) {
    this.api.getWebsiteById(id).subscribe((data: any) => {
      this.websiteId = data.id;
      this.websiteForm.setValue({
        url: data.url,
        weeklyScanDay: data.weeklyScanDay,
        scanSchedule: data.scanSchedule,
        customerId: data.customerId
      });
    });
  }

}
