import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {GoodsTypeService} from "../../../service/goods-type.service";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";
import {Validators, FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-add-goods-type',
  templateUrl: './add-goods-type.component.html',
  styleUrls: ['./add-goods-type.component.css'],
  providers:[GoodsTypeService]
})
export class AddGoodsTypeComponent implements OnInit {
  action:string;
  type;
  goodsTypeId;
  goodsTypes;
  goodsTypeForm;
  goodsTypeIsExist:boolean=false;
  goodsTypeValidate:boolean=false;
  isAddNew:boolean=true;
  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialog:MdDialog,
    private fb: FormBuilder,
    public toastr:ToastrService,
    public goodsTypeService:GoodsTypeService,
    public dialogRef:MdDialogRef<AddGoodsTypeComponent>
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.goodsTypeId=this.dialogData['goodsTypeId'];
    this.goodsTypeForm = this.fb.group({
      name: ['', [Validators.required] ]
    });
    if(this.goodsTypeId>0){
      this.isAddNew=false;
      this.goodsTypeService.getById(this.goodsTypeId).subscribe((res)=>{
        this.goodsTypeForm.setValue({
          name: res['name']||''
        });
      },err=>this.toastr.error('服务器错误！请稍候再试！'))
    }
    this.goodsTypeService.getAllGoodsTypes({}).subscribe((res)=>{
      if(!!res){
        this.goodsTypes=res.slice(1);
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
  }

  checkGoodsTypeExist(){
    for(var i in this.goodsTypes){
      if(this.goodsTypes[i]['name']==this.goodsTypeForm.value.name.replace(/(^\s*)|(\s*$)/g,"")){
        this.goodsTypeIsExist=true;
        return;
      }else{
        this.goodsTypeIsExist=false;
      }
    }
  }
  addGoodsType(){
    if(this.goodsTypeForm.invalid){
      return;
    }else{
      if(this.isAddNew){
        this.goodsTypeService.addGoodsType(this.goodsTypeForm.value).subscribe((res)=>{
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('添加失败！')
          }
        },err=>this.toastr.error('添加商品类型失败！请重试！'));
      }else{
        this.goodsTypeForm.value.id=this.goodsTypeId;
        this.goodsTypeService.updateGoodsType(this.goodsTypeForm.value).subscribe((res)=>{
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('修改失败！')
          }
        },err=>this.toastr.error('添加商品类型失败！请重试！'));
      }
    }
  }

}
