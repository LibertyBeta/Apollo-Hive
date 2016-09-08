import { Component, OnInit, Input } from '@angular/core';
import {NgClass} from '@angular/common';

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

// @Component({
//   selector: 'app-bee-admin',
//   templateUrl: 'bee.component.html',
//   styleUrls: ['bee.component.scss']
// })
// export class BeeAdminComponent extends BeeComponent implements OnInit {
//   @Input() bee:any;
//   constructor() {
//     super()
//   }
//
//   ngOnInit() {
//     // console.log(this.bee);
//   }
//
// }
