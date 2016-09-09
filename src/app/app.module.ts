import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { routing,appRoutingProviders } from './app.routing';
import { ApolloModule, defaultApolloClient, ApolloQueryObservable } from 'angular2-apollo';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { AppComponent } from './app.component';
import { HiveComponent } from './hive/hive.component';
import { BeeComponent, BeeBigComponent } from './bee/bee.component';
import { QueenComponent } from './queen/queen.component';
import { HiveDetailsComponent } from './hive-details/hive-details.component';
import { EmptyComponent } from './empty/empty.component';
import { HiveListComponent } from './hive-list/hive-list.component';

import { ChildWatchService } from './services/child-watch.service';
import { SwarmComponent } from './swarm/swarm.component';


const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/graphql')
});

@NgModule({
  declarations: [
    AppComponent,
    HiveComponent,
    BeeComponent,
    BeeBigComponent,
    QueenComponent,
    HiveDetailsComponent,
    EmptyComponent,
    HiveListComponent,
    SwarmComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAydQXFOoZCCIJ5yh-Bs57p9ula3ekAtOY"
    }),
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule
  ],
  providers: [appRoutingProviders,defaultApolloClient(client), ChildWatchService],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
