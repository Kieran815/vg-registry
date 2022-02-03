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
  currentList: any | undefined;

  constructor(private token: TokenStorageService, private listService: ListService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.listService.getAllLists()
    .subscribe(data => {
      this.gameLists = data;
    });
  }

  deleteList(index: number) {
    let confirmDelete = confirm(`Are you sure you want to delete ${this.gameLists[index].name}?`);
    if(confirmDelete) {
      this.listService.deleteList(this.gameLists[index].id);
      this.listService.getAllLists().subscribe(data => {
        return this.gameLists = data;
      });
    }
  }

  getListById(index: number) {
    console.log(this.gameLists);
    console.log(this.gameLists[index].id);
    this.listService.getGamesList(this.gameLists[index].id)
    // .subscribe(data => {
    //   this.currentList = data;
    //   console.log(this.currentList);
    // });
  }
  

  getGameFromList(index: number, gameId: number) {

    this.listService.getGamesList(this.gameLists[index].id)
    // this.listService.getGameFromList(listId, gameId);
  }

  deleteGameFromList(listId: number, gameIndex:number) {
    console.log(listId);
    this.listService.deleteGameFromList(listId, gameIndex);
    this.listService.getAllLists();
  }
  
  
}