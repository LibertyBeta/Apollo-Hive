import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ChildWatchService} from "../services/child-watch.service";
import 'rxjs';
import { Subscription }       from 'rxjs/Subscription';
import { Observable }       from 'rxjs/Observable';
import gql from 'graphql-tag';

@Component({
  selector: 'app-hive-list',
  templateUrl: 'hive-list.component.html',
  styleUrls: ['hive-list.component.scss']
})
export class HiveListComponent implements OnInit {

  private title: string = 'Loading...';
  private hives: Array<any> = Array<any>();
  private focus: number;
  private showAll:boolean = true;
  private sub: Observable<any>;
  constructor(private angularApollo: Angular2Apollo,  private childWater: ChildWatchService) {
    this.sub = childWater.registerParent('HiveListComponent');
    angularApollo.query({
      query: gql`
      {
        hives{
          id
          name

          harvests{
            collectedOn
          }
          queen{
            id
            inceptDate
          }
          lastCollection
          bees{
            id
            inceptDate
            producing
          }
        }
      }
      `,
      variables: {

      }
    })
      .then(({ data }) => {
        console.log(data);
        console.log(typeof data);
        this.hives = data.hives;
      });



  }

  ngOnInit() {
    this.title = 'app works! for now';
    console.log(this.sub);
    this.sub.subscribe(value=>{
      console.log(value);
    });
  }

}
