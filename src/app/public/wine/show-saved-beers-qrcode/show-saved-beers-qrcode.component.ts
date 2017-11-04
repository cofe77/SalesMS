import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from "@angular/material";
import {ToastrService} from "ngx-toastr";
import {SavedBeersService} from "../../../service/saved-beers.service";

@Component({
  selector: 'app-show-saved-beers-qrcode',
  templateUrl: './show-saved-beers-qrcode.component.html',
  styleUrls: ['./show-saved-beers-qrcode.component.css'],
  providers:[SavedBeersService]
})
export class ShowSavedBeersQRCodeComponent implements OnInit {
  savedBeersId;
  QRCode;
  savedBeersQRCodeImgLoadingIsFinish:boolean=false;
  savedBeersQRCodeBase64;
  constructor(
    @Inject(MD_DIALOG_DATA) public data:any,
    public savedBeersService:SavedBeersService,
    public toastr:ToastrService
  ) { }

  ngOnInit() {
    this.savedBeersId=this.data['savedBeersId'];
    this.savedBeersService.getKeyCodeImage(this.savedBeersId).subscribe((res)=>{
      this.savedBeersQRCodeImgLoadingIsFinish=true;
      this.savedBeersQRCodeBase64='data:image/jpeg;base64,'+res['base64'];
      this.QRCode=res['keyCode'];
    },err=>{
      this.toastr.error('服务器错误！请稍候重试！')
    });
  }
}
