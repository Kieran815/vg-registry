import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-creation-popup',
  templateUrl: './list-creation-popup.component.html',
  styleUrls: ['./list-creation-popup.component.css']
})
export class ListCreationPopupComponent implements OnInit {

  listName: string = '';
  listDescription: string = '';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
