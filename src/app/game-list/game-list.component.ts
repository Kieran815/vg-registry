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

  // var to receive body from modal list creation
  createListBody: Object | undefined;

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  gameLists: any | undefined;
  newListName: string | undefined;
  newListDescription: string | undefined;
  jsonResult: any;

  // method for angular list creation pop-up
  openDialog() {
    const dialogRef = this.dialog.open(ListCreationPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.newListName = result.data.name;
      this.newListDescription = result.data.description;
      let nameExists = false;
      if(this.newListName && this.newListDescription) {
        for(let i = 0; i < this.gameLists.length; i++) {
          if (this.gameLists[i].name === this.newListName) {
            nameExists = true
            alert(`List Not Saved. List name ${this.gameLists[i].name} already exists.`);
          }
        }
        nameExists === false ? this.createList(this.newListName, this.newListDescription) : '';
      } else {
        alert("Missing Information. Please Review your Entry.")
      }
    })
  }

  // ***** GET ALL LISTS *****
  getGameLists() {
    console.log("Connecting to IVGR DataBase...");
    this.http.get("http://localhost:9092/api/lists")
    .subscribe((response) => {
      this.gameLists = response;
    })
  }

  // ***** CREATE NEW LIST *****
  createList(newName: string, newDescription: string) {
    this.http
      .post("http://localhost:9092/api/lists", {
        name: newName,
        description: newDescription
      })
      .toPromise()
      .then((data: any) => {
        console.log(data);
        // console.log(JSON.stringify(data.json.name));
        // this.jsonResult = JSON.stringify
      })
      this.getGameLists();
  }

  ngOnInit(): void {
    this.getGameLists();
  }

}