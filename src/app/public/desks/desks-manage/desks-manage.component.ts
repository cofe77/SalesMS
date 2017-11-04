import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogConfig} from "@angular/material";
import {UpdateDeskDialogComponent} from "../update-desk-dialog/update-desk-dialog.component";
import {ShowDeskQRCodeDialogComponent} from "../show-desk-qrcode-dialog/show-desk-qrcode-dialog.component";
import {DesksTypeManageDialogComponent} from "../desks-type-manage-dialog/desks-type-manage-dialog.component";
import {DeskService} from "../../../service/desk.service";
import {ToastrService} from "ngx-toastr";
import {DeskTypesService} from "../../../service/desk-types.service";
import {AddDesksTypeComponent} from "../add-desks-type/add-desks-type.component";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-desks-manage',
  templateUrl: './desks-manage.component.html',
  styleUrls: ['./desks-manage.component.css'],
  providers:[DeskService,DeskTypesService]
})
export class DesksManageComponent implements OnInit {
  deskTypes;
  desks;
  deskPageArray:Array<any>;
  deskPage:number=1;
  currentDeskPage:number=1;
  deskCount:number;
  deskInitIsFinished:boolean=false;
  constructor(
    public dialog:MdDialog,
    public deskService:DeskService,
    public deskTypesService:DeskTypesService,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.initDeskInfo(this.currentDeskPage);
  }

  initDeskInfo(page){
    this.currentDeskPage=page;
    this.initDeskTypeInfo();
    this.deskService.search({"row":10,"page":parseInt(page)}).subscribe(data=>{
      this.desks=data.slice(1);
      this.deskCount=data[0]['count'];
      this.deskPage=Math.ceil(this.deskCount/10);
      var tempArray=[];
      for(var i=1;i<=this.deskPage;i++){
        tempArray.push(''+i);
      }
      this.deskPageArray=tempArray;
      this.deskInitIsFinished=true;
    },err => this.toastr.error('获取桌子列表失败！'));
  }

  initDeskTypeInfo(){
    this.deskTypesService.getAllDeskTypes({}).subscribe(data=>{
      this.deskTypes=data.slice(1);
    },err => this.toastr.error('获取桌子类别信息失败！'));
  }

  addDesk(){
    let addDeskDialogRef=this.dialog.open(UpdateDeskDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "添加桌位"
      }
    } as MdDialogConfig);
    addDeskDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('添加桌位成功！');
        this.initDeskTypeInfo();
        this.initDeskInfo(this.currentDeskPage);
      }
    });
  }

  deskTypeManage(){
    let desksTypeManageDialogRef=this.dialog.open(DesksTypeManageDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "400px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "桌位类别管理"
      }
    } as MdDialogConfig);
    desksTypeManageDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.initDeskTypeInfo();
        this.initDeskInfo(this.currentDeskPage);
      }
    });
  }

  addDeskType(){
    let addDesksTypeDialogRef=this.dialog.open(AddDesksTypeComponent,{
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
    addDesksTypeDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('添加桌位类别成功！');
        this.initDeskTypeInfo();
        this.initDeskInfo(this.currentDeskPage);
      }
    });
  }

  updateDesk(id){
    let updateDeskDialogRef=this.dialog.open(UpdateDeskDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改桌位信息",
        "deskId": id,
      }
    } as MdDialogConfig);
    updateDeskDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.toastr.success('保存修改成功！');
        this.initDeskTypeInfo();
        this.initDeskInfo(this.currentDeskPage);
      }
    });
  }

  showDeskQRCode(id){
    let desksTypeManageDialogRef=this.dialog.open(ShowDeskQRCodeDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "修改桌位信息",
        "deskId": id
      }
    } as MdDialogConfig);
  }
  updateDeskStatus(){
    let updateDeskStatusDialogRef=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "280px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "改变桌位状态",
        "content":'确认禁用？'
      }
    } as MdDialogConfig);
    updateDeskStatusDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.initDeskTypeInfo();
        this.initDeskInfo(this.currentDeskPage);
      }
    });
  }
  deleteDesk(id){
    let deleteDeskDialogRef=this.dialog.open(ConfirmDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "280px",
      "height": "auto",
      "disableClose": true,
      "data": {
        "action": "删除桌位确认",
        "content":'确认删除？'
      }
    } as MdDialogConfig);
    deleteDeskDialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.deskService.getUserDeskDetail(id).subscribe((res)=>{
          if(!!res){
            if(res['orderId']>0){
              this.dialog.open(ConfirmDialogComponent,{
                "panelClass": "custom-overlay-pane-class",
                "hasBackdrop": true,
                "backdropClass": "",
                "width": "280px",
                "height": "auto",
                "disableClose": true,
                "data": {
                  "action": "警告",
                  "content":'本桌位正在使用！禁止删除！'
                }
              } as MdDialogConfig);
            }else{
              this.deskService.delete(id).subscribe((deleteRes)=>{
                if(deleteRes){
                  this.toastr.success('删除桌位成功！');
                  this.initDeskTypeInfo();
                  this.initDeskInfo(this.currentDeskPage);
                }else{
                  this.toastr.error('删除桌位失败！请重试！')
                }
              },err=>this.toastr.error('服务器错误！请稍后重试！'));
            }
          }
        },err=>this.toastr.error('服务器错误！请稍后重试！'));
      }else{
        this.deskService.delete(id).subscribe((res)=>{
          if(res){
            this.toastr.success('删除桌位成功！');
            this.initDeskTypeInfo();
            this.initDeskInfo(this.currentDeskPage);
          }else{
            this.toastr.error('删除桌位失败！请重试！')
          }
        },err=>this.toastr.error('服务器错误！请稍后重试！'));
      }
    });
  }

}
