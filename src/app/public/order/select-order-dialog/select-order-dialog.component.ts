import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {MdDialogRef} from "@angular/material";
import {DeskService} from "../../../service/desk.service";

@Component({
  selector: 'app-select-order-dialog',
  templateUrl: './select-order-dialog.component.html',
  styleUrls: ['./select-order-dialog.component.css'],
  providers:[OrderService,DeskService]
})
export class SelectOrderDialogComponent implements OnInit {
  recentOrders:Array<any>;
  allDesks:Array<any>;
  searchData;
  orderData:Array<any>;
  orderPageArray:Array<any>;
  orderPage:number=1;
  currentOrderPage:number=1;
  orderCount:number;
  orderInitIsFinished:boolean=false;
  constructor(
    public orderService:OrderService,
    public deskService:DeskService,
    public toastr:ToastrService,
    public dialogRef:MdDialogRef<SelectOrderDialogComponent>
  ) { }

  ngOnInit() {
    this.deskService.getAllOldDesks({}).subscribe((res)=>{
      this.allDesks=res.slice(1);
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  initOrderInfo(page){
    var data={
      "row":6,
      "page":parseInt(page),
      "dateValue":this.searchData
    };
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

  searchOrder(start){
    var nDate=new Date();
    var endTime=nDate.getTime();
    nDate.setMinutes(nDate.getMinutes()-start);
    var startTime=nDate.getTime();
    this.searchData={
      "timeName":'finishedTime',
      "timeStart":startTime,
      "timeEnd":endTime
    };
    this.initOrderInfo(1);
  }

  selectOrderConfirm(id){
    this.dialogRef.close(id);
  }

}
