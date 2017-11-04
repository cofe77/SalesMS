import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MdDialog, MD_DIALOG_DATA, MdDialogRef, MdDialogConfig} from "@angular/material";
import {GoodsDetailDialogComponent} from "../goods-detail-dialog/goods-detail-dialog.component";
import {AddOrUpdateGoodsDialogComponent} from "../add-or-update-goods-dialog/add-or-update-goods-dialog.component";
import {GoodsTypeManageDialogComponent} from "../goods-type-manage-dialog/goods-type-manage-dialog.component";
import {GoodsTypeService} from "../../../service/goods-type.service";
import {ToastrService, ToastContainerDirective} from "ngx-toastr";
import {GoodsService} from "../../../service/goods.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-goods-manage',
  templateUrl: './goods-manage.component.html',
  styleUrls: ['./goods-manage.component.css'],
  providers: [GoodsTypeService,GoodsService]
})
export class GoodsManageComponent implements OnInit {
  goodsTypes:Array<any>;
  goodsTypesCount:number;
  goods:Array<any>;
  goodsPageArray:Array<any>;
  goodsPage:number=1;
  currentGoodsPage:number;
  goodsCount:number;
  goodsInitIsFinished:boolean=false;
  deleteStatus:Array<any>;
  @ViewChild(ToastContainerDirective) toastContainer:ToastContainerDirective;
  constructor(
              public dialog:MdDialog,
              public goodsTypeService:GoodsTypeService,
              public goodsService:GoodsService,
              public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.toastr.overlayContainer=this.toastContainer;
    this.initGoodsInfo(1);
    this.initGoodsTypeInfo();
  }

  initGoodsInfo(page){
    this.currentGoodsPage=page;
    this.goodsService.searchGoods({"row":10,"page":parseInt(page)}).subscribe(data=>{
      this.goods=data.slice(1);
      this.goodsCount=data[0]['count'];
      this.goodsPage=Math.ceil(this.goodsCount/10);
      var tempArray=[];
      for(var i=1;i<=this.goodsPage;i++){
        tempArray.push(''+i);
      }
      this.goodsPageArray=tempArray;
      this.goodsInitIsFinished=true;
    },err => this.toastr.error('获取商品列表失败！'));
  }

  initGoodsTypeInfo(){
    this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>{
      this.goodsTypes=data.slice(1);
    },err => this.toastr.error('获取商品类别信息失败！'));
  }

  searchGoods(name,typeId){
    var data;
    if(name==''){
      if(typeId==''){
        data={};
      }else{
        data={"typeId":parseInt(typeId)};
      }
    }else{
      if(typeId==''){
        data={"name":name};
      }else{
        data={"name":name,"typeId":parseInt(typeId)};
      }
    }
    this.goodsService.searchGoods(data).subscribe((res)=>{
      this.goods=res.slice(1);
    });
  }

  addGoods(){
    let addOrUpdate=this.dialog.open(AddOrUpdateGoodsDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加商品"
      }
    } as MdDialogConfig);
    addOrUpdate.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('添加成功！');
        this.initGoodsTypeInfo();
        this.initGoodsInfo(this.currentGoodsPage);
      }

    });
  }

  goodsTypeManage(){
    let goodsTypeManageDialogRef=this.dialog.open(GoodsTypeManageDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "商品类别管理"
      }
    } as MdDialogConfig);
    goodsTypeManageDialogRef.afterClosed().subscribe(result=>{
      this.initGoodsTypeInfo()
      this.initGoodsInfo(this.currentGoodsPage);
    });
  }


  showGoodsDetail(goodsId){
    this.dialog.open(GoodsDetailDialogComponent,{
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

  editGoods(id){
    let addOrUpdate=this.dialog.open(AddOrUpdateGoodsDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action":"修改商品信息",
        "goodsImgHandle":"查看图片",
        "goodsId":id
      }
    } as MdDialogConfig);
    addOrUpdate.afterClosed().subscribe((res)=>{
      if(res){
        this.toastr.success('修改成功！');
        this.initGoodsTypeInfo();
        this.initGoodsInfo(this.currentGoodsPage);
      }

    });
  }

  deleteGoods(id,goodsName){
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
        this.goodsService.deleteGoods(id).subscribe((res)=>{
          if(res){
            this.toastr.success('删除成功！');
            this.initGoodsInfo(this.currentGoodsPage);
          }
        },error=>this.toastr.error('删除失败，请稍候再试！'))
      }
    })
  }


}
