import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {DeskService} from "../../../service/desk.service";
import {GoodsService} from "../../../service/goods.service";

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css'],
  providers:[OrderService,DeskService,GoodsService]
})
export class OrderDetailDialogComponent implements OnInit {
  order;
  orderItems;
  allGoods;
  orderId:number;
  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public orderService:OrderService,
    public deskService:DeskService,
    public goodsService:GoodsService,
    public toastr:ToastrService
  ) {
    this.goodsService.getAllOldGoods({}).subscribe((res)=>{
      this.allGoods=res.slice(1);
    },err=>err=>this.toastr.error('服务器错误！请稍后重试！'));
    this.orderId=this.dialogData['orderId'];
    this.orderService.getOldOrderById(this.orderId).subscribe((orderRes)=>{
      if(!!orderRes){
        this.order=orderRes;
        this.orderItems=orderRes['items'];
      }else{
        this.toastr.error('获取订单详情失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍后重试！'));
  }

  ngOnInit() {
  }
}
