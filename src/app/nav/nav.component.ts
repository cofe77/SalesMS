import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentDate;
  operatorName;
  operatorType;
  currentDateSettimeInterval;

  constructor() {
    this.currentDateSettimeInterval=setInterval(()=>this.showTime(),1000)
  }

  ngOnInit() {
    this.operatorName=JSON.parse($.cookie('operatorInfo'))['name']
    this.operatorType=JSON.parse($.cookie('operatorInfo'))['permission']

  }

  showTime(){
    this.currentDate=new Date().getTime();
}

  ngOnDestroy(){
  if(this.currentDateSettimeInterval){
    clearInterval(this.currentDateSettimeInterval);
  }
}

}
