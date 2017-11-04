import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {OrderFinishConfirmDialogComponent} from "../order-finish-confirm-dialog/order-finish-confirm-dialog.component";
import {SaveBeerConfirmAfterOrderFinishDialogComponent} from "../save-beer-confirm-after-order-finish-dialog/save-beer-confirm-after-order-finish-dialog.component";
import {OrderService} from "../../../service/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-payment-confirm-dialog',
  templateUrl: './order-payment-confirm-dialog.component.html',
  styleUrls: ['./order-payment-confirm-dialog.component.css'],
  providers:[OrderService]
})
export class OrderPaymentConfirmDialogComponent implements OnInit {

  orderPaymentIsLoading:boolean=true;
  amountReceivable;
  preAmountReceivable;
  vipBalance;
  vipId;
  orderId;
  orderData;
  vipDisCount;
  vipDisCountAmount;
  tempAmountReceivable;
  waitForPayCash:number=0;
  waitForPayOnline:number=0;
  canPay:boolean=true;

  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialog:MdDialog,
    public toastr:ToastrService,
    public orderService:OrderService,
    public dialogRef:MdDialogRef<OrderPaymentConfirmDialogComponent>,
    public orderFinishConfirmDialogRef:MdDialogRef<OrderFinishConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.preAmountReceivable=this.dialogData['amountReceivable'];
    this.tempAmountReceivable=this.dialogData['amountReceivable'];
    this.amountReceivable=this.dialogData['amountReceivable'];
    this.waitForPayCash=this.dialogData['amountReceivable'];
    this.vipBalance=this.dialogData['vipBalance'];
    this.vipDisCount=this.dialogData['vipDisCount'];
    this.vipId=this.dialogData['vipId'];
    this.orderId=this.dialogData['orderId'];
    this.orderData=this.dialogData['orderData'];
    this.orderPaymentIsLoading=false;
  }


  isUseVipDeduct(e){
    $('#oddmentInput').val('');
    $('#modeOfPayment').val(0);
    this.amountReceivable=this.preAmountReceivable;
    if(e.target.value==1){    //使用余额
      if(this.vipBalance-this.preAmountReceivable>=0){
        this.amountReceivable=0;
      }else{
        this.amountReceivable=this.preAmountReceivable-this.vipBalance;
      }
    }else{                    //不使用余额
      this.amountReceivable=this.preAmountReceivable;
    }
    this.tempAmountReceivable=this.amountReceivable;
    this.waitForPayCash=this.amountReceivable;
    this.canPay=true;
  }

  calVipDisCount(){
    this.vipDisCountAmount=this.preAmountReceivable*(1-this.vipDisCount);
  }

  calOddment(){
    this.canPay=false;
    $('#modeOfPayment').val(0);
    this.waitForPayCash=this.tempAmountReceivable;
    var oddmentInput=$('#oddmentInput').val()
    if(oddmentInput<0){
      let confirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "输入错误",
          "content":"抹零不能为负数！"
        }
      } as MdDialogConfig);
      confirmDialogRef.afterClosed().subscribe((res)=>{
        $('#oddmentInput').val('')
        this.amountReceivable=this.tempAmountReceivable;
        this.waitForPayCash=this.tempAmountReceivable;
        this.canPay=true;
      })
    }else if(oddmentInput>this.tempAmountReceivable*0.2){
      let confirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "输入错误",
          "content":'抹零不能大于当前消费金额X0.2！<br>'+'即'+this.tempAmountReceivable+
                    'X0.2='+this.tempAmountReceivable*0.2
        }
      } as MdDialogConfig);
      confirmDialogRef.afterClosed().subscribe((res)=>{
        $('#oddmentInput').val('')
        this.amountReceivable=this.tempAmountReceivable;
        this.waitForPayCash=this.tempAmountReceivable;
        this.canPay=true;
      })
    }else{
      this.amountReceivable=this.tempAmountReceivable-oddmentInput;
      this.canPay=true;
    }
    this.waitForPayCash=this.amountReceivable;
    this.canPay=true;

  }

  changeModeOfPayment(e){
    if(e.target.value==1){    //使用现金+微信支付宝
      this.waitForPayOnline=this.amountReceivable;
      this.waitForPayCash=0;
    }else{                    //使用纯现金
      this.waitForPayOnline=0;
      this.waitForPayCash=this.amountReceivable;
    }
    this.canPay=true;
  }

  calDirtyPayment(){
    this.canPay=false;
    var cashPaymentInput=$('#cashPaymentInput').val()
    if(cashPaymentInput<0){
      let confirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "输入错误",
          "content":"现金金额不能为负数！"
        }
      } as MdDialogConfig);
      confirmDialogRef.afterClosed().subscribe((res)=>{
        $('#cashPaymentInput').val('')
        this.waitForPayCash=0;
        this.waitForPayOnline=this.amountReceivable;
        this.canPay=true;
      })
    }else if(cashPaymentInput>this.amountReceivable){
      let confirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "输入错误",
          "content":'抹零不能大于当前消费金额！即'+this.amountReceivable
        }
      } as MdDialogConfig);
      confirmDialogRef.afterClosed().subscribe((res)=>{
        $('#cashPaymentInput').val('')
        this.waitForPayCash=0;
        this.waitForPayOnline=this.amountReceivable;
        this.canPay=true;
      })
    }else{
      this.waitForPayCash=parseFloat(cashPaymentInput);
      this.waitForPayOnline=this.amountReceivable-parseFloat(cashPaymentInput);
      this.canPay=true;
    }
    this.canPay=true;
  }

  orderPaymentConfirm(){
    var payCash=this.waitForPayCash
    var payOnline=this.waitForPayOnline
    var content;
    if($('#modeOfPayment').val()==0){
      content='请使用现金支付：￥'+payCash.toFixed(2)
    }else{
      content='请使用现金支付：￥'+payCash.toFixed(2)+
              ',微信支付宝支付：￥'+payOnline.toFixed(2)
    }
    if(this.canPay){
      this.orderPaymentIsLoading=true;
      var finishData=$.extend(true,this.orderData,{
        "isDedcute":$('#vipDeduct').val()==1?true:false,
        "cashSettlement":this.waitForPayCash,
        "onlineSettlement":Number(this.waitForPayOnline),
        "operatorRemarks":'抹零：'+($('#oddmentInput').val()==''?0:$('#oddmentInput').val())
      });
      let confirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "data": {
          "action": "请付款",
          "yesButtonContent": "付款完成",
          "content":content
        }
      } as MdDialogConfig);
      confirmDialogRef.afterClosed().subscribe((res)=>{
        this.orderPaymentIsLoading=false;
        if(!!res){
          this.orderService.finishOrder(finishData).subscribe((isSuccess)=>{
            if(isSuccess){
              let saveBeerConfirmAfterOrderFinishDialogRef=this.dialog.open(SaveBeerConfirmAfterOrderFinishDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "1000px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  "orderId":this.orderId
                }
              } as MdDialogConfig);
              saveBeerConfirmAfterOrderFinishDialogRef.afterClosed().subscribe((res)=>{
              })
            }else{
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "200px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  "action":"结单失败",
                  "content":"结单失败，请重试"
                }
              } as MdDialogConfig);
            }
          },err=>this.toastr.error('结单失败！请稍候再试！'));
        }else{
        }
      })
    }
  }

}
