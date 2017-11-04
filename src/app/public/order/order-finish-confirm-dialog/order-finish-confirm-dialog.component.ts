import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {OrderPaymentConfirmDialogComponent} from "../order-payment-confirm-dialog/order-payment-confirm-dialog.component";
import {SelectVipDialogComponent} from "../../vip/select-vip-dialog/select-vip-dialog.component";
import {ScanQRCodeComponent} from "../../wine/scan-qrcode/scan-qrcode.component";
import {SelectSavedBeerComponent} from "../../wine/select-saved-beer/select-saved-beer.component";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {GoodsService} from "../../../service/goods.service";
import {SaveBeerDialogComponent} from "../../wine/save-beer-dialog/save-beer-dialog.component";

@Component({
  selector: 'app-order-finish-confirm-dialog',
  templateUrl: './order-finish-confirm-dialog.component.html',
  styleUrls: ['./order-finish-confirm-dialog.component.css'],
  providers:[OrderService,GoodsService]
})
export class OrderFinishConfirmDialogComponent implements OnInit {

  orderFinishIsLoading=true;
  savedBeersId;
  savedBeersTitle;
  savedBeersItems;
  allGoods;
  public order;
  orderId:number;
  orderTotalPrice:number=0;
  deskId:number;
  vip;
  vipId:number=0;
  vipBalance:number=0;
  vipDisCount:number=1;
  vipSavedBeer:boolean=false;
  orderItems;
  preOrderItems;
  orderAddItems;
  beUsedSavedBeer:Array<any>;
  totalSavedBeerDeduct:number=0;
  amountReceivable:number=0;

  constructor(
    public dialog:MdDialog,
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public orderService:OrderService,
    public goodsService:GoodsService,
    public toastr:ToastrService,
    public dialogRef:MdDialogRef<OrderFinishConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.orderId=this.dialogData['orderId'];
    this.deskId=this.dialogData['deskId'];
    this.orderItems=this.dialogData['goodsItems'];
    this.orderAddItems=this.dialogData['orderAddItems'];
    this.preOrderItems=this.dialogData['goodsItems'];
    this.orderService.getUserOrderById(this.orderId).subscribe((res)=>{
      this.order=res;
      this.amountReceivable=parseFloat(res['totalPrice']);
      this.orderTotalPrice=parseFloat(res['totalPrice']);
      this.orderFinishIsLoading=false;
    },err=>this.toastr.error('获取订单详情失败！'));
    this.goodsService.getAllOldGoods({}).subscribe(
      (data)=>{
        this.allGoods=data.slice(1);
        this.orderFinishIsLoading=false;
      }
    );

  }


  initOrderItemsWithSavedBeer(currentSavedBeerItems){
    this.savedBeersItems=currentSavedBeerItems;
    var currentItems=$.extend(true,[],this.preOrderItems);
    var preItem;
    for(var i in currentItems){
      preItem=currentItems[i];
      for(var j in currentSavedBeerItems){
        if(currentSavedBeerItems[j]['goodsId']==preItem['goodsId']){
          currentItems[i]=$.extend({},preItem,currentSavedBeerItems[j]);
        }
      }
    }
    this.orderItems=currentItems;
    this.orderFinishIsLoading=false;
  }

  isUseSavedBeer(e,itemId,itemCount,savedBeerCount,goodsId,savedBeersId){
    var preTotalPriceEle=e.target.parentNode.parentNode.children[4];
    var prePriceEle=e.target.parentNode.parentNode.children[1];
    var prePrice=preTotalPriceEle.children[0];
    var alreadyHaveBeUsedSavedBeer=false;
    var alreadyHaveBeUsedSavedBeerIndex;
    var reduceCount=itemCount>=savedBeerCount?savedBeerCount:itemCount;
    var reducePrice=reduceCount*parseFloat($(prePriceEle).text().replace(/,/g,""));
    for(var i in this.beUsedSavedBeer){
      if(this.beUsedSavedBeer[i]['goodsId']==goodsId){
        alreadyHaveBeUsedSavedBeer=true;
        alreadyHaveBeUsedSavedBeerIndex=i;
      }
    }
    if(e.target.value==1){    //使用存酒
      $(prePrice).html('-'+reducePrice.toFixed(2));
      if(!alreadyHaveBeUsedSavedBeer){
        this.beUsedSavedBeer.push({
          "count":-parseInt(reduceCount),
          "goodsId":goodsId,
          "itemId":itemId,
          "savedBeersItemId":savedBeersId
        });
        this.totalSavedBeerDeduct+=reducePrice;
      }
    }else{                    //不使用存酒
      $(prePrice).html('');
      if(alreadyHaveBeUsedSavedBeer){
        this.beUsedSavedBeer.splice(alreadyHaveBeUsedSavedBeerIndex,1);
        this.totalSavedBeerDeduct-=reducePrice;
      }
    }
    this.amountReceivable=this.orderTotalPrice-this.totalSavedBeerDeduct;
  }

  orderDetailConfirm(){
    var orderData;
    if(!!this.savedBeersId){
      orderData={
        "orderId":this.orderId,
        "vipId":this.vipId,
        "isDedcute":true,
        "deskId":this.deskId,
        "operatorId":1,
        "savedBeersId":this.savedBeersId,
        "savedBeersGoods":this.beUsedSavedBeer
      }
    }else{
      orderData={
        "orderId":this.orderId,
        "vipId":this.vipId,
        "deskId":this.deskId,
        "operatorId":1
      }
    }
    let orderPaymentConfirmDialogRef=this.dialog.open(OrderPaymentConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "付款方式确认",
        "vipId":this.vipId,
        "vipBalance":this.vipBalance,
        "amountReceivable":this.amountReceivable,
        "orderId":this.orderId,
        "vipDisCount":this.vipDisCount,
        "orderData":orderData
      }
    } as MdDialogConfig);
    orderPaymentConfirmDialogRef.afterClosed().subscribe((res)=>{

    })
  }

  selectVIP(){
    let selectVipDialogRef=this.dialog.open(SelectVipDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {

      }
    } as MdDialogConfig);
    selectVipDialogRef.afterClosed().subscribe((data)=>{
      this.orderFinishIsLoading=true;
      if(!!data){
        this.beUsedSavedBeer=[];
        this.vip=data;
        this.vipId=data['id'];
        this.vipSavedBeer=true;
        this.savedBeersId=data['savedBeersId'];
        this.vipBalance=parseFloat(data['balance']);
        this.vipDisCount=parseFloat(data['vipType']['discount']);
        this.amountReceivable=this.orderTotalPrice;
        this.totalSavedBeerDeduct=0;
        this.savedBeersTitle='会员存酒';
        this.initOrderItemsWithSavedBeer(data['savedBeers']);
      }
      this.orderFinishIsLoading=false;
    });
  }

  scanSavedBeerQRCode(){
    let scanQRCodeRef=this.dialog.open(ScanQRCodeComponent,{
      'panelClass': 'custom-overlay-pane-class',
      'hasBackdrop': true,
      'width': '400px',
      'height': 'auto',
      'disableClose': true,
      'data': {'title':'二维码扫描','content':'请使用扫码枪扫描二维码！'}
    } as MdDialogConfig);
    scanQRCodeRef.afterClosed().subscribe(result=>{
      this.orderFinishIsLoading=true;
      if(!!result){
        this.beUsedSavedBeer=[];
        this.savedBeersId=result['id'];
        this.amountReceivable=this.orderTotalPrice;
        this.totalSavedBeerDeduct=0;
        this.vipSavedBeer=false;
        this.savedBeersTitle='存酒单号：'+result['keyCode'];
        this.initOrderItemsWithSavedBeer(result['savedBeersItem']);
      }else{
        this.orderFinishIsLoading=false;
      }
    })
  }

  searchSavedBeer(){
    let selectSavedBeerRef=this.dialog.open(SelectSavedBeerComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {

      }
    } as MdDialogConfig);
    selectSavedBeerRef.afterClosed().subscribe(result=>{
      this.orderFinishIsLoading=true;
      if(!!result){
        this.beUsedSavedBeer=[];
        this.savedBeersId=result['id'];
        this.amountReceivable=this.orderTotalPrice;
        this.totalSavedBeerDeduct=0;
        this.vipSavedBeer=false;
        this.savedBeersTitle='存酒单号：'+result['keyCode'];
        this.initOrderItemsWithSavedBeer(result['savedBeersItem']);
      }else{
        this.orderFinishIsLoading=false;
      }
    })
  }

  useVipSavedBeer(){
    this.orderFinishIsLoading=true;
    this.beUsedSavedBeer=[];
    this.savedBeersId=this.vip['savedBeersId'];
    this.amountReceivable=this.orderTotalPrice;
    this.totalSavedBeerDeduct=0;
    this.savedBeersTitle='会员存酒';
    this.vipSavedBeer=true;
    this.initOrderItemsWithSavedBeer(this.vip['savedBeers']);
  }

}
