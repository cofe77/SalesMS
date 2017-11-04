import {Component, OnInit, EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }

  ngOnInit() {

  }




  ngOnDestroy(){
    $.cookie('idCheck', null);
    $.cookie('operatorInfo' ,null);
  }

}
