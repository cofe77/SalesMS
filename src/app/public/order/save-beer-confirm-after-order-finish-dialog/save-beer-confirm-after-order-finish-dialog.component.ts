import {Component, OnInit, Inject} from '@angular/core';
import {SaveBeerDialogComponent} from "../../wine/save-beer-dialog/save-beer-dialog.component";
import {MdDialogConfig, MdDialog, MdDialogRef, MD_DIALOG_DATA} from "@angular/material";
import {OrderFinishConfirmDialogComponent} from "../order-finish-confirm-dialog/order-finish-confirm-dialog.component";
import {OrderPaymentConfirmDialogComponent} from "../order-payment-confirm-dialog/order-payment-confirm-dialog.component";

@Component({
  selector: 'app-save-beer-confirm-after-order-finish-dialog',
  templateUrl: './save-beer-confirm-after-order-finish-dialog.component.html',
  styleUrls: ['./save-beer-confirm-after-order-finish-dialog.component.css']
})
export class SaveBeerConfirmAfterOrderFinishDialogComponent implements OnInit {

  orderId;
  constructor(
    public dialog:MdDialog,
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialogRef:MdDialogRef<SaveBeerConfirmAfterOrderFinishDialogComponent>,
  ) { }

  ngOnInit() {
    this.orderId=this.dialogData['orderId'];
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
        "orderId":this.orderId
      }
    } as MdDialogConfig);
    saveBeerDialogRef.afterClosed().subscribe((res)=>{
      this.dialog.closeAll();
    })
  }

  closeThis(){
    this.dialog.closeAll();
  }
}
