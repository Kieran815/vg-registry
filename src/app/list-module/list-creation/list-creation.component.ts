import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IGameList } from 'src/app/game-list';
import { ListService } from 'src/app/services/list.service';


@Component({
  selector: 'app-list-creation',
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {
  listName: string = '';
  listDescription: string = '';

  createNewList(newName: string, newDescription: string) {
    this.listName = newName;
    this.listDescription = newDescription;
    let body = {
      name: this.listName,
      description: this.listDescription
    }
    this.dialogRef.close({ event: 'close', data: body });
  }

  updateList(gameList: IGameList) {
    // let listObject = this.gameLists[index];
    console.log(gameList.listName);

  }

  constructor(public dialogRef: MatDialogRef<ListCreationComponent>, private listService: ListService) { }

  ngOnInit(): void {
  }

}
