import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-list-creation-popup',
  templateUrl: './list-creation-popup.component.html',
  styleUrls: ['./list-creation-popup.component.css']
})
export class ListCreationPopupComponent implements OnInit {

  listName: string = '';
  listDescription: string = '';

  createNewList(newName: string, newDescription: string) {
    this.listName = newName;
    this.listDescription = newDescription;
    let body = {
      name: this.listName,
      description: this.listDescription
    }
    this.dialogRef.close({ event: 'close', data: body });
  }

  constructor(public dialogRef: MatDialogRef<ListCreationPopupComponent>) { }

  ngOnInit(): void {
  }

}
