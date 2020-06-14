import { Component, OnInit } from '@angular/core';
import { Website } from 'src/app/models/website';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  displayedColumns: string[] = ['url', 'weeklyScanDay', 'scanSchedule', 'addedDate'];
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
