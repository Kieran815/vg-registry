import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../models/gameList.model';
import { Game } from '../models/game.model';

import { TokenStorageService } from './token-storage.service';
import { Observable } from 'rxjs';

@Injectable({ // marks the class as one that participates in the dependency injection
  providedIn: 'root'
})

export class ListService {

  rawgKey: string = `?key=aa7e732482ae43419435e2e3e6a960a7`
  rawgUrl: string = `https://api.rawg.io/api/games`
  listUrl: string = 'http://localhost:9092/api/lists';
  
  gameLists: any | undefined;
  currentGameList: any;
  currentGame: any;
  
  constructor(private http: HttpClient, private token: TokenStorageService) { }
  

// *************** GAME FUNCTIONS ***************

  // ***** ADD GAME TO LIST
  addGameToList(listId: number, game = {
    id: 0,
    api_id: this.currentGame.id,
    name: this.currentGame.name,
    listId: this.currentGameList
  }) {
    console.log(game);
    return this.http
    .post<Game>(`http://localhost:9092/api/lists/${listId}/games`, {
      api_id: game.id,
      name: game.name,
      listId: listId
    })
    .subscribe(_ => {
      return this.getAllLists();
    })
  }

  // ***** DELETE GAME FROM LIST *****
  deleteGameFromList(listId: number, gameId: number) {
    console.log(`Service: List ID: ${listId}, Game ID: ${gameId}`);
    this.http.delete(`${this.listUrl}/${listId}/games/${gameId}`, {responseType: 'text'})
    .subscribe(_ => {
      return this.getAllLists();
    });
  }
  
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
    // console.log(`Searching For ${title}`);
    return this.http
      .get(`${this.rawgUrl}${this.rawgKey}&search=${title}`)
  }

  // ***** GET GAME FROM LIST *****
  findGameByKey(keyId: number){
    return this.http
      .get(`${this.rawgUrl}/${keyId}${this.rawgKey}`)
  }
}


