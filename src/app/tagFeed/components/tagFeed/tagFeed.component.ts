import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";
import { FeedTogglerComponent } from "src/app/shared/components/feedToggler/feedToggler.component";
import { PopularTagsComponent } from "src/app/shared/components/popularTags/popularTags.component";

@Component({
  selector: 'mc-tag-feed',
  templateUrl: './tagFeed.component.html',
  standalone: true,
  imports: [
    BannerComponent,
    FeedTogglerComponent,
    FeedComponent,
    PopularTagsComponent,
  ]
})
export class TagFeedComponent {
  apiUrl = '';
  tagName = '';


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.tagName = params['slug'];
      this.apiUrl = `/articles?tag=${this.tagName}`;
    })
  }
}