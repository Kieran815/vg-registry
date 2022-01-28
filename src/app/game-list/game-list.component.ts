import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

// ***** MATERIAL DESIGN IMPORTS *****
import { MatDialog } from '@angular/material/dialog';

// ***** COMPONENT IMPORT *****
import { ListCreationPopupComponent } from '../list-creation-popup/list-creation-popup.component';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  // for Material Expansion Panel (accordion)
  panelOpenState = false;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  // method for angular list creation pop-up
  openDialog() {
    this.dialog.open(ListCreationPopupComponent);
  }

  gameLists: any | undefined;

  getGameLists() {
    console.log("Connecting to IVGR DataBase...");
    this.http.get("http://localhost:9092/api/lists")
    .subscribe((response) => {
      console.log(response);
      this.gameLists = response;
      console.log(this.gameLists);
    })
  }

  createList(listName: string, listDescription: string) {
    console.log(`Creating List ${listName}`);

    let body: any = {
      name: listName,
      description: listDescription
    }
    this.http
      .post("http://localhost:9092/api/lists", JSON.parse(body));
      this.getGameLists();
      // .pipe(this.handleError('Add List', ))
  }

  ngOnInit(): void {
    this.getGameLists();
  }

}