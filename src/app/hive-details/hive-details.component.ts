import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildWatchService} from "../services/child-watch.service";
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subject } from "rxjs/Subject";

import gql from 'graphql-tag';
import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';

@Component({
  selector: 'app-hive-details',
  templateUrl: 'hive-details.component.html',
  styleUrls: ['hive-details.component.scss']
})
export class HiveDetailsComponent implements OnInit {
  hiveId: Subject<string> = new Subject<string>();
  hiveQuery: any;
  queenId: string;
  hive:any ={
    location:{
      lat:0,
      lng:0,
    },
    queen:{
      id: null,
    }

    name:""
  };

  constructor(private route: ActivatedRoute, private childWatcher: ChildWatchService, private angularApollo: Angular2Apollo) {
    console.log(route.parent.component.name);

    this.hiveQuery = angularApollo.watchQuery({
      query: gql`
        query getHive($id: String)
          {
            hive(id:$id){
              id
              name
              harvests{
                collectedOn
              }
              queen{
                id
              }
              lastCollection
              location{
                lat
                lng
              }
              bees{
                id
                inceptDate
                producing
              }
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

    this.hiveQuery.subscribe((event)=>{
      if(!event.loading){
        this.hive = event.data.hive;
        this.queenId = event.data.hive.queen[0].id;
        console.log(event.data.hive);
      }
      console.log(event);
      // console.log(this.hiveId);

      //
    })

  }

  ngOnInit() {
      this.title = 'app works! for now';

      this.route.params.subscribe(params => {
        this.childWatcher.sendToParent(this.route.parent.component.name, params['id']);
        this.hiveId.next(params['id'].toString());
        console.log(this.hiveId);
      });
  }

}
