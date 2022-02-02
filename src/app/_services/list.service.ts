import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../models/gameList.model';

import { TokenStorageService } from './token-storage.service';

@Injectable({ // marks the class as one that participates in the dependency injection
  providedIn: 'root'
})

export class ListService {

  rawgUrl: string = 'https://api.rawg.io/api/games?key=aa7e732482ae43419435e2e3e6a960a7'
  listUrl: string = 'http://localhost:9092/api/lists';
  // gameUrl: string = `http://localhost:9092/api/lists/${listId}/games/${gameId}`;

  gameLists: any | undefined;

  constructor(private http: HttpClient, private token: TokenStorageService) { }


getAllLists() {
  return this.http.get(this.listUrl);
}


// ***** CREATE NEW LIST *****
  createList(gameList: any) {
    console.log(gameList)
    return this.http
    .post<GameList>("http://localhost:9092/api/lists", {
      name: gameList.name,
      description: gameList.description
    })
    .subscribe(_ => {
      this.getAllLists();
    })
  }
  




// *************** LIST FUNCTIONS ***************
  // ***** GET ALL LISTS *****
  // getGameLists(): Observable<GameList[]> {
  //   console.log("Connecting to IVGR DataBase...");
  //   return this.http.get<GameList[]>("http://localhost:9092/api/lists");
  // }
  
  // // ***** CREATE NEW LIST *****
  // createList(newName: string, newDescription: string) {
  //   return this.http
  //   .post<GameList>("http://localhost:9092/api/lists", {
  //     name: newName,
  //     description: newDescription
  //   }, )
  //   .subscribe(_ => {
  //     this.getGameLists();
  //   })
  // }
    
  // deleteList(index: number) {
  //   let gamesList; 
  //   this.getGameLists().subscribe(data => {
  //     // console.log(gamesList);
  //     gamesList = data;
  //   });
  //   return gamesList;
  //   // let listId = this.gameLists[index];
  //   // console.log(listId);
  //   // let confirmDelete = confirm(`Are you sure you want to delete ${listId[index].listName}?`);
  //   // if(confirmDelete) {
  //   //   this.http
  //   //   .delete(`http://localhost:9092/api/lists/${listId}`)
  //   //   .toPromise()
  //   //   .then((data: any) => {
  //   //     console.log(data);
  //   //     this.getGameLists();
  //   //   });
  //   // } else {
  //   //   return;
  //   // }
  // }

// *************** SEARCH FUNCTIONS ***************
  // ***** FIND GAME BY TITLE *****
  findGame(title: string) {
    console.log(`Searching For ${title}`);
    return this.http
      .get(this.rawgUrl + `&search=${title}`)
  }

}


