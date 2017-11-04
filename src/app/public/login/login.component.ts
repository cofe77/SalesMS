import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RouterLinkActive, Router, RouterModule, ActivatedRoute} from "@angular/router";
import {OperatorService} from "../../service/operator.service";
import {ToastrService} from "ngx-toastr";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ConfirmDialogComponent} from "../layer/confirm-dialog/confirm-dialog.component";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[OperatorService]
})
export class LoginComponent implements OnInit {
  user;

  isAgree:boolean=false;
  username:string;
  password:string;

  dataSource:Observable<any>;
  response:Array<any>=[];

  constructor(public fb:FormBuilder,
              private router:Router,
              public operatorService:OperatorService,
              public dialog:MdDialog,
              public toastr:ToastrService
  ) {

  }

  ngOnInit() {
    let beforeUse=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action":"使用须知",
        "content":'1、本系统支持最低分辨率1366X768！<br>' +
        '2、请使用Chrome浏览器打开本系统！<br>' +
                  '3、请使用F11打开"Chrome"的全屏模式使用本系统！<br>' +
        '4、请不要使用浏览器保存任何和账号密码有关的信息，如果因此产生经济纠纷！请自负！<br>' +
                  '5、请确保使用过程中始终有人；如需暂时离开，请使用<b>电脑</b>锁屏或关闭电脑！<br>' +
        '6、在使用过程中如果界面显示错误，请刷新重试！<br>' +
        '7、如果需要关闭系统！请直接关闭它所在的浏览器！确保您的信息安全！',
        "yesButtonContent":'我同意'
      }
    } as MdDialogConfig);
    beforeUse.afterClosed().subscribe((res)=>{
      if(res==true){
        this.isAgree=true;
      }else{
        this.isAgree=false;
      }
    });
    this.user = this.fb.group({
      mobileNum: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
    var prePasswordStr=this.user.value.password+'';
    var confoundStrArray=[];
    var passwordArray=[];
    for(var i=0;i<confoundStr.length;i++){
      confoundStrArray.push(confoundStr.charAt(i));
    }
    for(var i=0;i<prePasswordStr.length;i++){
      passwordArray.push(prePasswordStr.charAt(i)+''+confoundStrArray[i]);
    }
    this.user.value.password=passwordArray.join('');
    this.operatorService.login(this.user.value).subscribe((res)=>{
      this.user = this.fb.group({
        mobileNum: [this.user.value.mobileNum, [Validators.required]],
        password: ['', [Validators.required]]
      });
      if(!!res){
        if(res['isSuccess']==false){
          this.dialog.open(ConfirmDialogComponent,{
            "panelClass": "custom-overlay-pane-class",
            "hasBackdrop": true,
            "backdropClass": "",
            "width": "280px",
            "height": "auto",
            "disableClose": false,
            "data": {
              "action": "登录失败",
              "content":'密码错误！'
            }
          } as MdDialogConfig);
        }else{
          $.cookie('operatorInfo',JSON.stringify(res));
          $.cookie('apt',"892");
          if(res['permission']==1){
            let loginConfirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
              "panelClass": "custom-overlay-pane-class",
              "hasBackdrop": true,
              "backdropClass": "",
              "width": "280px",
              "height": "auto",
              "disableClose": false,
              "data": {
                "action": "登录成功",
                "content":'登录成功！'
              }
            } as MdDialogConfig);
            loginConfirmDialogRef.afterClosed().subscribe((res)=>{
              if(res){
                this.router.navigate(['./admin']);
              }else{
                this.user = this.fb.group({
                  mobileNum: ['', [Validators.required]],
                  password: ['', [Validators.required]]
                });
              }
            });
          }else if(res['permission']==2){
            let loginConfirmDialogRef=this.dialog.open(ConfirmDialogComponent,{
              "panelClass": "custom-overlay-pane-class",
              "hasBackdrop": true,
              "backdropClass": "",
              "width": "280px",
              "height": "auto",
              "disableClose": false,
              "data": {
                "action": "登录成功",
                "content":'登录成功！'
              }
            } as MdDialogConfig);
            loginConfirmDialogRef.afterClosed().subscribe((res)=>{
              if(res){
                this.router.navigate(['./home']);
              }else{
                this.user = this.fb.group({
                  mobileNum: ['', [Validators.required]],
                  password: ['', [Validators.required]]
                });
              }
          });
          }
        }
      }else{
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "登录失败",
            "content":'登录错误！请重试！'
          }
        } as MdDialogConfig);
      }
    },err=>{
      this.user = this.fb.group({
        mobileNum: [this.user.value.mobileNum, [Validators.required]],
        password: ['', [Validators.required]]
      });
      this.toastr.error('服务器错误！请稍后重试！')
    });
  }



}
