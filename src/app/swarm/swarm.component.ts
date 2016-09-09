import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChildWatchService} from "../services/child-watch.service";
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subject } from "rxjs/Subject";
import gql from 'graphql-tag';
@Component({
  selector: 'app-swarm',
  templateUrl: 'swarm.component.html',
  styleUrls: ['swarm.component.scss']
})
export class SwarmComponent implements OnInit {
  hiveId: Subject<string> = new Subject<string>();
  hiveIdStatic:string;
  swarmQuery: any;
  swarm: any = {
    queen:{
      id:"",
      inceptDate: "",
      notes: []
    },
    bees:[]
  };
  constructor(private route: ActivatedRoute, private childWatcher: ChildWatchService, private angularApollo: Angular2Apollo) {
    this.swarmQuery = angularApollo.watchQuery({
      query: gql`
        query getSwarm($hiveId: String)
          {
            swarm(id:$hiveId){
              queen{
                id
                inceptDate
                notes
              }
              bees{
                id
                producing
                inceptDate
              }
            }
          }
      `,
      variables: {
        hiveId: this.hiveId
      },
      forceFetch: true,
      returnPartialData: true,
      pollInterval: 20000,
    });

    this.swarmQuery.subscribe((event)=>{
      if(!event.loading){
        this.swarm = event.data.swarm;
      }
    })
  }

  ngOnInit() {
    this.title = 'app works! for now';

    this.route.params.subscribe(params => {
      this.childWatcher.sendToParent(this.route.parent.component.name, params['id']);
      this.hiveId.next(params['id'].toString());
      this.hiveIdStatic = params['id'].toString();
      console.log(this.hiveId);
    });
  }

  purgeSwarm(){
    this.angularApollo.mutate({
      mutation: gql`
        mutation purgeSwarm($id:String){
          purgeSwarm(id:$id){
            id
            inceptDate
            producing
          }
        }
        `
      ,
      variables:{
        id: this.hiveIdStatic
      }
    }
    ).then((res)=>{
      const { data } = res;
      this.swarm.bees = data.purgeSwarm;
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
