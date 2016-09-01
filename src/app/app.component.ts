import { Component, ViewEncapsulation } from '@angular/core';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import 'rxjs';
import gql from 'graphql-tag';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	posts: any[] = [];
	constructor(private angularApollo: Angular2Apollo) {
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
            insceptDate
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
				console.info(data);
			});
	}
	title = 'app works! for now';
}
