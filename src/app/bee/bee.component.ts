import { Component, OnInit, Input } from '@angular/core';
// import {NgClass} from '@angular/common';

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
  constructor() {
    super()
  }

  ngOnInit() {
    // console.log(this.bee);
  }

}
