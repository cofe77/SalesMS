import {Component, OnInit} from '@angular/core';
import 'rxjs/Rx';
import {DeskService} from "../../../service/desk.service";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ConfirmDialogComponent} from "../../../public/layer/confirm-dialog/confirm-dialog.component";
import {SaveBeerDialogComponent} from "../../../public/wine/save-beer-dialog/save-beer-dialog.component";
import {OrderFinishConfirmDialogComponent} from "../../../public/order/order-finish-confirm-dialog/order-finish-confirm-dialog.component";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {GoodsService} from "../../../service/goods.service";
import {DeskTypesService} from "../../../service/desk-types.service";

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css'],
  providers:[DeskTypesService,DeskService,OrderService,GoodsService]
})
export class DeskComponent implements OnInit {
  initAllDeskSetInterval;
  deskIsLoading:boolean=true;
  deskDetailIsLoading:boolean=false;
  tempDeskIsUsing:boolean=false;
  tempDeskIsEnabled:boolean=false;
  tempDeskInit:boolean=true;
  desks:Array<any>=[];
  deskTypes:Array<any>=[];
  deskTypesIsFinish:boolean=false;
  tempDesk:Array<any>=[];
  tempDeskOrder:Array<any>=[];
  tempOrderId;
  allGoods:Array<any>=[];
  tempDeskId:number;
  tempDeskStatus:boolean=false;
  orderItems:Array<any>=[];
  orderAddItems:Array<any>=[];
  private isEnable:boolean=false;
  constructor(
    public deskService:DeskService,
    public deskTypesService:DeskTypesService,
    public orderService:OrderService,
    public goodsService:GoodsService,
    public dialog:MdDialog,
    public toastr:ToastrService
  ) {
  }

  ngOnInit() {
    $('.desk-detail .panel-body').height($('body').height()-150)
    this.initAllGoods();
    var that=this;
    this.initAllDeskType();
    this.initAllDesk();
    this.initAllDeskSetInterval=setInterval(()=>{
      that.initAllDeskType();
      this.initAllDesk();
    },5000);
  }

  initUserDeskDetail(orderId){
    this.deskService.getUserDeskDetail(this.tempDeskId).subscribe((res)=>{
      if(!!res){
        this.tempDesk=res;
      }
    },err=>this.toastr.error('获取桌子详情失败！'));
    this.orderService.getUserOrderById(orderId).subscribe((res)=>{
      this.tempDeskOrder=res;
      this.initOrderItem(res['items']);
    },err=>this.toastr.error('获取订单详情失败！'));
  }

  initAllDeskType(){
    this.deskTypesService.getAllDeskTypes({}).subscribe(
      (data)=>{
        this.deskTypes=data.slice(1);
        this.deskTypesIsFinish=true;
      },err=>this.toastr.error('服务器错误！请稍候重试！')
    );
  }

  initAllDesk(){
    this.deskService.getAllDesks({}).subscribe(
      (data)=>{
        this.desks=data.slice(1);
        this.deskIsLoading=false;
      }
    );
  }

  initAllGoods(){
    this.goodsService.getAllOldGoods({}).subscribe((data)=>{
      if(!!data){
        this.allGoods=data.slice(1);
      }else{
        this.toastr.error('获取商品失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
  }


  initOrderItem(items){
    var goodsIds=[];
    var goodsItems=[];
    var goodsAddItems=[];
    var tempItemTotalPrice=0;
    var tempItemTotalCount=0;
    var itemId=0;

    for(var i in items){
      if(items[i]['goodsId']==0){
        goodsAddItems.push({"totalPrice":items[i]['price'],"goodsName":items[i]['remarks']});
      }else if(goodsIds.indexOf(items[i]['goodsId'])<0){
        goodsIds.push(items[i]['goodsId']);
      }
    }
    this.orderAddItems=goodsAddItems;

    for(var j=0;j<goodsIds.length;j++){
      for(var i in items){
        if(items[i]['goodsId']==goodsIds[j]){
          tempItemTotalPrice=tempItemTotalPrice+parseFloat(items[i]['price']);
          tempItemTotalCount=tempItemTotalCount+parseInt(items[i]['count']);
          itemId=items[i]['id']
        }
      }
      goodsItems.push({"itemId":itemId,"goodsId":goodsIds[j],"price":tempItemTotalPrice,"count":tempItemTotalCount});
      tempItemTotalPrice=0;
      tempItemTotalCount=0;
    }

    this.orderItems=goodsItems;

    this.deskDetailIsLoading=false;

  }

  showDeskDetail(id,status,orderId){
    this.deskDetailIsLoading=true;
    this.tempDeskInit=false;
    this.tempDeskId=id;
    this.tempDeskStatus=status;
    this.tempOrderId=orderId;
    if(!status&&orderId==0){            //桌子已被禁用
      this.tempDeskInit=true;
      this.tempDeskIsEnabled=false;
      this.tempDeskIsUsing=false;
      this.deskDetailIsLoading=false;
      let enabledDeskDialog=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "280px",
        "height": "auto",
        "disableClose": false,
        "data": {
          "action": "启用桌子确认",
          "content":'桌子已被禁用，是否启用？'
        }
      } as MdDialogConfig);
      enabledDeskDialog.afterClosed().subscribe((res)=>{

      })
    }else if(status&&orderId==0){      //桌子可以使用
      this.tempDeskIsEnabled=true;
      this.tempDeskIsUsing=false;
      $('.btn-w3r').removeClass('desk-active');
      $('#desk'+id).addClass('desk-active');
      this.deskDetailIsLoading=false;
    }else{                              //桌子正在被使用
      this.deskDetailIsLoading=true;
      this.tempDeskIsEnabled=false;
      this.tempDeskIsUsing=true;
      $('.btn-w3r').removeClass('desk-active');
      $('#desk'+id).addClass('desk-active');
      this.initUserDeskDetail(orderId)
    }
  }

  addTempGoodsItem(){
    var contentStr;
    if($('#newAddGoodsName').val()==''){
      contentStr='所填商品名称为空，请输入！';
      let addTempGoodsItemDialog=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "280px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "添加其它商品确认",
          "content":contentStr
        }
      } as MdDialogConfig);
    }else if(!(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/).test($('#newAddGoodsPrice').val())){
      contentStr='所填商品价格有误，请重新输入！</br>商品价格只能是非零的正小数，且最多只能有两位小数！';
      let addTempGoodsItemDialog=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "280px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "添加其它商品确认",
          "content":contentStr
        }
      } as MdDialogConfig);
    }else{
      var nAddName=$('#newAddGoodsName').val();
      var nAddPrice=parseFloat($('#newAddGoodsPrice').val());
      contentStr='新添加商品名称:'+nAddName+'</br>新添加商品价格:'+nAddPrice;
      let addTempGoodsItemDialog=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "280px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "添加其它商品确认",
          "content":contentStr
        }
      } as MdDialogConfig);
      addTempGoodsItemDialog.afterClosed().subscribe((res)=>{
        if(res){
          this.orderService.addOther({"price":nAddPrice,"orderId":this.tempDesk['orderId'],"remarks":nAddName}).subscribe((data)=>{
            if(data){
              $('#newAddGoodsName').val('');
              $('#newAddGoodsPrice').val('');
              this.toastr.success('添加成功！');
              this.initUserDeskDetail(this.tempOrderId);
            }else{
              this.toastr.success('添加失败！');
            }
          });
          this.tempDeskIsUsing=true;
        }
      })
    }
  }

  finishOrder(){
    let finishOrderDialogRef=this.dialog.open(OrderFinishConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "700px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "orderId":this.tempDesk['orderId'],
        "deskId":this.tempDesk['id'],
        "goodsItems":this.orderItems,
        "orderAddItems":this.orderAddItems
      }
    } as MdDialogConfig);
    finishOrderDialogRef.afterClosed().subscribe((res)=>{
      this.deskIsLoading=true;
      $('.btn-w3r').removeClass('desk-active');
      var that=this;
      var afterInitDesk;
      afterInitDesk=setTimeout(()=>{
        clearTimeout(afterInitDesk);
        that.initAllDesk();
        return;
      },2000);
      this.tempDeskInit=true;
    })
  }

  ngOnDestroy() {
    if (this.initAllDeskSetInterval) {
      clearInterval(this.initAllDeskSetInterval);
    }
  }

}
