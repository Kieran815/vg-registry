import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGameList } from '../game-list';

@Injectable({ // marks the class as one that participates in the dependency injection
  providedIn: 'root'
})

export class ListService {

  constructor(private http: HttpClient) { }
  
  findGame(title: string) {
    console.log(`Searching For ${title}`);
    return this.http
      .get(`https://api.rawg.io/api/games?key=aa7e732482ae43419435e2e3e6a960a7&search=${title}`)
  }

  // ***** GET ALL LISTS *****
  getGameLists(): Observable<IGameList[]> {
    console.log("Connecting to IVGR DataBase...");
    return this.http.get<IGameList[]>("http://localhost:9092/api/lists");
  }
  
  // ***** CREATE NEW LIST *****
  createList(newName: string, newDescription: string) {
    return this.http
    .post<IGameList>("http://localhost:9092/api/lists", {
      name: newName,
      description: newDescription
    })
    .subscribe(_ => {
      this.getGameLists();
    })
  }
    
  deleteList(index: number) {
    // let listId = this.gameLists[index];
    // console.log(listId);
    // let confirmDelete = confirm(`Are you sure you want to delete ${listId[index].listName}?`);
    // if(confirmDelete) {
    //   this.http
    //   .delete(`http://localhost:9092/api/lists/${listId}`)
    //   .toPromise()
    //   .then((data: any) => {
    //     console.log(data);
    //     this.getGameLists();
    //   });
    // } else {
    //   return;
    // }
  }


}
