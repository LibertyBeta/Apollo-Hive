import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { routing,appRoutingProviders } from './app.routing';
import { ApolloModule, defaultApolloClient, ApolloQueryObservable } from 'angular2-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { AppComponent } from './app.component';
import { HiveComponent } from './hive/hive.component';
import { BeeComponent } from './bee/bee.component';
import { QueenComponent } from './queen/queen.component';
import { HiveDetailsComponent } from './hive-details/hive-details.component';
import { EmptyComponent } from './empty/empty.component';
import { HiveListComponent } from './hive-list/hive-list.component';

import { ChildWatchService } from './services/child-watch.service'

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/graphql')
});

@NgModule({
  declarations: [ AppComponent, HiveComponent, BeeComponent, QueenComponent, HiveDetailsComponent, EmptyComponent, HiveListComponent ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule,
  ],
  providers: [ appRoutingProviders,defaultApolloClient(client) ,ChildWatchService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
