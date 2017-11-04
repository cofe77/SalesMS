import {Component, OnInit, Inject} from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  action:string;
  content:string;


  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialogRef:MdDialogRef<AlertDialogComponent>
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
    $('#contentBox').html(this.dialogData['content']);
    var that=this;
    // setTimeout(function(){
    //   that.dialogRef.close();
    // },2000)
  }

}
