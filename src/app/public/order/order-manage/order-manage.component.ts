import { Component, OnInit } from '@angular/core';
import { MdDialogConfig, MdDialog} from "@angular/material";
import {VipDetailDialogComponent} from "../../vip/vip-detail-dialog/vip-detail-dialog.component";
import {OpratorDetailDialogComponent} from "../../../admin/oprator-manage/oprator-detail-dialog/oprator-detail-dialog.component";
import {OrderDetailDialogComponent} from "../order-detail-dialog/order-detail-dialog.component";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {listLocales} from "ngx-bootstrap/bs-moment";
import {OrderService} from "../../../service/order.service";
import {defineLocale} from "ngx-bootstrap";
import {zhCn} from "ngx-bootstrap/bs-moment/i18n/zh-cn";
import {ToastrService} from "ngx-toastr";
defineLocale('zh-cn',zhCn);

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css'],
  providers:[OrderService]
})
export class OrderManageComponent implements OnInit {
  locale = 'zh-cn';
  minDate: Date;
  maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;
  public bsRangeValue;
  orderData:Array<any>;
  orderPageArray:Array<any>;
  orderPage:number=1;
  currentOrderPage:number;
  orderCount:number;
  startTime:number=0;
  endTime:number=0;
  orderInitIsFinished:boolean=false;
  constructor(
    public dialog:MdDialog,
    public toastr:ToastrService,
    public orderService:OrderService
  ) {
    this.bsConfig = Object.assign({}, {locale: this.locale});
    this.minDate = new Date('2017/09/20');
    this.maxDate = new Date();
  }

  ngOnInit() {
    this.initOrderInfo(1)
  }

  initOrderInfo(page){
    var data;
    if(this.startTime==0&&this.endTime==0){
      data={
        "row":10,
        "page":parseInt(page)
      }
    }else{
      data={
        "row":10,
        "page":parseInt(page),
        "dateValue":{
          "timeName":'finishedTime',
          "timeStart":this.startTime,
          "timeEnd":this.endTime
        }
      }
    }
    this.currentOrderPage=page;
    this.orderService.getOldOrderByParams(data).subscribe(data=>{
      this.orderData=data.slice(1);
      this.orderCount=data[0]['count'];
      this.orderPage=Math.ceil(this.orderCount/12);
      var tempArray=[];
      for(var i=1;i<=this.orderPage;i++){
        tempArray.push(''+i);
      }
      this.orderPageArray=tempArray;
      this.orderInitIsFinished=true;
    });
  }

  searchOrder(orderNum){
    if(orderNum==''){
      return;
    }else{
      this.orderService.getOldOrderByParams({"serializtion":orderNum}).subscribe((res)=>{
        this.orderData=[{res}];
      },err=>this.toastr.error('服务器错误！请稍候重试！'));
    }
  }

  dailyOrder(){
    var startTim=new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    var endTim=new Date(new Date().setHours(23, 59, 59, 59)).getTime();
    this.startTime=startTim;
    this.endTime=endTim;
    this.initOrderInfo(1);
  }

  monthOrder(){
    var startTim=new Date(new Date(new Date().setDate(1)).setHours(0,0,0,0)).getTime();
    var endTim=new Date().getTime();
    this.startTime=startTim;
    this.endTime=endTim;
    this.initOrderInfo(1)
  }

  searchByTime(){
    var endDate=new Date(this.bsRangeValue[1]);
    var startTim=new Date(this.bsRangeValue[0]).getTime();
    endDate.setDate(endDate.getDate()+1);
    var endTim=endDate.getTime()-1000;
    this.startTime=startTim;
    this.endTime=endTim;
    this.initOrderInfo(1)
  }

  showVipDetail(id){
    this.dialog.open(VipDetailDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": false,
      "data": {
        "vipId": id
      }
    } as MdDialogConfig);
  }


  showOrderDetail(id){
    this.dialog.open(OrderDetailDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "750px",
      "height": "auto",
      "disableClose": false,
      "data": {
        "orderId":id
      }
    } as MdDialogConfig);
  }


}
