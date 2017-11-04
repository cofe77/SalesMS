import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {DeskService} from "../../../service/desk.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-show-desk-qrcode-dialog',
  templateUrl: './show-desk-qrcode-dialog.component.html',
  styleUrls: ['./show-desk-qrcode-dialog.component.css'],
  providers:[DeskService]
})
export class ShowDeskQRCodeDialogComponent implements OnInit {
  deskId;
  deskQRCodeImgLoadingIsFinish:boolean=false;
  deskQRCodeBase64;
  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public deskService:DeskService,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.deskId=this.data['deskId'];
    this.deskService.getDeskQRCode(this.deskId).subscribe((res)=>{
      this.deskQRCodeImgLoadingIsFinish=true;
      this.deskQRCodeBase64='data:image/jpeg;base64,'+res['base64'];
    },err=>{
      this.toastr.error('服务器错误！请稍候重试！')
    });
  }

}
