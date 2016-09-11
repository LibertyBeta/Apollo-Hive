import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildWatchService} from "../services/child-watch.service";
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subject } from "rxjs/Subject";

import gql from 'graphql-tag';

@Component({
  selector: 'app-harvests',
  templateUrl: 'harvests.component.html',
  styleUrls: ['harvests.component.scss']
})
export class HarvestsComponent implements OnInit {
  harvests: any;
  harvestQuery: any;
  hiveId: Subject<string> = new Subject<string>();
  constructor(private route: ActivatedRoute, private childWatcher: ChildWatchService, private angularApollo: Angular2Apollo) { }

  ngOnInit() {

    this.harvestQuery = this.angularApollo.watchQuery({
      query: gql`
      query harvests($id:String){
        harvests(id:$id){
          id
          customer
          collectedOn
          amount
          quality
        }
      }
      `,
      variables: {
        id: this.hiveId
      },
      forceFetch: true,
      returnPartialData: true,
      pollInterval: 20000,
    });

    this.harvestQuery.subscribe((event)=>{
      if(!event.loading){
        this.harvests = event.data.harvests;
      }
    });

    this.route.params.subscribe(params => {
      this.childWatcher.sendToParent(this.route.parent.component.name, params['id']);
      this.hiveId.next(params['id'].toString());
    });
  }

}
