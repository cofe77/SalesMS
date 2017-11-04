import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA, MdDialog, MdDialogConfig} from "@angular/material";
import {WineService} from "../../../service/wine.service";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../layer/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-scan-qrcode',
  templateUrl: './scan-qrcode.component.html',
  styleUrls: ['./scan-qrcode.component.css'],
  providers:[WineService]
})
export class ScanQRCodeComponent implements OnInit {
  public loadingContent:string;
  public QRCode:string='';
  public keyPressStartTime:number;
  public focusInterval;
  constructor(public dialogRef: MdDialogRef<ScanQRCodeComponent>,@Inject(MD_DIALOG_DATA) public data:any,
              public dialog:MdDialog,
              public wineService:WineService,
              public toastr:ToastrService
  ) {
  }

  ngOnInit() {
    this.loadingContent=this.data.content;
    var that=this;
    $('#QRCodeInput').blur(function () {
      that.focusInterval=setTimeout(function () {
        $('#QRCodeInput').focus();
      },10);
    });
    document.onkeydown=function(){
      that.keyPressStartTime=new Date().getTime();
    };
    document.onkeyup=function(event){
      if((new Date().getTime())-that.keyPressStartTime<30){
        if(event.keyCode==13){
          that.loadingContent='扫描成功！';
          that.wineService.getByKeyCode({"keyCode":that.QRCode}).subscribe((res)=>{
            if(!res['isSuccess']){
              that.dialog.open(ConfirmDialogComponent,{
                'panelClass': 'custom-overlay-pane-class',
                'hasBackdrop': true,
                'width': '400px',
                'height': 'auto',
                'disableClose': true,
                'data': {
                  'caption': '扫描存酒二维码失败',
                  'content': '该二维码下无存酒或二维码错误！'
                }
              } as MdDialogConfig);
            }else{
              that.dialogRef.close(res);
            }
          },err=>that.toastr.error('获取存酒失败！'));
        }
      }else{
        that.QRCode='';
      }
    }
  }
}
