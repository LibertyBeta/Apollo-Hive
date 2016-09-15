import { Component, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import 'rxjs';
import gql from 'graphql-tag';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	private title: string = 'Loading...';
	private hives: Array<any> = Array<any>();
	private focus: string = '';
	private showAll:boolean = true;
	constructor() {

	}

	ngOnInit() {
		this.title = "loaded";
  }

}
