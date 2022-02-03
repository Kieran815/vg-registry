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

  rawgUrl: string = 'https://api.rawg.io/api/games?key=aa7e732482ae43419435e2e3e6a960a7'
  listUrl: string = 'http://localhost:9092/api/lists';
  // gameUrl: string = `http://localhost:9092/api/lists/${listId}/games/${gameId}`;
  
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

  // ***** GET GAME FROM LIST *****
  getGameFromList(listId: number, gameId: number) {
    console.log(listId);
    console.log(gameId);
    console.log(this.currentGame);
    this.http.get<Game>(`http://localhost:9092/api/lists/${listId}/games/${gameId}`)
  }

  // ***** GET GAME FROM GAME LIST *****

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
  
  // ***** UPDATE LIST *****
  getGamesList(id: number) { //id: number
    console.log(`Getting GameList ${id}`)
    console.log(this.gameLists);
    this.http.get(`${this.listUrl}/${id}`);
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
    // console.log(`Searching For ${title}`);
    return this.http
      .get(this.rawgUrl + `&search=${title}`)
  }

}


