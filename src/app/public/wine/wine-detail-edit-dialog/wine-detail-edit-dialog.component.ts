import {Component, OnInit, Inject,ViewChild} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";
import {ToastrService, ToastContainerDirective} from "ngx-toastr";
import {Http} from "@angular/http";

@Component({
  selector: 'app-wine-detail-edit-dialog',
  templateUrl: './wine-detail-edit-dialog.component.html',
  styleUrls: ['./wine-detail-edit-dialog.component.css']
})
export class WineDetailEditDialogComponent implements OnInit {


  dialogTitle:string;
  itemName:string;
  listId:number;
  itemId:number;
  changeCount:number;

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;
  constructor(public dialogRef:MdDialogRef<WineDetailEditDialogComponent>,@Inject(MD_DIALOG_DATA) public data: any,public toastr:ToastrService,public http:Http) { }

  ngOnInit() {
    this.dialogTitle=this.data.action;
    this.itemName=this.data.name;
    this.listId=this.data.listId;
    this.itemId=this.data.itemId;
    this.toastr.overlayContainer = this.toastContainer;
  }
  addSavedBeerConfirm(count){
    this.http.post('/salesms.com/addSavedBeerById',{'listId':this.listId,'itemId':this.itemId,'count':count});
    this.dialogRef.close('追加'+this.listId+'中的'+this.itemName+count+'个成功！');
    this.dialogRef.afterClosed().subscribe(result => {
      this.toastr.success('追加'+this.itemName+count+'个成功！');
    });
  }
  takeOutSavedBeerConfirm(id,count){
    this.toastr.success('取出'+this.itemName+count+'个成功！');
    this.dialogRef.close('取出成功！');
    this.dialogRef.afterClosed().subscribe(result => {
      this.toastr.success('追加'+this.itemName+count+'个成功！');
    });
  }
}
