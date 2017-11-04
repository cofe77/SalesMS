import { Component, OnInit } from '@angular/core';
import {OperatorService} from "../service/operator.service";
import {ConfirmDialogComponent} from "../public/layer/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[OperatorService]
})
export class AdminComponent implements OnInit {
  isOperatorExist:boolean=true;
  isOperatorPasswordValidate:boolean=true;
  allGoods;
  checkPosition;
  redirectToIndex;
  constructor(
    private toastr:ToastrService,
    private dialog:MdDialog,
    private router:Router,
    private operatorService:OperatorService
  ) { }

  ngOnInit() {
    var that=this;
    document.onmousemove=function(){
      clearTimeout(that.checkPosition);
      that.changeOperatorNotExit()
    };
    document.onclick=function(){
      clearTimeout(that.checkPosition);
      that.changeOperatorNotExit()
    };
  }

  ngAfterViewInit(){
    this.changeOperatorNotExit()
  }

  changeOperatorNotExit(){
    var that=this;
    that.checkPosition=setTimeout(function(){
      $.cookie('apt', "50");
      that.isOperatorExist=false;
      that.isOperatorPasswordValidate=false;
    },900000);
  }

  validateOperator(screenPsw){
    var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
    var prePasswordStr=screenPsw;
    var confoundStrArray=[];
    var passwordArray=[];
    var mobileNum=JSON.parse($.cookie('operatorInfo'))['mobileNum'];
    for(var i=0;i<confoundStr.length;i++){
      confoundStrArray.push(confoundStr.charAt(i));
    }
    for(var i=0;i<prePasswordStr.length;i++){
      passwordArray.push(prePasswordStr.charAt(i)+''+confoundStrArray[i]);
    }
    this.operatorService.login({"mobileNum":mobileNum,"password":passwordArray.join('')}).subscribe((res)=>{
      if(!!res){
        if(res['isSuccess']==false){
          this.toastr.error('密码错误！');
        }else{
          this.isOperatorExist=true;
          this.isOperatorPasswordValidate=true;
          $.cookie('operatorInfo',JSON.stringify(res));
          $.cookie('apt', "892");
          this.changeOperatorNotExit();
        }
      }else{
        this.toastr.error('登录错误！请重试！');
      }
    },err=>this.toastr.error('服务器错误！请稍后再试！'));
  }

  ngOnDestroy(){
    $.cookie('idCheck', null);
    $.cookie('operatorInfo' ,null);
  }

}
