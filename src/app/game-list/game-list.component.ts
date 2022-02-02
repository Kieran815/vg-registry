import { Component, OnInit } from '@angular/core';

// SERVICES
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ListService } from 'src/app/_services/list.service';

import { GameList } from 'src/app/models/gameList.model';

// ***** COMPONENT IMPORT *****
import { ListCreationComponent } from './list-creation/list-creation.component';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  currentUser: any;
  
  // component variables
  gameLists: any | undefined;

  constructor(private token: TokenStorageService, private listService: ListService) {
  }

  // method for angular list creation pop-up
  // openDialog() {
  //   const dialogRef = this.dialog.open(ListCreationComponent);
  //   let newListName: string;
  //   let newListDescription: string;
  //   let nameExists = false;
  //   dialogRef.afterClosed().subscribe(result => {
  //     result.data.name ? newListName = result.data.name : '';
  //     result.data.description ? newListDescription = result.data.description : '';
  //     if(newListName != undefined && newListDescription != undefined) {
  //       for(let i = 0; i < this.gameLists.length; i++) {
  //         if (this.gameLists[i].name === newListName) {
  //           nameExists = true;
  //           alert(`List Not Saved. List name "${this.gameLists[i].name}" already exists.`);
  //         }
  //       }
  //       nameExists === false ? this.listService.createList(newListName, newListDescription) : '';
  //       this.listService.getGameLists;
  //     } else {
  //       alert("Missing Information. Please Review your Entry.");
  //       this.openDialog();
  //     }
  //   })
  // }
    
  // deleteList(listId: number) {
  //   console.log(listId);
  //   this.listService.deleteList(listId);
  // }
  
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.listService.getAllLists()
    .subscribe(data => {
      this.gameLists = data;
      console.log(this.gameLists);
    });
  }
  
}