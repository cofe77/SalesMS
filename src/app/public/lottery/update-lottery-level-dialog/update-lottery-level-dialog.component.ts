import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LotteryService} from "../../../service/lottery.service";
import {LotteryLevelService} from "../../../service/lottery-level.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {LoadingDialogComponent} from "../../layer/loading-dialog/loading-dialog.component";

@Component({
  selector: 'app-update-lottery-level-dialog',
  templateUrl: './update-lottery-level-dialog.component.html',
  styleUrls: ['./update-lottery-level-dialog.component.css'],
  providers:[LotteryService,LotteryLevelService]
})
export class UpdateLotteryLevelDialogComponent implements OnInit {
  action:string;
  isAddNew:boolean=false;
  goodsImgUrl:string;
  lotteryLevelHandle:string;
  lotteryId:number;
  name:string;
  goodsImgBase64:string;
  hadSettingLevel:string='';
  goodsTypes:Array<any>;
  goodss:Array<any>;
  goodsNameIsExist:boolean=false;
  goods:Array<any>;
  lotteryForm:FormGroup;

  constructor(@Inject(MD_DIALOG_DATA) public dialogData:any,
              private dialog:MdDialog,
              public lotteryLevelService:LotteryLevelService,
              public lotteryService:LotteryService,
              public toastr:ToastrService,
              public dialogRef:MdDialogRef<UpdateLotteryLevelDialogComponent>,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.lotteryLevelHandle='请设置本次抽奖级别';
    this.lotteryId=this.dialogData['lotteryId'];
    this.lotteryForm = this.fb.group({
      name: ['', [Validators.required] ],
      startTime: ['', [Validators.required] ],
      endTime: ['', [Validators.required] ],
      describe: ['', [Validators.required] ]
    });
    if(this.action==='修改活动信息'){
      this.isAddNew=true;
      this.lotteryService.getById(this.lotteryId).subscribe(data=>{
        this.goods=data;
        this.lotteryForm.setValue({
          name: this.goods['name']||'',
          startTime: this.goods['startTime']||'',
          endTime: this.goods['endTime']||'',
          describe: this.goods['describe']||''
        });
        this.goodsImgUrl=this.goods['photoUrl'];
      },error=>this.toastr.error('获取商品信息失败！'));
    }
  }

  checkLotteryNameIsExist(){
    for(var i in this.goodss){
      if(this.goodss[i]['name']==this.lotteryForm.value.goodsName.replace(/(^\s*)|(\s*$)/g,"")){
        this.goodsNameIsExist=true;
        return;
      }else{
        this.goodsNameIsExist=false;
      }
    }
  }


  toSetLotteryLevel(){
    let updateLotteryLevelDialogRef=this.dialog.open(UpdateLotteryLevelDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "600px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "设置抽奖级别"
      }
    } as MdDialogConfig)
    updateLotteryLevelDialogRef.afterClosed().subscribe(result=>{
      if(!!result){
        this.goodsImgBase64=result;
        this.goodsImgUrl=this.goodsImgBase64;
        result=result.substring(22);
        var equalIndex= result.indexOf('=');
        if(result.indexOf('=')>0)
        {
          result=result.substring(0, equalIndex);
        }
        var strLength=result.length;
        var fileLength=Math.floor(3*strLength/4);
        var fileLength1=Math.floor(strLength-(strLength/8)*2);
        this.lotteryLevelHandle='重新设置';
        this.hadSettingLevel='已设置级别'
      }
    });

  }

  addGoodsConfirm(){
    if(this.lotteryForm.invalid){
      return;
    }else{
      if(this.lotteryForm.value.typeId=='==请选择商品分类==') {
        this.dialog.open(ConfirmDialogComponent, {
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content": '请选择商品类型！'
          }
        } as MdDialogConfig);
      }else{
        if(!this.goodsImgBase64){
          this.dialog.open(ConfirmDialogComponent,{
            "panelClass": "custom-overlay-pane-class",
            "hasBackdrop": true,
            "backdropClass": "",
            "width": "280px",
            "height": "auto",
            "disableClose": false,
            "data": {
              "action": "警告",
              "content":'请选择商品图片！'
            }
          } as MdDialogConfig);
        }else{
          var data={
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val()),
            "photo":this.goodsImgBase64.split(",")[1]
          };
          let loadingDialogRef=this.dialog.open(LoadingDialogComponent,{
            "panelClass": "custom-overlay-pane-class",
            "hasBackdrop": true,
            "backdropClass": "",
            "width": "280px",
            "height": "auto",
            "disableClose": false,
            "data": {
            }
          } as MdDialogConfig);
          this.lotteryService.addLottery(data).subscribe((res)=>{
            if(res){
              loadingDialogRef.close();
              this.dialogRef.close(true);
            }else{
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "280px",
                "height": "auto",
                "disableClose": false,
                "data": {
                  "action": "警告",
                  "content":'保存失败！'
                }
              } as MdDialogConfig);
            }
          },error=>this.toastr.error('服务器错误！请稍后重试！'));
        }
      }
    }


  }

  updateGoodsConfirm() {
    if (this.lotteryForm.invalid) {
      return;
    } else {
      if (this.lotteryForm.value.typeId == '==请选择商品分类==') {
        this.dialog.open(ConfirmDialogComponent, {
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content": '请选择商品类型！'
          }
        } as MdDialogConfig);
      } else {
        var data;
        if (!this.goodsImgBase64) {
          data = {
            "id": this.lotteryId,
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val())
          };
        } else {
          data = {
            "id": this.lotteryId,
            "name": $("#goodsName").val(),
            "price": parseFloat($("#price").val()),
            "describe": $("#describe").val(),
            "typeId": parseInt($("#typeId").val()),
            "photo": this.goodsImgBase64.split(",")[1]
          };
        }
        this.lotteryService.updateLottery(data).subscribe((res)=> {
          if (res) {
            this.dialogRef.close(true);
          } else {
            this.toastr.error('修改失败！');
          }
        }, error=>this.toastr.error('修改失败！'));
      }

    }
  }

}
