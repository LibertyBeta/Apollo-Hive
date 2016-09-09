import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Queen } from "../shared/queen";
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subject } from "rxjs/Subject";

import gql from 'graphql-tag';

@Component({
  selector: 'app-queen',
  templateUrl: 'queen.component.html',
  styleUrls: ['queen.component.scss']
})
export class QueenComponent implements OnInit, OnChanges {
  @Input() id:any;
  @Input() hiveName:any;
  queenId: Subject<string> = new Subject<string>();
  queenQuery: any;
  queen: Queen = {
    id:"",
    name:"",
    inceptDate: "",
    notes: [],
    stages: [],
  };
  constructor( private angularApollo: Angular2Apollo) { }

  ngOnInit() {
    this.queenQuery = this.angularApollo.watchQuery({
      query: gql`
        query getQueen($id: String)
          {
            queen(id:$id){
              id
              inceptDate
              notes
            }
          }
      `,
      variables: {
        id: this.queenId
      },
      forceFetch: true,
      returnPartialData: true,
      pollInterval: 20000,
    });

    this.queenQuery.subscribe((event)=>{
      if(!event.loading){
        this.queen = event.data.queen;
        console.info("Queen Id is", this.queenId);
        console.info("Queen is" , this.queen);
        // console.log(event.data.queen);
      }
      console.info(event);
      // console.log(this.hiveId);

      //
    })
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if(changes['id'].currentValue){
      this.queenId.next(changes['id'].currentValue)
    };
    console.info("changes" , changes);
  }
}
