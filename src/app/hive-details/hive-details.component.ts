import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildWatchService} from "../services/child-watch.service";

@Component({
  selector: 'app-hive-details',
  templateUrl: 'hive-details.component.html',
  styleUrls: ['hive-details.component.scss']
})
export class HiveDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private childWatcher: ChildWatchService) {
    console.log(route.parent.component.name);
  }

  ngOnInit() {
      this.title = 'app works! for now';
      this.route.params.subscribe(params => {
        this.childWatcher.sendToParent(this.route.parent.component.name, params['id']);
      });
  }

}
