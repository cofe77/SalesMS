import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {LotteryService} from "../../../service/lottery.service";
import {LotteryLevelService} from "../../../service/lottery-level.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {LoadingDialogComponent} from "../../layer/loading-dialog/loading-dialog.component";
import {UpdateLotteryLevelDialogComponent} from "../update-lottery-level-dialog/update-lottery-level-dialog.component";

@Component({
  selector: 'app-lottery-level-manage-dialog',
  templateUrl: './lottery-level-manage-dialog.component.html',
  styleUrls: ['./lottery-level-manage-dialog.component.css'],
  providers:[LotteryService,LotteryLevelService]
})
export class LotteryLevelManageDialogComponent implements OnInit {
  action:string;
  isAddNew:boolean=false;
  lotteryId:number;
  name:string;
  goodsImgBase64:string;
  goods:Array<any>;

  constructor(@Inject(MD_DIALOG_DATA) public dialogData:any,
              private dialog:MdDialog,
              public lotteryLevelService:LotteryLevelService,
              public lotteryService:LotteryService,
              public toastr:ToastrService,
              public dialogRef:MdDialogRef<LotteryLevelManageDialogComponent>,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.lotteryId=this.dialogData['lotteryId'];
    if(this.action==='修改活动信息'){
      this.isAddNew=true;
      this.lotteryService.getById(this.lotteryId).subscribe(data=>{
        this.goods=data;
      },error=>this.toastr.error('获取商品信息失败！'));
    }
  }


  addLotteryLevel(){
    let updateLotteryLevelDialogRef=this.dialog.open(UpdateLotteryLevelDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "600px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加抽奖级别消费区间"
      }
    } as MdDialogConfig);
    updateLotteryLevelDialogRef.afterClosed().subscribe(result=>{
      if(!!result){

      }
    });

  }

  editLotteryLevel(){
    let updateLotteryLevelDialogRef=this.dialog.open(UpdateLotteryLevelDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "600px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改抽奖级别消费区间"
      }
    } as MdDialogConfig)
    updateLotteryLevelDialogRef.afterClosed().subscribe(result=>{
      if(!!result){

      }
    });

  }

  deleteLotteryLevel(){
  }
  deleteAllLotteryLevel(){
  }

}
