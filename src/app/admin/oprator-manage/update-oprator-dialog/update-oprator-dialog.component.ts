import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialog, MdDialogRef} from "@angular/material";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {OperatorService} from "../../../service/operator.service";
import {ToastrService} from "ngx-toastr";
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-update-oprator-dialog',
  templateUrl: './update-oprator-dialog.component.html',
  styleUrls: ['./update-oprator-dialog.component.css'],
  providers:[OperatorService]
})
export class UpdateOpratorDialogComponent implements OnInit {
  operatorAddIsFinish:boolean=false;
  action:string;
  operatorForm:FormGroup;
  operatorId:number;
  operator;
  operators;
  isAddNew:boolean=true;
  isUpdate:boolean=false;
  operatorMobileNumIsExist:boolean=false;
  mobileNumberIsExist:boolean=false;
  constructor(@Inject(MD_DIALOG_DATA) public data:any,
              public dialog:MdDialog,
              public dialogRef:MdDialogRef<UpdateOpratorDialogComponent>,
              public toastr:ToastrService,
              public operatorService:OperatorService,
              private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.action=this.data['action'];
    this.initAllOperators();
    if(this.action==='修改操作员信息'){
      this.isAddNew=false;
      this.operatorForm = this.fb.group({
        name: ['', [Validators.required] ],
        mobileNum: ['', [Validators.required]]
      });
      this.operatorId=this.data['operatorId'];
      this.operatorService.getOperatorById(this.operatorId).subscribe(data=>{
        if(!!data){
          this.operator=data;
          this.operatorForm.setValue({
            name: this.operator['name']||'',
            mobileNum: this.operator['mobileNum']||'',
          });
        }else{
          this.toastr.error('获取操作员信息失败！请重试！')
        }
      },err=>this.toastr.error('服务器错误！请稍候重试！'));
    }else{
      this.operatorForm = this.fb.group({
        name: ['', [Validators.required] ],
        mobileNum: ['', [Validators.required]],
        firstPsw: ['', [Validators.required] ],
        secondPsw: ['', [Validators.required] ],
        permission: ['', [Validators.required] ]
      });
    }
  }

  checkOperatorMobileNumIsExist(){
    for(var i in this.operators){
      if(this.operators[i]['mobileNum']==this.operatorForm.value.mobileNum.replace(/(^\s*)|(\s*$)/g,"")){
        this.operatorMobileNumIsExist=true;
        return;
      }else{
        this.operatorMobileNumIsExist=false;
      }
    }
  }

  initAllOperators(){
    this.operatorService.getAll({}).subscribe(data=>{
      if(!!data){
        this.operators=data.slice(1);
      }else{
        this.toastr.error('获取桌子列表失败！请稍后重试！')
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }


  updateOperatorConfirm(){
    if(this.operatorForm.invalid){
      return;
    }else{
      var data;
      if(this.isAddNew){
        var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
        var prePasswordStr=$('#addNewSecondPsw').val();
        var confoundStrArray=[];
        var passwordArray=[];
        for(var i=0;i<confoundStr.length;i++){
          confoundStrArray.push(confoundStr.charAt(i));
        }
        for(var i=0;i<prePasswordStr.length;i++){
          passwordArray.push(prePasswordStr.charAt(i)+''+confoundStrArray[i]);
        }
        data={
          name:$('#addNewName').val(),
          mobileNum:$('#addNewMobileNum').val(),
          password:passwordArray.join(''),
          permission:Number($('#addNewPermission').val())
        };
        this.operatorService.addOperator(data).subscribe((res)=>{
          $('#addNewFirstPsw').val('');
          $('#addNewSecondPsw').val('');
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('添加操作员失败！请重试！')
          }
        },err=>{
          $('#addNewFirstPsw').val('');
          $('#addNewSecondPsw').val('');
          this.toastr.error('服务器错误！请稍候重试！')
        });
      }else{
        data={
          id:this.operatorId,
          name:$('#newName').val(),
          mobileNum:$('#mobileNum').val()
        };
        this.operatorService.update(data).subscribe((res)=>{
          if(!!res){
            this.dialogRef.close(true);
          }else{
            this.toastr.error('修改操作员信息失败！请重试！')
          }
        },err=>{
          this.toastr.error('服务器错误！请稍候重试！')
        });
      }
    }

  }

}
