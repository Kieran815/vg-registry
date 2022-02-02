import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../models/gameList.model';

import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({ // marks the class as one that participates in the dependency injection
  providedIn: 'root'
})

export class ListService {

  rawgUrl: string = 'https://api.rawg.io/api/games?key=aa7e732482ae43419435e2e3e6a960a7'
  listUrl: string = 'http://localhost:9092/api/lists';
  // gameUrl: string = `http://localhost:9092/api/lists/${listId}/games/${gameId}`;
  
  gameLists: any | undefined;
  currentGame: any;
  
  constructor(private http: HttpClient, private token: TokenStorageService) { }
  
  
// *************** LIST FUNCTIONS ***************
  // ***** GET ALL LISTS *****
  getAllLists(): Observable<GameList[]> {
    console.log("Connecting to IVGR DataBase...");
    return this.http.get<GameList[]>(this.listUrl);
  }


  // ***** CREATE NEW LIST *****
  createList(gameList: any) {
    return this.http
    .post<GameList>("http://localhost:9092/api/lists", {
      name: gameList.name,
      description: gameList.description
    })
    .subscribe(_ => {
      return this.getAllLists();
    })
  }
  
  // ***** UPDATE LIST *****
  getGamesList(id: number) { //id: number
    console.log(`Getting GameList ${id}`)
    console.log(this.gameLists);
    // return this.gameLists.find(x => {
    //   x.id === id;
    // })
  }



  // ***** DELETE LIST *****
  deleteList(listId: number) {
    console.log("Service List ID: " + listId);
    this.http.delete(`${this.listUrl}/${listId}`, {responseType: 'text'})
    .subscribe(_ => {
      return this.getAllLists();
    });
  }

// *************** SEARCH FUNCTIONS ***************
  // ***** FIND GAME BY TITLE *****
  findGame(title: string) {
    console.log(`Searching For ${title}`);
    return this.http
      .get(this.rawgUrl + `&search=${title}`)
  }

}


