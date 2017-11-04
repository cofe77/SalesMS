import { Component, OnInit } from '@angular/core';
import {VipService} from "../../service/vip.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.css']
})
export class ResetPasswordDialogComponent implements OnInit {
  passwordForm;
  constructor(
              private fb: FormBuilder,
              private dialogRef: MdDialogRef<ResetPasswordDialogComponent>
  ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      mobileNum: ['', [Validators.required]],
      firstPsw: ['', [Validators.required , Validators.minLength(6),
        Validators.maxLength(10)]],
      secondPsw: ['', [Validators.required,Validators.minLength(6),
        Validators.maxLength(10)]]
    });
  }
  resetPasswordConfirm(){
    if(this.passwordForm.invalid){
      return;
    }else{
      var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
      var prePasswordStr=this.passwordForm.value.secondPsw;
      var confoundStrArray=[];
      var passwordArray=[];
      for(var i=0;i<confoundStr.length;i++){
        confoundStrArray.push(confoundStr.charAt(i));
      }
      for(var i=0;i<prePasswordStr.length;i++){
        passwordArray.push(prePasswordStr.charAt(i)+''+confoundStrArray[i]);
      }
      this.passwordForm.value.secondPsw=passwordArray.join('');
      this.dialogRef.close(this.passwordForm.value);
    }

  }

}
