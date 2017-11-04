import {Component, OnInit, Inject} from '@angular/core';
import {AddVipTypeComponent} from "../add-vip-type/add-vip-type.component";
import {VipTypeService} from "../../../service/vip-type.service";
import {VipService} from "../../../service/vip.service";
import {ToastrService} from "ngx-toastr";
import {MD_DIALOG_DATA, MdDialog, MdDialogRef, MdDialogConfig} from "@angular/material";
import {GoodsTypeManageDialogComponent} from "../../goods/goods-type-manage-dialog/goods-type-manage-dialog.component";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-vip-type-manage',
  templateUrl: './vip-type-manage.component.html',
  styleUrls: ['./vip-type-manage.component.css'],
  providers:[VipTypeService,VipService]
})
export class VipTypeManageComponent implements OnInit {

  vipTypes:Array<any>=[];
  vipTypesStatus:Array<any>=[];
  waitForDelete:Array<any>=[];
  deleteResult:Array<any>=[];
  action:string;
  isCheckAll:boolean=true;
  // @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  constructor(private vipTypeService:VipTypeService,
              private vipService:VipService,
              private toastr:ToastrService,
              @Inject(MD_DIALOG_DATA) public dialogData:any,
              public dialog:MdDialog,
              public dialogRef:MdDialogRef<GoodsTypeManageDialogComponent>
  ) { }

  ngOnInit() {
    this.vipTypeService.getAllVipTypes({}).subscribe(data=>{
      var GOODS_TYPES=data.slice(1);
      for(var i in GOODS_TYPES){
        this.vipTypesStatus.push(GOODS_TYPES[i]['id']);
      }
      this.vipTypes=GOODS_TYPES;
    },err => this.toastr.error('获取商品类别信息失败！'));
    // this.toastr.overlayContainer = this.toastContainer;
    this.action=this.dialogData['action'];
  }


  addVipType(){
    let AddVipTypeDialogRef=this.dialog.open(AddVipTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加会员等级"
      }
    } as MdDialogConfig);
    AddVipTypeDialogRef.afterClosed().subscribe(result=>{
      if(!!result){
        this.toastr.success('添加成功！');
        this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
      }
    });

    // let AddVipTypeDialogRef=this.dialog.open(AddVipTypeComponent,{
    //   "panelClass": "custom-overlay-pane-class",
    //   "hasBackdrop": true,
    //   "backdropClass": "",
    //   "width": "300px",
    //   "height": "auto",
    //   "disableClose": true,
    //   "data": {
    //     "action": "添加会员类别"
    //   }
    // } as MdDialogConfig);
    // AddVipTypeDialogRef.afterClosed().subscribe(result=>{
    //   if(result!=''){
    //     this.vipTypeService.addVipType(result).subscribe(data=>{
    //       if (data){
    //         this.toastr.success('添加成功！');
    //         this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
    //       }else{
    //         this.toastr.error('添加失败！');
    //       }
    //     });
    //   }
    // });
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
    for(var i in this.vipTypesStatus){
      $('#checkBox'+this.vipTypesStatus[i]).prop("checked",this.isCheckAll);
    }
    if(this.isCheckAll){
      $('#checkBoxTbody>tr').addClass('danger');
      this.waitForDelete=this.vipTypesStatus.slice(0);
    }else{
      $('#checkBoxTbody>tr').removeClass('danger');
      this.waitForDelete.length=0;
    }
    this.isCheckAll=!this.isCheckAll;
  }
  deleteMultiVipTypeConfirm(){
    var waitForDeleteData={};
    for(var i in this.waitForDelete){
      if(this.waitForDelete[i]>=2){
        waitForDeleteData['id'+i]=this.waitForDelete[i]
      }
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
        this.vipTypeService.deleteVipType(waitForDeleteData).subscribe((res)=>{
          if(res){
            this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
          }else{
            this.toastr.error('删除商品类别失败！请稍候重试！')
          }
        });
      }
    });
  }

  deleteVipTypeConfirm(id){
    this.vipService.search({"typeId":parseInt(id)}).subscribe(data=>{
      if(data.length>1){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "300px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "删除VIP等级确认",
            "content": "该等级下存在VIP，禁止删除！"
          }
        } as MdDialogConfig);
      }else{
        this.deleteVipType(id)
      }
    });
  }

  editVipType(id){
    let AddGoodsTypeDialogRef=this.dialog.open(AddVipTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改会员等级",
        "vipTypeId":id
      }
    } as MdDialogConfig);
    AddGoodsTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('修改成功！');
        this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取会员等级信息失败！'));
      }
    });
  }

  deleteVipType(id){
    this.vipService.search({"typeId":parseInt(id)}).subscribe(data=>{
      if(data.length>1){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "300px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "删除会员类别确认",
            "content": "该会员类别下存在会员，禁止删除！"
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
            "action": "删除会员类别确认",
            "content": "确认删除？"
          }
        } as MdDialogConfig);
        deleteDialog.afterClosed().subscribe((res)=>{
          if(res){
            this.vipTypeService.deleteVipType({"id":parseInt(id)}).subscribe(data=>{
              if(data){
                this.toastr.success('删除成功！');
                this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data.slice(1),err => this.toastr.error('获取商品类别信息失败！'));
              }else{
                this.toastr.error('删除商品类别失败，请稍候再试！');
              }
            },error=>{
              this.toastr.error('删除商品类别失败，请稍候再试！')
            });
          }
        });
      }
    });
  }



}
