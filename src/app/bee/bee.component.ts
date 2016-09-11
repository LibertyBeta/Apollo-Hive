import { Component, OnInit, Input } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Subject } from "rxjs/Subject";

import gql from 'graphql-tag';

@Component({
  selector: 'app-bee',
  templateUrl: 'bee.component.html',
  styleUrls: ['bee.component.scss']
})
export class BeeComponent implements OnInit {
  @Input() bee:any;
  constructor() { }

  ngOnInit() {
    // console.log(this.bee);
  }

}

@Component({
  selector: 'app-bee-big',
  templateUrl: 'bee-big.component.html',
  styleUrls: ['bee-big.component.scss']
})
export class BeeBigComponent extends BeeComponent implements OnInit {
  @Input() bee:any;
  constructor(private angularApollo: Angular2Apollo) {
    super()
  }

  ngOnInit() {
    // console.log(this.bee);
  }

  killBee(id){
    this.angularApollo.mutate({
      mutation: gql`
        mutation killBee($id:String){
          killBee(id:$id)
        }
        `
      ,
      variables:{
        id: this.bee.id
      }
    }
    ).then((res)=>{
      this.bee.id = "DEAD BEE";
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
