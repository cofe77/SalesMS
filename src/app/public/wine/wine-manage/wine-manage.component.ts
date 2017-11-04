import {Component, OnInit, ViewChild, Inject, TemplateRef} from '@angular/core';
import {ToastrService, ToastContainerDirective} from "ngx-toastr";
import {MdDialog, MD_DIALOG_DATA, MdDialogRef, MdDialogConfig} from "@angular/material";
import {WineDetailDialogComponent} from "../wine-detail-dialog/wine-detail-dialog.component";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {SaveBeerDialogComponent} from "../save-beer-dialog/save-beer-dialog.component";
import {ScanQRCodeComponent} from "../scan-qrcode/scan-qrcode.component";
import {SelectSavedBeerComponent} from "../select-saved-beer/select-saved-beer.component";
import {SaveBeerConfirmAfterOrderFinishDialogComponent} from "../../order/save-beer-confirm-after-order-finish-dialog/save-beer-confirm-after-order-finish-dialog.component";
import {SavedBeersService} from "../../../service/saved-beers.service";
import {ShowSavedBeersQRCodeComponent} from "../show-saved-beers-qrcode/show-saved-beers-qrcode.component";
import {GoodsService} from "../../../service/goods.service";

@Component({
  selector: 'app-wine-manage',
  templateUrl: './wine-manage.component.html',
  styleUrls: ['./wine-manage.component.css'],
  providers:[SavedBeersService,GoodsService]
})
export class WineManageComponent implements OnInit {
  name:string;
  allGoods;
  savedBeersList:Array<any>=[];
  savedBeersItems:Array<any>=[];
  isHaveSavedBeer:boolean=false;

  constructor(private toastr: ToastrService,
              public savedBeersService: SavedBeersService,
              public goodsService: GoodsService,
              public dialog: MdDialog,
              private http:Http
  ) {
  }

  ngOnInit() {
    this.goodsService.getAllOldGoods({}).subscribe((res)=>{
      this.allGoods=res.slice(1);
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }

  scanSavedBeerQRCode(){
    let scanQRCodeRef=this.dialog.open(ScanQRCodeComponent,{
      'panelClass': 'custom-overlay-pane-class',
      'hasBackdrop': true,
      'width': '400px',
      'height': 'auto',
      'disableClose': true,
      'data': {'title':'二维码扫描','content':'请使用扫码枪扫描二维码！'}
    } as MdDialogConfig);
    scanQRCodeRef.afterClosed().subscribe(result=>{
      this.savedBeersList=result;
      this.savedBeersItems=result['savedBeersItem'];
      this.isHaveSavedBeer=true
    })

  }

  searchSavedBeerByKeyCode(){
    let searchSavedBeerRef=this.dialog.open(SelectSavedBeerComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "500px",
      "height": "auto",
      "disableClose": true,
      "data": {
      }
    } as MdDialogConfig);
    searchSavedBeerRef.afterClosed().subscribe(result=>{
      if(!!result){
        this.savedBeersList=result;
        this.savedBeersItems=result['savedBeersItem'];
        this.isHaveSavedBeer=true
      }
    })
  }

  toSaveBeer(){
    let saveBeerDialogRef=this.dialog.open(SaveBeerDialogComponent,{
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "1000px",
      "height": "auto",
      "disableClose": true,
      "data": {
      }
    } as MdDialogConfig);
    saveBeerDialogRef.afterClosed().subscribe((res)=>{
      if(!!res){
        this.toastr.success('存酒成功！');
        this.dialog.open(ShowSavedBeersQRCodeComponent,{
          "panelClass": "custom-overlay-pane-class",
          "hasBackdrop": true,
          "backdropClass": "",
          "width": "500px",
          "height": "auto",
          "disableClose": true,
          "data": {
            "savedBeersId":res
          }
        } as MdDialogConfig);
      }
    },err=>this.toastr.error('服务器错误！请稍候重试！'));
  }
}
