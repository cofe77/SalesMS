import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MdDialogConfig, MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {ToastContainerDirective, ToastrService} from "ngx-toastr";
import {DeskService} from "../../../service/desk.service";
import {AddDesksTypeComponent} from "../add-desks-type/add-desks-type.component";
import {DeskTypesService} from "../../../service/desk-types.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-desks-type-manage-dialog',
  templateUrl: './desks-type-manage-dialog.component.html',
  styleUrls: ['./desks-type-manage-dialog.component.css'],
  providers:[DeskTypesService,DeskService]
})
export class DesksTypeManageDialogComponent implements OnInit {

  deskTypes:Array<any>=[];
  statusResult:Array<any>=[];
  deleteResult:Array<any>=[];
  deskTypesStatus:Array<any>=[];
  waitForDelete:Array<any>=[];
  action:string;
  isCheckAll:boolean=true;
  goodsTypeIsChanged:boolean=false;

  constructor(private deskTypesService:DeskTypesService,
              private deskService:DeskService,
              private toastr:ToastrService,
              @Inject(MD_DIALOG_DATA) public dialogData:any,
              public dialog:MdDialog,
              public dialogRef:MdDialogRef<DesksTypeManageDialogComponent>
  ) { }

  ngOnInit() {
    this.deskTypesService.getAllDeskTypes({}).subscribe(data=>{
      var GOODS_TYPES=data.slice(1);
      for(var i in GOODS_TYPES){
        this.deskTypesStatus.push(GOODS_TYPES[i]['id']);
      }
      this.deskTypes=GOODS_TYPES;
    },err => this.toastr.error('获取桌位类别信息失败！'));
    this.action=this.dialogData['action'];
  }
  addDeskType(){
    let AddGoodsTypeDialogRef=this.dialog.open(AddDesksTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加桌位类别"
      }
    } as MdDialogConfig);
    AddGoodsTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deskTypesService.getAllDeskTypes({}).subscribe((res)=>{
          this.deskTypes=res.slice(1);
        },err=>this.toastr.error('获取桌位分类失败！请稍后重试！'));
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
    for(var i in this.deskTypesStatus){
      $('#checkBox'+this.deskTypesStatus[i]).prop("checked",this.isCheckAll);
    }
    if(this.isCheckAll){
      $('#checkBoxTbody>tr').addClass('danger');
      this.waitForDelete=this.deskTypesStatus.slice(0);
    }else{
      $('#checkBoxTbody>tr').removeClass('danger');
      this.waitForDelete.length=0;
    }
    this.isCheckAll=!this.isCheckAll;
  }
  // deleteMultiDeskTypeConfirm(){
  //   var waitForDeleteData={};
  //   for(var i in this.waitForDelete){
  //     waitForDeleteData['id'+i]=this.waitForDelete[i]
  //   }
  //   let deleteConfirmDialog=this.dialog.open(ConfirmDialogComponent,{
  //     "panelClass": "custom-overlay-pane-class",
  //     "hasBackdrop": true,
  //     "backdropClass": "",
  //     "width": "300px",
  //     "height": "auto",
  //     "disableClose": true,
  //     "data": {
  //       "action": "再次确认",
  //       "content": "这些桌位类别下可能存在桌位，同时删除这些桌位？"
  //     }
  //   } as MdDialogConfig);
  //   deleteConfirmDialog.afterClosed().subscribe(result=>{
  //     if(result){
  //       this.deskTypesService.deleteDeskType(waitForDeleteData).subscribe((res)=>{
  //         if(res){
  //           this.deskTypesService.getAllDeskTypes({}).subscribe(data=>this.deskTypes=data.slice(1),err => this.toastr.error('获取桌位类别信息失败！'));
  //         }else{
  //           this.toastr.error('删除桌位类别失败！请稍候重试！')
  //         }
  //       });
  //     }
  //   });
  // }

  deleteDeskTypeConfirm(id){
    this.deskService.search({"typeId":parseInt(id)}).subscribe(data=>{
      if(data.length>1){
        let deleteDialog=this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "300px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "禁用桌位类别确认",
            "content": "该桌位类别下存在桌位，禁止删除！"
          }
        } as MdDialogConfig);
      }else{
        this.deleteGoodsType(id)
      }
    });
  }

  editDeskType(id){
    let addDesksTypeDialogRef=this.dialog.open(AddDesksTypeComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "300px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改桌位类别",
        "deskTypeId": id
      }
    } as MdDialogConfig);
    addDesksTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deskTypesService.getAllDeskTypes({}).subscribe(data=>this.deskTypes=data.slice(1),err => this.toastr.error('获取桌位类别信息失败！'));
      }
    });
  }

  deleteGoodsType(id){
    this.deskTypesService.deleteDeskType({"id":parseInt(id)}).subscribe(data=>{
      if(data){
        this.toastr.success('删除成功！');
        this.deskTypesService.getAllDeskTypes({}).subscribe(data=>this.deskTypes=data.slice(1),err => this.toastr.error('获取桌位类别信息失败！'));
      }else{
        this.toastr.error('删除桌位类别失败，请稍候再试！');
      }
    },error=>{
      this.toastr.error('删除桌位类别失败，请稍候再试！')
    });
  }
}
