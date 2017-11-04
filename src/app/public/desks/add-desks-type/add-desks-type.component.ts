import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {DeskTypesService} from "../../../service/desk-types.service";
import {ToastrService} from "ngx-toastr";
import {Validators, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-add-desks-type',
  templateUrl: './add-desks-type.component.html',
  styleUrls: ['./add-desks-type.component.css'],
  providers:[DeskTypesService]
})
export class AddDesksTypeComponent implements OnInit {
  action:string;
  type;
  deskTypeId;
  deskTypes;
  deskTypeForm;
  deskTypeIsExist:boolean=false;
  deskTypeValidate:boolean=false;
  isAddNew:boolean=true;
  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialogRef:MdDialogRef<AddDesksTypeComponent>,
    public toastr:ToastrService,
    private fb: FormBuilder,
    public deskTypesService:DeskTypesService
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
    this.deskTypeId=this.dialogData['deskTypeId'];
    this.deskTypeForm = this.fb.group({
      name: ['', [Validators.required] ]
    });
    if(this.deskTypeId>0){
      this.isAddNew=false;
      this.deskTypesService.getById(this.deskTypeId).subscribe((res)=>{
        this.deskTypeForm.setValue({
          name: res['name']||''
        });
      },err=>this.toastr.error('服务器错误！请稍候再试！'))
    }
    this.deskTypesService.getAllDeskTypes({}).subscribe((res)=>{
      if(!!res){
        this.deskTypes=res.slice(1);
      }
    },err=>this.toastr.error('服务器错误！请重试！'));
  }

  checkDeskTypeExist(){
    for(var i in this.deskTypes){
      if(this.deskTypes[i]['name']==this.deskTypeForm.value.name.replace(/(^\s*)|(\s*$)/g,"")){
        this.deskTypeIsExist=true;
        return;
      }else{
        this.deskTypeIsExist=false;
      }
    }
  }

  addDeskType(){
    if(this.deskTypeForm.invalid){
      return;
    }else{
      if(this.isAddNew){
        this.deskTypesService.addDeskType(this.deskTypeForm.value).subscribe((res)=>{
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('添加失败！')
          }
        },err=>this.toastr.error('添加桌位类型失败！请重试！'));
      }else{
        this.deskTypeForm.value.id=this.deskTypeId;
        this.deskTypesService.updateDeskType(this.deskTypeForm.value).subscribe((res)=>{
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('修改失败！')
          }
        },err=>this.toastr.error('添加桌位类型失败！请重试！'));
      }
    }

  }
}
