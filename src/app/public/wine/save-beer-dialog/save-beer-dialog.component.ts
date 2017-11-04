import {Component, OnInit, Inject} from '@angular/core';
import {MdDialog, MdDialogConfig, MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {SelectOrderDialogComponent} from "../../order/select-order-dialog/select-order-dialog.component";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";
import {GoodsService} from "../../../service/goods.service";
import {SelectSavedBeerComponent} from "../select-saved-beer/select-saved-beer.component";
import {ScanQRCodeComponent} from "../scan-qrcode/scan-qrcode.component";
import {SavedBeersService} from "../../../service/saved-beers.service";
import {VipService} from "../../../service/vip.service";

@Component({
  selector: 'app-save-beer-dialog',
  templateUrl: './save-beer-dialog.component.html',
  styleUrls: ['./save-beer-dialog.component.css'],
  providers:[OrderService,GoodsService,SavedBeersService,VipService]
})
export class SaveBeerDialogComponent implements OnInit {
  orderId;
  vipId;
  order;
  orderItems;
  allGoods;
  savedBeersId;
  savedBeersItem;
  waitForSaveBeerItemsGoodsIds:Array<any>=[];
  waitForSaveBeerItemsList:Array<any>=[];
  waitForSaveBeerItemsListEmpty:boolean=true;
  waitForSaveBeerGoodsList:Array<any>=[];
  orderDec:string='暂无';
  savedBeerDec:string='暂无';
  isHaveOrderId:boolean=false;
  isHaveVipId:boolean=false;
  isHaveSavedBeer:boolean=false;
  isAddNewSavedBeer:boolean=false;

  constructor(
            @Inject(MD_DIALOG_DATA) public data:any,
            public dialog:MdDialog,
            public dialogRef:MdDialogRef<SaveBeerDialogComponent>,
            public toastr:ToastrService,
            public goodsService:GoodsService,
            public vipService:VipService,
            public savedBeersService:SavedBeersService,
            public orderService:OrderService
  ) { }

  ngOnInit() {
    this.orderId=this.data['orderId'];
    this.goodsService.getAllOldGoods({}).subscribe((res)=>{
      this.allGoods=res.slice(1);
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
    if(!!this.orderId){       //有订单Id
      this.isHaveOrderId=true;
      this.initOrder(this.orderId);
    }else{                    //没有Id
      this.isHaveOrderId=false;
    }
  }

  initOrder(id){
    this.orderService.getOldOrderById(id).subscribe((res)=>{
      if(!!res){
        this.isHaveOrderId=true;
        this.order=res;
        this.vipId=res['vipId'];
        this.orderDec=res['serializtion'];
        this.initOrderItem(res['items']);
        if(this.vipId!=0){
          this.vipService.getById(this.vipId).subscribe((vipRes)=>{
            if(!!vipRes){
              this.savedBeersId=vipRes['savedBeersId'];
              this.isHaveVipId=true;
              this.waitForSaveBeerItemsList=[];
              this.isAddNewSavedBeer=false;
              this.isHaveSavedBeer=true;
              this.savedBeerDec='本单会员存酒单';
              this.savedBeersItem=vipRes['savedBeersItem'];
            }
          },err=>this.toastr.error('服务器错误！请重试！'))
        }
      }else{
        this.toastr.error('获取订单失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  initOrderItem(items){
    var goodsIds=[];
    var goodsItems=[];
    var tempItemTotalCount=0;

    for(var i in items){
      if(items[i]['goodsId']!=0&&goodsIds.indexOf(items[i]['goodsId'])<0){
        goodsIds.push(items[i]['goodsId']);
      }
    }
    this.waitForSaveBeerItemsGoodsIds=goodsIds;

    for(var j=0;j<goodsIds.length;j++){
      for(var i in items){
        if(items[i]['goodsId']==goodsIds[j]){
          tempItemTotalCount=tempItemTotalCount+parseInt(items[i]['count']);
        }
      }
      goodsItems.push({"goodsId":goodsIds[j],"count":tempItemTotalCount});
      tempItemTotalCount=0;
    }

    this.orderItems=goodsItems;

  }

  useVipSavedBeer(){
    this.vipService.getById(this.vipId).subscribe((vipRes)=>{
      if(!!vipRes){
        this.savedBeersId=vipRes['savedBeersId'];
        this.isHaveVipId=true;
        this.waitForSaveBeerItemsList=[];
        this.isAddNewSavedBeer=false;
        this.isHaveSavedBeer=true;
        this.savedBeerDec='本单会员存酒单';
        this.savedBeersItem=vipRes['savedBeersItem'];
      }
    },err=>this.toastr.error('服务器错误！请重试！'))
  }

  orderItemNumberReduce(e,goodsId){
    $(e.target.parentNode.childNodes[4]).prop("disabled",false);
    $(e.target.parentNode.childNodes[2]).prop("disabled",true);
    var countEle=$(e.target.parentNode.childNodes[3]);
    if(countEle.text()==1){
      return false;
    }else{
      countEle.text(parseInt(countEle.text())-1);
    }
    for(var i=0;i<this.waitForSaveBeerItemsList.length;i++){
      if(this.waitForSaveBeerItemsList[i]['goodsId']==goodsId){
        this.waitForSaveBeerItemsList[i]['count']=Number(countEle.text())
      }
    }

    $(e.target.parentNode.childNodes[2]).prop("disabled",false);
  }

  orderItemNumberPlus(e,maxNum,goodsId){
    $(e.target.parentNode.childNodes[2]).prop("disabled",false);
    $(e.target.parentNode.childNodes[4]).prop("disabled",true);
    var itemIsExist=false;
    var countEle=$(e.target.parentNode.childNodes[3]);
    if(countEle.text()==maxNum){
      return false;
    }else{
      countEle.text(parseInt(countEle.text())+1);
    }

    for(var i=0;i<this.waitForSaveBeerItemsList.length;i++){
      if(this.waitForSaveBeerItemsList[i]['goodsId']==goodsId){
        this.waitForSaveBeerItemsList[i]['count']=Number(countEle.text())
      }
    }

    $(e.target.parentNode.childNodes[4]).prop("disabled",false);
  }

  addOrderItemToTempSaveBeer(e,goodsId){
    $(e.target).prop("disabled",true);
    var count=Number($('#order'+goodsId).text());
    if(this.isAddNewSavedBeer){
      this.waitForSaveBeerItemsList.push({"goodsId":goodsId,"count":count});
    }

    if(this.isHaveSavedBeer){
      var exist=false;
      for(var i in this.savedBeersItem){
        if(this.savedBeersItem[i]['goodsId']==goodsId){
          this.waitForSaveBeerItemsList.push({"goodsId":goodsId,"count":count,"savedBeersItemId":this.savedBeersItem[i]['id']});
          exist=true;
        }
      }
      if(!exist){
        this.waitForSaveBeerItemsList.push({"goodsId":goodsId,"count":count});
      }
    }
    if(this.waitForSaveBeerItemsList.length==0){
      this.waitForSaveBeerItemsListEmpty=true;
    }else{
      this.waitForSaveBeerItemsListEmpty=false;
    }
  }

  deleteTempSavedWine(goodsId){
    for(var i=0;i<this.waitForSaveBeerItemsList.length;i++){
      if(this.waitForSaveBeerItemsList[i]['goodsId']==goodsId){
        this.waitForSaveBeerItemsList.splice(i,1)
      }
    }
    $('#btn'+goodsId).prop("disabled",false);
    if(this.waitForSaveBeerItemsList.length==0){
      this.waitForSaveBeerItemsListEmpty=true;
    }else{
      this.waitForSaveBeerItemsListEmpty=false;
    }
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
      if(!!result){
        this.waitForSaveBeerItemsList=[];
        this.isAddNewSavedBeer=false;
        this.isHaveSavedBeer=true;
        this.savedBeersId=result['id'];
        this.savedBeerDec=result['keyCode'];
        this.savedBeersItem=result['savedBeersItem'];
      }
    })

  }

  searchSavedBeerByKeyCode(){
    let searchSavedBeerRef=this.dialog.open(SelectSavedBeerComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
      }
    } as MdDialogConfig);
    searchSavedBeerRef.afterClosed().subscribe(result=>{
      if(!!result){
        this.waitForSaveBeerItemsList=[];
        this.isAddNewSavedBeer=false;
        this.isHaveSavedBeer=true;
        this.savedBeersId=result['id'];
        this.savedBeerDec=result['keyCode'];
        this.savedBeersItem=result['savedBeersItem'];
      }
    })
  }

  addNewSavedBeer(){
    for(var i in this.waitForSaveBeerItemsGoodsIds){
      $('#btn'+this.waitForSaveBeerItemsGoodsIds[i]).prop("disabled",false);
    }
    this.waitForSaveBeerItemsList=[];
    this.isAddNewSavedBeer=true;
    this.savedBeerDec='新存酒单';
  }

  selectOrder(){
    let selectOrderDialogRef=this.dialog.open(SelectOrderDialogComponent, {
      'panelClass': 'custom-overlay-pane-class',
      'hasBackdrop': true,
      'width': '500px',
      'height': 'auto',
      'disableClose': true,
      'data': {}
    } as MdDialogConfig);
    selectOrderDialogRef.afterClosed().subscribe((id)=> {
      if(!!id){
        this.orderId=id;
        this.initOrder(id)
        this.waitForSaveBeerItemsList=[];
      }
    })
  }

  saveBeerConfirm(){
    var data;
    var operatorIdCookie=JSON.parse($.cookie('idCheck'));
    if(this.isHaveOrderId&&this.isAddNewSavedBeer){
      data={
        "orderId":this.orderId,
        "operatorId":Number(operatorIdCookie['id']),
        "savedBeersItems":this.waitForSaveBeerItemsList
      }
      this.savedBeersService.create(data).subscribe((res)=>{
        if(!!res){
          this.dialogRef.close(res)
        }else{
          this.toastr.error('存酒失败！请重试！')
        }
      },err=>this.toastr.error('服务器错误！请稍候重试！'));
    }else if(this.isHaveOrderId&&this.isHaveSavedBeer){
      data={
        "orderId":this.orderId,
        "savedBeersId":this.savedBeersId,
        "operatorId":Number(operatorIdCookie['id']),
        "savedBeersGoods":this.waitForSaveBeerItemsList
      }
      this.savedBeersService.add(data).subscribe((res)=>{
        if(!!res){
          this.dialogRef.close(res)
        }else{
          this.toastr.error('存酒失败！请重试！')
        }
      },err=>this.toastr.error('服务器错误！请稍候重试！'));
    }
  }

}
