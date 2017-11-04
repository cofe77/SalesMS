import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, MdDialogConfig, MdDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  action:string;

  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialogRef:MdDialogRef<PasswordDialogComponent>,
    public dialog:MdDialog
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
  }

  yes(pwd){
    if(!!pwd){
      var confoundStr='53c274e86f7230891c03b1697d9585c5e10adc3949ba59abbe56e057f20f883e4e86f7230891c03b1697d9585c5e10adc3949ba59abbe';
      var prePasswordStr=pwd;
      var confoundStrArray=[];
      var passwordArray=[];
      for(var i=0;i<confoundStr.length;i++){
        confoundStrArray.push(confoundStr.charAt(i));
      }
      for(var i=0;i<prePasswordStr.length;i++){
        passwordArray.push(prePasswordStr.charAt(i)+''+confoundStrArray[i]);
      }
      this.dialogRef.close(passwordArray.join(''));
    }else{
      this.dialog.open(ConfirmDialogComponent,{
        "panelClass": "custom-overlay-pane-class",
        "hasBackdrop": true,
        "backdropClass": "",
        "width": "500px",
        "height": "auto",
        "disableClose": true,
        "position": {
          "top": "400px",
          "left": "700px"
        },
        "data": {
          "action": "密码异常",
          "content":"密码不能为空，请重新输入！"
        }
      } as MdDialogConfig);
    }
  }
}
