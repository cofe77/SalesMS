import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {SelectVipDialogComponent} from "../select-vip-dialog/select-vip-dialog.component";
import {VipService} from "../../../service/vip.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vip-charge-dialog',
  templateUrl: './vip-charge-dialog.component.html',
  styleUrls: ['./vip-charge-dialog.component.css'],
  providers:[VipService]
})
export class VipChargeDialogComponent implements OnInit {
  action:string;
  isHaveVipId:boolean;
  vipName:string;
  mobileNum:number;
  constructor(@Inject(MD_DIALOG_DATA) public data:any,
              public dialog:MdDialog,
              public toastr:ToastrService,
              public vipService:VipService,
              public dialogRef:MdDialogRef<VipChargeDialogComponent>
  ) { }

  ngOnInit() {
    this.action=this.data['action'];
    if (!!this.data['vipId']){
      this.isHaveVipId=true;
      this.mobileNum=this.data['mobileNum'];
      this.vipName=this.data['vipName']
    }else{
      this.isHaveVipId=false;
    }
  }

  selectVip(){
    let selectVipDialogRef=this.dialog.open(SelectVipDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "选择会员"
      }
    } as MdDialogConfig);
    selectVipDialogRef.afterClosed().subscribe((res)=>{
      if(!!res){
        this.isHaveVipId=true;
        this.mobileNum=res['mobileNum'];
        this.vipName=res['name']
      }
    })
  };

  chargeConfirm(count,actualMoney){
    var operatorId=JSON.parse($.cookie('idCheck'))['id'];
    this.vipService.vipCharge({"mobileNum":this.mobileNum,"operatorId":Number(operatorId),"money":Number(count).toFixed(2),"actualMoney":Number(actualMoney).toFixed(2)}).subscribe((res)=>{
      if(!!res){
        this.dialogRef.close(true);
      }else{
        this.toastr.error('充值失败！请重试！')
      }
    },err=>this.toastr.error('充值失败！请重试！'));

  }

}
