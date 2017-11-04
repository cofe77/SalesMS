import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-for-admin',
  templateUrl: './menu-for-admin.component.html',
  styleUrls: ['./menu-for-admin.component.css']
})
export class MenuForAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(){
    $.cookie('idCheck', null);
    $.cookie('operatorInfo' ,null);
  }

}
