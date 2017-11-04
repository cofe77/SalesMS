import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef, MdDialog, MdDialogConfig} from "@angular/material";
import {WineDetailEditDialogComponent} from "../wine-detail-edit-dialog/wine-detail-edit-dialog.component";
import {Http} from "@angular/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-wine-detail-dialog',
  templateUrl: './wine-detail-dialog.component.html',
  styleUrls: ['./wine-detail-dialog.component.css']
})
export class WineDetailDialogComponent implements OnInit {

  private _dimesionToggle = false;
  dataSource: Observable<any>;
  savedBeersList: Array<any>=[];
  listId:number;
  savedBeerItems: Array<any>=[];
  constructor(public WineDetailDialogRef: MdDialogRef<WineDetailDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              public dialog: MdDialog,
              private http:Http
  ) {
    this.dataSource=http.post('/salesms.com/getSavedBeersListByListId',{'listId':this.listId}).map((res)=>res.json());
  }

  togglePosition(): void {
    this._dimesionToggle = !this._dimesionToggle;

    if (this._dimesionToggle) {
      this.WineDetailDialogRef
        .updateSize('500px', '500px')
        .updatePosition({top: '25px', left: '25px'});
    } else {
      this.WineDetailDialogRef
        .updateSize()
        .updatePosition();
    }
  }

  ngOnInit() {
    this.savedBeersList=this.data['savedBeersList'];
    this.listId=this.data['listId'];
  }

  addSavedWine() {
    let WineDetailEditDialogRef=this.dialog.open(WineDetailEditDialogComponent, {
      "panelClass": "custom-overlay-pane-class",
      "hasBackdrop": true,
      "backdropClass": "",
      "width": "245px",
      "height": "180px",
      "disableClose": true,
      "data": {'listId':this.listId,
        // 'itemId':itemId,
        "action": "追加",
        "name": name
      }
    } as MdDialogConfig);
    // WineDetailEditDialogRef.afterClosed().subscribe((result) =>{
    //   this.dataSource.subscribe((data) =>this.savedBeersList=data);
    // }
    // );
  };

  takeOutSavedWine() {
    this.dialog.open(WineDetailEditDialogComponent, {
      panelClass:'custom-overlay-pane-class',
      hasBackdrop: true,
      backdropClass: '',
      width: '245px',
      height: '180px',
      disableClose: true,
      data: {
        // 'id':id,
        'action': '取出',
        'name':name
      }
    } as MdDialogConfig);
  };

  deleteSavedWine(){}
}
