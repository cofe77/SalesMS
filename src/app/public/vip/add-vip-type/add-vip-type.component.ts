import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {VipTypeService} from "../../../service/vip-type.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-vip-type',
  templateUrl: './add-vip-type.component.html',
  styleUrls: ['./add-vip-type.component.css'],
  providers:[VipTypeService]
})
export class AddVipTypeComponent implements OnInit {
  action:string;
  vipTypeId:number;
  vipTypeData;
  vipTypes;
  isAddNew:boolean=true;
  vipTypeIsExist:boolean=false;
  vipTypeForm:FormGroup;
  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public goodsTypeDialogRef:MdDialogRef<AddVipTypeComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public vipTypeService:VipTypeService
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.vipTypeId=this.dialogData['vipTypeId'];
    this.vipTypeForm = this.fb.group({
      name: ['', [Validators.required] ],
      discount: ['', [Validators.required]]
    });
    this.vipTypeService.getAllVipTypes({}).subscribe(data=>this.vipTypes=data,err => this.toastr.error('获取会员等级信息失败！'));
    if(this.vipTypeId>0){
      this.isAddNew=false;
      this.vipTypeService.getVipTypeById(this.vipTypeId).subscribe((res)=>{
        if(!!res){
          this.vipTypeData=res;
          this.vipTypeForm.setValue({
            name: this.vipTypeData['name']||'',
            discount: this.vipTypeData['discount']||''
          });
        }
      },err=>this.toastr.error('服务器错误！请稍后重试！'));
    }
  }

  checkVipTypeIsExist(){
    for(var i in this.vipTypes){
      if(this.vipTypes[i]['name']==this.vipTypeForm.value.name.replace(/(^\s*)|(\s*$)/g,"")){
        this.vipTypeIsExist=true;
        return;
      }else{
        this.vipTypeIsExist=false;
      }
    }
  }

  addVipType(){
    if(this.vipTypeForm.invalid){
      return;
    }else{
      if(this.isAddNew){
        this.vipTypeService.addVipType(this.vipTypeForm.value).subscribe(data=>{
          if (data){
            this.goodsTypeDialogRef.close(true);
          }else{
            this.toastr.error('添加失败！');
          }
        });
      }else{
        this.vipTypeForm.value.id=this.vipTypeId;
        this.vipTypeService.updateVipType(this.vipTypeForm.value).subscribe(data=>{
          if (data){
            this.goodsTypeDialogRef.close(true);
          }else{
            this.toastr.error('修改失败！');
          }
        });
      }
    }

  }

}
