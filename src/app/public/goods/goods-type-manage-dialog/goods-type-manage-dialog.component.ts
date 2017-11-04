import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {GoodsTypeService} from "../../../service/goods-type.service";
import {ToastrModule, ToastContainerDirective, ToastrService} from "ngx-toastr";
import {MD_DIALOG_DATA, MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {AddGoodsTypeComponent} from "../add-goods-type/add-goods-type.component";
import {GoodsService} from "../../../service/goods.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-goods-type-manage-dialog',
  templateUrl: './goods-type-manage-dialog.component.html',
  styleUrls: ['./goods-type-manage-dialog.component.css'],
  providers:[GoodsTypeService,GoodsService]
})
export class GoodsTypeManageDialogComponent implements OnInit {
  goodsTypes:Array<any>=[];
  goodsTypesStatus:Array<any>=[];
  waitForDelete:Array<any>=[];
  deleteResult:Array<any>=[];
  action:string;
  isCheckAll:boolean=true;

  constructor(private goodsTypeService:GoodsTypeService,
              private goodsService:GoodsService,
              private toastr:ToastrService,
              @Inject(MD_DIALOG_DATA) public dialogData:any,
              public dialog:MdDialog,
              public dialogRef:MdDialogRef<GoodsTypeManageDialogComponent>
  ) { }

  ngOnInit() {
    this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>{
      var GOODS_TYPES=data.slice(1);
      for(var i in GOODS_TYPES){
        this.goodsTypesStatus.push(GOODS_TYPES[i]['id']);
      }
      this.goodsTypes=GOODS_TYPES;
    },err => this.toastr.error('获取商品类别信息失败！'));
    this.action=this.dialogData['action'];
  }
  addGoodsType(){
    let AddGoodsTypeDialogRef=this.dialog.open(AddGoodsTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加商品类别"
      }
    } as MdDialogConfig);
    AddGoodsTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('添加成功！');
        this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>this.goodsTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
      }
    });
  }

  checkToDelete(e,id){
    $(e.target.parentNode.parentNode).toggleClass('danger');
    if($(e.target).prop('checked')){
      this.waitForDelete.push(id);
    }else{
      var index = this.waitForDelete.indexOf(id);
      if (index > -1) {
        this.waitForDelete.splice(index, 1);
      }
    }
  }

  checkAll(){
    for(var i in this.goodsTypesStatus){
      $('#checkBox'+this.goodsTypesStatus[i]).prop("checked",this.isCheckAll);
    }
    if(this.isCheckAll){
      $('#checkBoxTbody>tr').addClass('danger');
      this.waitForDelete=this.goodsTypesStatus.slice(0);
    }else{
      $('#checkBoxTbody>tr').removeClass('danger');
      this.waitForDelete.length=0;
    }
    this.isCheckAll=!this.isCheckAll;
  }
  deleteMultiGoodsTypeConfirm(){
    var waitForDeleteData={};
    for(var i in this.waitForDelete){
      waitForDeleteData['id'+i]=this.waitForDelete[i]
    }
    let deleteConfirmDialog=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "再次确认",
        "content": "这些商品类别下可能存在商品，同时删除这些商品？"
      }
    } as MdDialogConfig);
    deleteConfirmDialog.afterClosed().subscribe(result=>{
      if(result){
        this.goodsTypeService.deleteGoodsType(waitForDeleteData).subscribe((res)=>{
          if(res){
            this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>this.goodsTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
          }else{
            this.toastr.error('删除商品类别失败！请稍候重试！')
          }
        });
      }
    });
  }

  deleteGoodsTypeConfirm(id){
    this.goodsService.searchGoods({"typeId":parseInt(id)}).subscribe(data=>{
      if(data.length>1){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "300px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "警告",
            "content": "该商品类别下存在商品，禁止删除！"
          }
        } as MdDialogConfig);
      }else{
        let deleteDialog=this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "300px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "删除商品类别确认",
            "content": "确认删除？"
          }
        } as MdDialogConfig);
        deleteDialog.afterClosed().subscribe((res)=>{
          if(res){
            this.deleteGoodsType(id)
          }
        });
      }
    });
  }

  editGoodsType(id){
    let AddGoodsTypeDialogRef=this.dialog.open(AddGoodsTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改商品类别",
        "goodsTypeId": id
      }
    } as MdDialogConfig);
    AddGoodsTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('修改成功！');
        this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>this.goodsTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
      }
    }); 
  }

  deleteGoodsType(id){
    this.goodsTypeService.deleteGoodsType({"id":parseInt(id)}).subscribe(data=>{
      if(data){
        this.toastr.success('删除成功！');
        this.goodsTypeService.getAllGoodsTypes({}).subscribe(data=>this.goodsTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
      }else{
        this.toastr.error('删除商品类别失败，请稍候再试！');
      }
    },error=>{
      this.toastr.error('删除商品类别失败，请稍候再试！')
    });
  }



}
