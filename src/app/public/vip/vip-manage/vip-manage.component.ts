import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {UpdateVipDialogComponent} from "../update-vip-dialog/update-vip-dialog.component";
import {UpdatePasswordDialogComponent} from "../../update-password-dialog/update-password-dialog.component";
import {VipChargeDialogComponent} from "../vip-charge-dialog/vip-charge-dialog.component";
import {SelectVipDialogComponent} from "../select-vip-dialog/select-vip-dialog.component";
import {VipService} from "../../../service/vip.service";
import {VipTypeService} from "../../../service/vip-type.service";
import {ToastrService} from "ngx-toastr";
import {VipTypeManageComponent} from "../vip-type-manage/vip-type-manage.component";
import {PasswordDialogComponent} from "../../layer/password-dialog/password-dialog.component";
import {Md5} from "ts-md5/dist/md5";
import {OperatorService} from "../../../service/operator.service";
import {ResetPasswordDialogComponent} from "../../reset-password-dialog/reset-password-dialog.component";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-vip-manage',
  templateUrl: './vip-manage.component.html',
  styleUrls: ['./vip-manage.component.css'],
  providers:[VipService,VipTypeService,OperatorService]
})
export class VIPManageComponent implements OnInit {
  vipIsExist:boolean=false;
  vip;
  vipId;
  vipTypes;
  typeId;
  vipName;
  mobileNum;
  constructor(
    public dialog:MdDialog,
    public vipService:VipService,
    public toastr:ToastrService,
    public vipTypeService:VipTypeService,
    public operatorService:OperatorService
  ) { }

  ngOnInit() {

    this.vipTypeService.getAllVipTypes({}).subscribe((res)=>{
      this.vipTypes=res.slice(1);
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  searchVip(){
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
      if(!!data){
        this.vip=data;
        this.vipId=data['id'];
        this.vipName=data['name'];
        this.mobileNum=data['mobileNum'];
        this.typeId=data['typeId'];
        this.vipIsExist=true;
      }
    });
  }


  selectVipToCharge(){
    let vipChargeDialogRef=this.dialog.open(VipChargeDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "会员充值"
      }
    } as MdDialogConfig);
    vipChargeDialogRef.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('充值成功！');
      }
    });
  }

  vipCharge(vipId,vipName){
    let vipChargeDialogRef=this.dialog.open(VipChargeDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "会员充值",
        "vipId": this.vipId,
        "vipName": this.vipName,
        "mobileNum": this.mobileNum
      }
    } as MdDialogConfig);
    vipChargeDialogRef.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('充值成功！');
        this.vipService.getById(this.vipId).subscribe((res)=>{
          this.vip=res;
          for(var i in this.vipTypes){
            if(this.vipTypes[i]['id']==this.vip['typeId']){
              this.vip['typeName']=this.vipTypes[i]['name']
            }
          }
          this.vipIsExist=true;
        },err=>this.toastr.error('服务器错误！请稍候重试！'));
      }
    });
  }

  addVip(){
    let addVipDialogRef=this.dialog.open(UpdateVipDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "600px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加会员"
      }
    } as MdDialogConfig);
    addVipDialogRef.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('添加成功！');
      }
    });
}


  editVip(){
    let editVipDialogRef=this.dialog.open(UpdateVipDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改会员信息",
        "vipId": this.vipId,
        "vipName": this.vipName,
        "mobileNum": this.mobileNum,
        "typeId": this.typeId
      }
    } as MdDialogConfig);
    editVipDialogRef.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('修改成功！')
        this.vipService.getById(this.vipId).subscribe((res)=>{
          this.vip=res;
          for(var i in this.vipTypes){
            if(this.vipTypes[i]['id']==this.vip['typeId']){
              this.vip['typeName']=this.vipTypes[i]['name']
            }
          }
          this.vipIsExist=true;
        },err=>this.toastr.error('服务器错误！请稍候重试！'));
      }
    });
  }



  updateVipPassword(){
    let updateVipPasswordRef=this.dialog.open(UpdatePasswordDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改VIP密码",
        "id": this.vipId
      }
    } as MdDialogConfig);
    updateVipPasswordRef.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('修改密码成功！')
      }
    });
  }

  vipTypeManage(){
    let vipTypeManageDialogRef=this.dialog.open(VipTypeManageComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "会员等级管理"
      }
    } as MdDialogConfig);
    vipTypeManageDialogRef.afterClosed().subscribe(result=>{

    });
  }

  resetVipPassword(){
    let vipPasswordConfirmRef=this.dialog.open(PasswordDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        'action':'请输入当前操作员密码'
      }
    } as MdDialogConfig);
    vipPasswordConfirmRef.afterClosed().subscribe((res)=>{
      if(!!res){
        var operatorInfo=JSON.parse($.cookie('operatorInfo'));
        this.operatorService.login({"mobileNum":operatorInfo['mobileNum'],"password":res}).subscribe((data)=>{
          if(data['isSuccess']==false){
            this.toastr.error('操作员密码错误！')
          }else{
            this.toastr.success('操作员验证成功！');
            let resetVipPasswordConfirmRef=this.dialog.open(ResetPasswordDialogComponent,{
              "panelClass": "custom-overlay-pane-class",
              "hasBackdrop": true,
              "backdropClass": "",
              "width": "500px",
              "height": "auto",
              "disableClose": true,
              "data": {
                'action':'请输入VIP密码'
              }
            } as MdDialogConfig);
            resetVipPasswordConfirmRef.afterClosed().subscribe((data)=>{
              if(!!data){
                this.vipService.resetPassword({"mobileNum":data.mobileNum,"newPassword":data.secondPsw}).subscribe((data)=>{
                  if(data){
                    this.toastr.success('重置VIP密码成功！');
                    this.vipIsExist=false;
                  }else{
                    this.toastr.error('重置VIP密码失败！');
                  }
                },err=>this.toastr.error('服务器错误！请稍候重试！'));
              }
            })
          }
        },err=>this.toastr.error('服务器错误！请稍后重试！'));
      }
    })
  }
  deleteVip(){
    let deleteVipDialogRef=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "280px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "删除VIP确认",
        "content":'确认删除？'
      }
    } as MdDialogConfig);
    deleteVipDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.vipService.delete(this.vipId).subscribe((res)=>{
          this.vipIsExist=false;
        },err=>this.toastr.error('删除VIP失败！'));
      }
    });
  }
}
