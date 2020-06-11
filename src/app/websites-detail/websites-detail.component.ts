import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from '../api.service'
import { Website } from '../models/website'
@Component({
  selector: 'app-websites-detail',
  templateUrl: './websites-detail.component.html',
  styleUrls: ['./websites-detail.component.css']
})
export class WebsitesDetailComponent implements OnInit {
  website: Website = {
    id: null,
    url: '',
    weeklyScanDay: null,
    scanSchedule: null,
    customerId: null,
    lastScanned: null,
    addedDate: null,
    active: true
  }
  isLoadingResults = true;
  constructor (
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit (): void {
    this.getWebsiteDetails(this.route.snapshot.params.id);
  }

  getWebsiteDetails(id: number) {
    this.api.getWebsiteById(id).subscribe((data: any) => {
      this.website = data;
      console.log(this.website);
      this.isLoadingResults = false;
    })
  }

  deleteWebsite(id: any) {
    this.isLoadingResults = true;
    this.api.deleteWebsite(id).subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/websites']);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    )
  }
}
