import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, MdDialogConfig, MdDialog} from "@angular/material";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {VipService} from "../../service/vip.service";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../layer/confirm-dialog/confirm-dialog.component";
import {OperatorService} from "../../service/operator.service";
import {Md5} from "ts-md5/dist/md5";

@Component({
  selector: 'app-update-password-dialog',
  templateUrl: './update-password-dialog.component.html',
  styleUrls: ['./update-password-dialog.component.css'],
  providers:[VipService,OperatorService]
})
export class UpdatePasswordDialogComponent implements OnInit {
  action:string;
  id:number;
  actionType:number;
  // passwordForm:FormGroup;
  passwordForm;
  userData;
  constructor(@Inject(MD_DIALOG_DATA) public data:any,
              private fb: FormBuilder,
              private dialog: MdDialog,
              private vipService: VipService,
              private operatorService: OperatorService,
              private toastr: ToastrService,
              private dialogRef: MdDialogRef<UpdatePasswordDialogComponent>
  ) { }

  ngOnInit() {
    this.action=this.data['action'];
    this.id=this.data['id'];
    if(this.data['action']==='修改VIP密码'){
      this.actionType=1;
    }else if(this.data['action']==='修改操作员密码'){
      this.actionType=2;
    }else{
    }
    this.passwordForm = this.fb.group({
      oldPsw: ['', [Validators.required , Validators.minLength(6),
        Validators.maxLength(10)]],
      firstPsw: ['', [Validators.required , Validators.minLength(6),
        Validators.maxLength(10)]],
      secondPsw: ['', [Validators.required,Validators.minLength(6),
        Validators.maxLength(10)]]
    });
  }

  updatePasswordConfirm(){
    if(this.passwordForm.invalid){
      return;
    }else{
      if($('#oldPsw').val()===$('#secondPsw').val()){
        this.dialog.open(ConfirmDialogComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "280px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "action": "密码输入有误",
            "content":'新修改的密码不能和旧密码重复！！！'
          }
        } as MdDialogConfig);
      }else{
        var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
        var preOldPasswordStr=$('#oldPsw').val();
        var preSecondPasswordStr=$('#secondPsw').val();
        var confoundStrArray=[];
        var oldPasswordArray=[];
        var secondPasswordArray=[];
        for(var i=0;i<confoundStr.length;i++){
          confoundStrArray.push(confoundStr.charAt(i));
        }
        for(var i=0;i<preOldPasswordStr.length;i++){
          oldPasswordArray.push(preOldPasswordStr.charAt(i)+''+confoundStrArray[i]);
        }
        for(var i=0;i<preSecondPasswordStr.length;i++){
          secondPasswordArray.push(preSecondPasswordStr.charAt(i)+''+confoundStrArray[i]);
        }
        var data={
          "id":this.id,
          "password":oldPasswordArray.join(''),
          "newPassword":secondPasswordArray.join('')
        };
        if(this.actionType==1){                     //修改会员密码
          this.vipService.update(data).subscribe((res)=>{
            if(!!res){
              this.dialogRef.close(true);
            }else if(res=='passwordError'){
              this.toastr.error('旧密码错误！')
            }else{
              this.toastr.error('修改VIP密码失败！请稍候再试！')
            }
          },err=>this.toastr.error('服务器错误！请稍候再试！'));
        }else if(this.actionType==2){
          this.operatorService.update(data).subscribe((res)=>{
            if(!!res){
              this.dialogRef.close(true);
            }else if(res=='passwordError'){
              this.toastr.error('旧密码错误！')
            }else{
              this.toastr.error('修改操作员密码失败！请稍候再试！')
            }
          },err=>this.toastr.error('服务器错误！请稍候再试！'));
        }
      }
    }

  }

}
