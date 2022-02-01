import { Component, OnInit } from '@angular/core';

// SERVICES
import { ListService } from 'src/app/_services/list.service';

// ***** MATERIAL DESIGN IMPORTS *****
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// ***** COMPONENT IMPORT *****
import { ListCreationComponent } from '../list-creation/list-creation.component';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  
  // var to receive body from modal list creation
  createListBody: Object | undefined;
  
  // component variables
  gameLists: any | undefined;

  constructor(private listService: ListService, public dialog: MatDialog) {
  }

  // method for angular list creation pop-up
  openDialog() {
    const dialogRef = this.dialog.open(ListCreationComponent);
    let newListName: string;
    let newListDescription: string;
    let nameExists = false;
    dialogRef.afterClosed().subscribe(result => {
      result.data.name ? newListName = result.data.name : '';
      result.data.description ? newListDescription = result.data.description : '';
      if(newListName != undefined && newListDescription != undefined) {
        for(let i = 0; i < this.gameLists.length; i++) {
          if (this.gameLists[i].name === newListName) {
            nameExists = true;
            alert(`List Not Saved. List name "${this.gameLists[i].name}" already exists.`);
          }
        }
        nameExists === false ? this.listService.createList(newListName, newListDescription) : '';
        this.listService.getGameLists;
      } else {
        alert("Missing Information. Please Review your Entry.");
        this.openDialog();
      }
    })
  }
    
  deleteList(listId: number) {
    console.log(listId);
    this.listService.deleteList(listId);
  }
  
  
  ngOnInit(): void {
    this.listService.getGameLists()
      .subscribe(data => {
        this.gameLists = data;
        console.log(this.gameLists);
      });
  }
  
}