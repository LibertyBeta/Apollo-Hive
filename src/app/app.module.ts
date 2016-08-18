import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { ApolloModule, defaultApolloClient, ApolloQueryObservable } from 'angular2-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

import { AppComponent } from './app.component';

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:8080/graphql')
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ApolloModule,
  ],
  providers: [ defaultApolloClient(client) ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
