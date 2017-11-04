import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  action:string;
  content:string;
  yesButtonContent:string='确认';


  constructor(
    @Inject(MD_DIALOG_DATA) public dialogData:any,
    public dialogRef:MdDialogRef<ConfirmDialogComponent>
  ) { }

  ngOnInit() {
    this.action=this.dialogData['action'];
    if(!!this.dialogData['yesButtonContent']){
      this.yesButtonContent=this.dialogData['yesButtonContent']
    }
    $('#contentBox').html(this.dialogData['content']);
  }

  yes(){
    this.dialogRef.close(true);
  }

}
