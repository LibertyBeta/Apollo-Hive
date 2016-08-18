import { Component } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import 'rxjs';

import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  posts: any[] = [];
  constructor(private angularApollo : Angular2Apollo) {
    angularApollo.query({
      query: gql`
        query getPosts($tag: String) {
          posts(tag: $tag) {
            title
          }
        }
      `,
      variables: {
        tag: '1234'
      }
    })
      .then(({ data }) => {
        this.posts = data;
      });
  }
  title = 'app works! for now';
}
