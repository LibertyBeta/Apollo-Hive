import { Component, OnInit, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hive',
  templateUrl: 'hive.component.html',
  styleUrls: ['hive.component.scss']
})
export class HiveComponent implements OnInit {
  @Input() hive;
  constructor() { }

  ngOnInit() {
  }

}
