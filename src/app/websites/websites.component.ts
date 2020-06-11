import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Website } from '../models/website';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  displayedColumns: string[] = ['url', 'weeklyScanDay', 'scanSchedule', 'addedDate', 'lastScanned', 'customerId'];
  data: Website[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getWebsites()
    .subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
