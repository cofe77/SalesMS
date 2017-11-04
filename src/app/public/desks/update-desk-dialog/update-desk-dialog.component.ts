import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogConfig, MdDialog, MdDialogRef} from "@angular/material";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DeskTypesService} from "../../../service/desk-types.service";
import {DeskService} from "../../../service/desk.service";
import {AddDesksTypeComponent} from "../add-desks-type/add-desks-type.component";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-update-desk-dialog',
  templateUrl: './update-desk-dialog.component.html',
  styleUrls: ['./update-desk-dialog.component.css'],
  providers:[DeskTypesService,DeskService]
})
export class UpdateDeskDialogComponent implements OnInit {
  action:string;
  deskId:number;
  desk;
  desks;
  isAddNew:boolean=true;
  isUpdate:boolean=false;
  nameIsExist:boolean=false;
  deskNumberIsExist:boolean=false;
  deskForm:FormGroup;
  deskTypes;
  constructor(@Inject(MD_DIALOG_DATA) public data:any,
              public dialog:MdDialog,
              public dialogRef:MdDialogRef<UpdateDeskDialogComponent>,
              public toastr:ToastrService,
              public deskService:DeskService,
              public deskTypesService:DeskTypesService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.action=this.data['action'];
    this.initAllDeskTypes();
    this.initAllDesks();
    this.deskForm = this.fb.group({
      name: ['', [Validators.required] ],
      deskNumber: ['', [Validators.required]],
      typeId: ['', [Validators.required]]
    });
    if(this.action==='修改桌位信息'){
      this.isAddNew=false;
      this.deskId=this.data['deskId'];
      this.deskService.getDeskDetail(this.deskId).subscribe(data=>{
        if(!!data){
          this.desk=data;
          this.deskForm.setValue({
            name: this.desk['name']||'',
            deskNumber: this.desk['deskNumber']||'',
            typeId: this.desk['typeId']||''
          });
        }else{
          this.toastr.error('获取桌位信息失败！请稍后重试！')
        }
      },err=>this.toastr.error('服务器错误！请稍候重试！'));
    }
  }

  initAllDesks(){
    this.deskService.getAllDesks({}).subscribe(data=>{
      if(!!data){
        this.desks=data.slice(1);
      }else{
        this.toastr.error('获取桌子列表失败！请稍后重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  initAllDeskTypes(){
    this.deskTypesService.getAllDeskTypes({}).subscribe((res)=>{
      if(!!res){
        this.deskTypes=res.slice(1);
      }else{
        this.toastr.error('获取桌位分类失败！请稍后重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  addDeskType(){
    let addDesksTypeRef=this.dialog.open(AddDesksTypeComponent,{
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
    addDesksTypeRef.afterClosed().subscribe(result=>{
      if(result){
        this.initAllDeskTypes();
      }
    });
  }

  checkNameIsExist(){
      for(var i in this.desks){
        if(this.desks[i]['name']==this.deskForm.value.name.replace(/(^\s*)|(\s*$)/g,"")){
          this.nameIsExist=true;
          return;
        }else{
          this.nameIsExist=false;
        }
      }
  }
  checkDeskNumberIsExist(){
    for(var i in this.desks){
      if(this.desks[i]['deskNumber']==this.deskForm.value.deskNumber.replace(/(^\s*)|(\s*$)/g,"")){
        this.deskNumberIsExist=true;
        return;
      }else{
        this.deskNumberIsExist=false;
      }
    }
  }

  checkDeskNumberIsUpdate(){
    this.checkDeskNumberIsExist()
    if(this.deskForm.value.deskNumber==this.desk['deskNumber']){
      delete this.deskForm.value.deskNumber;
      this.deskForm.value.typeId=Number(this.deskForm.value.typeId)
    }
    if(!this.deskForm.value.hasOwnProperty('name')&&!this.deskForm.value.hasOwnProperty('deskNumber')&&!this.deskForm.value.hasOwnProperty('typeId')){
      this.isUpdate=false;
    }else{
      this.isUpdate=true;
    }
  }

  checkNameIsUpdate(){
    this.checkNameIsExist()
    if(this.deskForm.value.name==this.desk['name']){
      delete this.deskForm.value.name;
      this.deskForm.value.typeId=Number(this.deskForm.value.typeId)
    }
    if(!this.deskForm.value.hasOwnProperty('name')&&!this.deskForm.value.hasOwnProperty('deskNumber')&&!this.deskForm.value.hasOwnProperty('typeId')){
      this.isUpdate=false;
    }else{
      this.isUpdate=true;
    }
  }

  checkTypeIdIsUpdate(){
    if(this.deskForm.value.typeId==this.desk['typeId']){
      delete this.deskForm.value.typeId;
    }
    if(!this.deskForm.value.hasOwnProperty('name')&&!this.deskForm.value.hasOwnProperty('deskNumber')&&!this.deskForm.value.hasOwnProperty('typeId')){
      this.isUpdate=false;
    }else{
      this.isUpdate=true;
    }
  }

  updateDeskConfirm(){
    if(this.deskForm.invalid){
      return;
    }else{
      if(this.deskForm.value.typeId=='==请选择桌位类别=='){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": false,
          "data": {
            "action": "警告",
            "content":'请选择桌位类别！'
          }
        } as MdDialogConfig);
      }else{
        if(this.isAddNew){
          this.deskForm.value.typeId=Number(this.deskForm.value.typeId)
          this.deskService.addDesk(this.deskForm.value).subscribe((res)=>{
            if(!!res){
              this.dialogRef.close(true);
            }else{
              this.toastr.error('添加桌位失败！请重试！')
            }
          },err=>this.toastr.error('服务器错误！请稍候重试！'));
        }else{
          this.deskForm.value.id=this.deskId;
          this.deskService.updateDesk(this.deskForm.value).subscribe((res)=>{
            if(!!res){
              this.dialogRef.close(true);
            }else{
              this.toastr.error('修改桌位信息失败！请重试！')
            }
          },err=>this.toastr.error('服务器错误！请稍候重试！'));
        }
      }
    }


  }

}
