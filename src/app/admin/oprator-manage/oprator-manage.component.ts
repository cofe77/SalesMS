import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig} from "@angular/material";
import {UpdateOpratorDialogComponent} from "./update-oprator-dialog/update-oprator-dialog.component";
import {UpdatePasswordDialogComponent} from "../../public/update-password-dialog/update-password-dialog.component";
import {OperatorService} from "../../service/operator.service";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../public/layer/confirm-dialog/confirm-dialog.component";
import {PasswordDialogComponent} from "../../public/layer/password-dialog/password-dialog.component";
import {ResetPasswordDialogComponent} from "../../public/reset-password-dialog/reset-password-dialog.component";
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-oprator-manage',
  templateUrl: './oprator-manage.component.html',
  styleUrls: ['./oprator-manage.component.css'],
  providers:[OperatorService]
})
export class OpratorManageComponent implements OnInit {

  operators;
  operatorsInitIsFinished:boolean=false;
  operatorsData:Array<any>;
  operatorsPageArray:Array<any>;
  orderPage:number=1;
  operatorsPage:number;
  operatorsCount:number;
  currentOperatorsPage:number=1;
  constructor(
    public dialog:MdDialog,
    public toastr:ToastrService,
    public operatorService:OperatorService
  ) { }

  ngOnInit() {
    this.initOperatorsInfo(1);
  }

  initOperatorsInfo(page){
    this.currentOperatorsPage=page;
    this.operatorService.getByParams({"row":10,"page":parseInt(page)}).subscribe(data=>{
      this.operatorsData=data.slice(1);
      this.operatorsCount=data[0]['count'];
      this.operatorsPage=Math.ceil(this.operatorsCount/10);
      var tempArray=[];
      for(var i=1;i<=this.operatorsPage;i++){
        tempArray.push(''+i);
      }
      this.operatorsPageArray=tempArray;
      this.operatorsInitIsFinished=true;
    });
  }

  addOperator(){
    let addOperatorDialogRef=this.dialog.open(UpdateOpratorDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "410px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加操作员"
      }
    } as MdDialogConfig);
    addOperatorDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.initOperatorsInfo(this.currentOperatorsPage);
      }
    });
  }

  editOperator(id){
    let editOpratorDialogRef=this.dialog.open(UpdateOpratorDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改操作员信息",
        "operatorId": id
      }
    } as MdDialogConfig);
    editOpratorDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.initOperatorsInfo(this.currentOperatorsPage);
      }
    });
  }

  resetOperatorPassword(){
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
        this.operatorService.login({"mobileNum":operatorInfo['mobileNum'],"password":Md5.hashStr(res)}).subscribe((data)=>{
          if(data['isSuccess']==false){
            this.toastr.error('操作员密码错误！')
          }else{
            if(data['permission']==1){
              this.toastr.success('操作员验证成功！');
              let resetVipPasswordConfirmRef=this.dialog.open(ResetPasswordDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "500px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  'action':'请输入操作员密码'
                }
              } as MdDialogConfig);
              vipPasswordConfirmRef.afterClosed().subscribe((res)=>{
                if(!!res){
                  this.operatorService.resetPassword({"mobileNum":res.mobileNum,"newPassword":res}).subscribe((data)=>{
                    if(data){
                      this.toastr.success('重置操作员密码成功！')
                    }else{
                      this.toastr.error('重置操作员密码失败！');
                    }
                  },err=>this.toastr.error('服务器错误！请稍候重试！'));
                }
              })
            }else{
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "500px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  'action':'验证权限失败',
                  "content":'当前操作员没有权限！'
                }
              } as MdDialogConfig);
            }
          }
        },err=>this.toastr.error('服务器错误！请稍后重试！'));
      }
    })
  }

  updateOperatorPassword(id){
    let updatePasswordDialogRef=this.dialog.open(UpdatePasswordDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "410px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改操作员密码",
        "id": id
      }
    } as MdDialogConfig);
    updatePasswordDialogRef.afterClosed().subscribe(result=>{
      if(result){
          this.toastr.success('修改成功！')
      }else{
          this.toastr.error('修改失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍后重试！'));
  }

  deleteOperator(id){
    let vipPasswordConfirmRef=this.dialog.open(PasswordDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        'action':'请输入当前管理员密码'
      }
    } as MdDialogConfig);
    vipPasswordConfirmRef.afterClosed().subscribe((res)=>{
      if(!!res){
        var operatorInfo=JSON.parse($.cookie('operatorInfo'));
        this.operatorService.login({"mobileNum":operatorInfo['mobileNum'],"password":res}).subscribe((data)=>{
          if(data['isSuccess']==false){
            this.toastr.error('操作员密码错误！')
          }else{
            if(data['permission']==1){
              let deleteOperatorDialogRef=this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "200px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  "action": "删除操作员确认",
                  "content": "确认删除操作员？"
                }
              } as MdDialogConfig);
              deleteOperatorDialogRef.afterClosed().subscribe(result=>{
                if(result){
                  this.operatorService.deleteOperator(id).subscribe((res)=>{
                    if(res){
                      this.toastr.success('删除成功！');
                      this.initOperatorsInfo(this.currentOperatorsPage);
                    }else{
                      this.toastr.error('删除失败！请重试！')
                    }
                  },err=>this.toastr.error('服务器错误！请稍后重试！'));
                }
              });
            }else{
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "500px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  'action':'验证权限失败',
                  "content":'当前管理员没有权限！'
                }
              } as MdDialogConfig);
            }
          }
        },err=>this.toastr.error('服务器错误！请稍后重试！'));
      }
    });
  }

}
