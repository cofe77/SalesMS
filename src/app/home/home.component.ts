import { Component, OnInit,} from '@angular/core';
import {ToastrService } from "ngx-toastr";
import {OperatorService} from "../service/operator.service";
import {SendService} from "../service/send.service";
import {GoodsService} from "../service/goods.service";
import {ConfirmDialogComponent} from "../public/layer/confirm-dialog/confirm-dialog.component";
import {MdDialogConfig, MdDialog} from "@angular/material";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[OperatorService,SendService,GoodsService]
})
export class HomeComponent implements OnInit {
  dispatchsIsChangeSetInterval;
  waitForDispatchs:string[];
  successForDispatchs:string[];
  dispatchConfirmShow:boolean=true;
  isOperatorExist:boolean=true;
  isOperatorPasswordValidate:boolean=true;
  allGoods;
  checkPosition;
  constructor(
    private toastr:ToastrService,
    private sendService:SendService,
    private dialog:MdDialog,
    private goodsService:GoodsService,
    private operatorService:OperatorService
  ) {
    this.goodsService.getAllOldGoods({}).subscribe((data)=>{
      if(!!data){
        this.allGoods=data.slice(1);
      }else{
        this.toastr.error('获取商品失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
    this.initDispatch();
    this.dispatchsIsChangeSetInterval=setInterval(()=>{
      this.sendService.dispatchIsChanged({}).subscribe((res)=>{
        if(!!res){
          this.goodsService.getAllOldGoods({}).subscribe((data)=>{
            if(!!data){
              this.allGoods=data.slice(1);
            }else{
              this.toastr.error('获取商品失败！请重试！')
            }
          },err=>this.toastr.error('服务器错误！请重试！'));
          this.initDispatch();
        }
      },err=>this.toastr.error('服务器错误！请稍后重试！'));
    },8000);

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

  ngOnInit() {
    $('.waitForDispatchBox .panel-body').height($('body').height()-115);
  }

  initDispatch(){
    this.sendService.getDispatch({}).subscribe((res)=>{
      if(!!res){
        var data=[];
        for(var i in res){
          data.push({"id":res[i]['id'],"deskNumber":res[i]['deskNumber'],"goodsId":res[i]['goodsId'],"count":res[i]['count'],"countSent":res[i]['countSent'],"remarks":res[i]['remarks']})
        }
        this.waitForDispatchs=data;
      }else{
        this.toastr.error('获取待派送失败！请重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍后重试！'));
  }

  ngAfterViewInit(){
    this.changeOperatorNotExit()
  }

  changeOperatorNotExit(){
    var that=this;
    that.checkPosition=setTimeout(function(){
      $.cookie('apt', "23");
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



  dispatchConfirm(e){
    $(e.target.parentNode.parentNode.parentNode.parentNode).addClass('rollDis');
  }
  dispatchConfirmNo(e){
    $(e.target.parentNode.parentNode.parentNode.parentNode).removeClass('rollDis');
  }
  dispatchConfirmYes(id){
    var data;
    for(var i in this.waitForDispatchs){
      if(this.waitForDispatchs[i]['id']==id){
        data={
          "list":[{
            "id":id,
            "countSent":this.waitForDispatchs[i]['count']
          }]
        }
      }
    }
    this.sendService.send(data).subscribe((res)=>{
      this.initDispatch();
    },err=>this.toastr.error('服务器错误！请稍后重试！'));
  }
  haveDispatch(id){
  }

  ngOnDestroy(){
    if(this.dispatchsIsChangeSetInterval){
      clearInterval(this.dispatchsIsChangeSetInterval);
    };
    $.cookie('idCheck', null);
    $.cookie('operatorInfo' ,null);
  }
}
