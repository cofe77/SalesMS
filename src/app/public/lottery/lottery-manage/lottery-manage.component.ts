import { Component, OnInit } from '@angular/core';
import {UpdateLotteryDialogComponent} from "../update-lottery-dialog/update-lottery-dialog.component";
import {ToastrService} from "ngx-toastr";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {LotteryService} from "../../../service/lottery.service";
import {LotteryDetailDialogComponent} from "../lottery-detail-dialog/lottery-detail-dialog.component";

@Component({
  selector: 'app-lottery-manage',
  templateUrl: './lottery-manage.component.html',
  styleUrls: ['./lottery-manage.component.css'],
  providers:[LotteryService]
})
export class LotteryManageComponent implements OnInit {
  goodsTypes:Array<any>;
  goodsTypesCount:number;
  goods:Array<any>;
  goodsPageArray:Array<any>;
  goodsPage:number=1;
  currentGoodsPage:number;
  goodsCount:number;
  goodsInitIsFinished:boolean=false;
  deleteStatus:Array<any>;
  constructor(
    public dialog:MdDialog,
    public lotteryService:LotteryService,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.initLotteryInfo(1);
  }

  initLotteryInfo(page){
    this.currentGoodsPage=page;
    this.lotteryService.getAllLottery({"row":10,"page":parseInt(page)}).subscribe(data=>{
      this.goods=data.slice(1);
      this.goodsCount=data[0]['count'];
      this.goodsPage=Math.ceil(this.goodsCount/10);
      var tempArray=[];
      for(var i=1;i<=this.goodsPage;i++){
        tempArray.push(''+i);
      }
      this.goodsPageArray=tempArray;
      this.goodsInitIsFinished=true;
    },err => this.toastr.error('获取抽奖列表失败！'));
  }

  addLottery(){
    let addOrUpdate=this.dialog.open(UpdateLotteryDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加抽奖"
      }
    } as MdDialogConfig);
    addOrUpdate.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('添加成功！');
        this.initLotteryInfo(this.currentGoodsPage);
      }

    });
  }


  showLotteryDetail(goodsId){
    this.dialog.open(LotteryDetailDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "800px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "goodsId":goodsId
      }
    } as MdDialogConfig);
  }

  editLottery(id){
    let addOrUpdate=this.dialog.open(UpdateLotteryDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action":"修改抽奖活动信息",
        "goodsImgHandle":"查看图片",
        "goodsId":id
      }
    } as MdDialogConfig);
    addOrUpdate.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('修改成功！');
        this.initLotteryInfo(this.currentGoodsPage);
      }

    });
  }

  deleteLottery(id,goodsName){
    let deleteDialog=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action":"删除商品",
        "content":'确认删除'+goodsName+'？'
      }
    } as MdDialogConfig);
    deleteDialog.afterClosed().subscribe(result=>{
      if(result){
        this.lotteryService.deleteLottery(id).subscribe((res)=>{
          if(res){
            this.toastr.success('删除成功！');
            this.initLotteryInfo(this.currentGoodsPage);
          }
        },error=>this.toastr.error('删除失败，请稍候再试！'))
      }
    })
  }

}
