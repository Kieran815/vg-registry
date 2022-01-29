import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ***** MATERIAL DESIGN IMPORTS *****
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

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

  // component variables
  gameLists: any | undefined;
  newListName: string | undefined;
  newListDescription: string | undefined;
  jsonResult: any;


  constructor(private http: HttpClient, public dialog: MatDialog) { }


  // method for angular list creation pop-up
  openDialog() {
    const dialogRef = this.dialog.open(ListCreationPopupComponent);
    dialogRef.afterClosed().subscribe(result => {
      result.data.name ? this.newListName = result.data.name : '';
      result.data.description ? this.newListDescription = result.data.description : '';
      console.log(result);
      let nameExists = false;
      if(this.newListName && this.newListDescription) {
        for(let i = 0; i < this.gameLists.length; i++) {
          if (this.gameLists[i].name === this.newListName) {
            nameExists = true;
            alert(`List Not Saved. List name "${this.gameLists[i].name}" already exists.`);
          }
        }
        nameExists === false ? this.createList(this.newListName, this.newListDescription) : '';
      } else {
        alert("Missing Information. Please Review your Entry.");
        this.openDialog();
      }
    })
  }

  updateDialog(index: number) {
    let listObject = this.gameLists[index];
    console.log(listObject);
    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.data = {
    //   name: listObject.name,
    //   description: listObject.description
    // }
    // this.dialog.open(ListCreationPopupComponent, dialogConfig)
  }

  // ***** GET ALL LISTS *****
  getGameLists() {
    console.log("Connecting to IVGR DataBase...");
    this.http.get("http://localhost:9092/api/lists")
    .subscribe((response) => {
      this.gameLists = response;
      console.log(this.gameLists);
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
        this.getGameLists();
      })
  }

  updateList(index: number) {
    let listObject = this.gameLists[index];
    console.log(listObject);
    const dialogRef = this.dialog.open(ListCreationPopupComponent,
      {
        data: {
          passedListObject: {
            listName: `${this.gameLists[index].name}`,
            listDescription: `${this.gameLists[index].description}`
          }
        }
      }
    );
  }

  deleteList(index: number) {
    let listId = this.gameLists[index].id;
    let confirmDelete = confirm(`Are you sure you want to delete ${this.gameLists[index].name}?`);
    if(confirmDelete) {
      this.http
        .delete(`http://localhost:9092/api/lists/${listId}`)
        .toPromise()
        .then((data: any) => {
          console.log(data);
          this.getGameLists();
        });
    } else {
      return;
    }
    
  }

  ngOnInit(): void {
    this.getGameLists();
  }

}