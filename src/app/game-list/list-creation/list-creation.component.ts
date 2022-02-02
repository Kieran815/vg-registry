import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GameList } from 'src/app/models/gameList.model';
import { ListService } from 'src/app/_services/list.service';


@Component({
  selector: 'app-list-creation',
  templateUrl: './list-creation.component.html',
  styleUrls: ['./list-creation.component.css']
})
export class ListCreationComponent implements OnInit {
  currentListId: any;
  header: string = '';
  // listId: number | undefined;
  // listName: string = '';
  // listDescription: string = '';
  editGameList: GameList = {
    listId: 0,
    listName: '',
    listDescription: '',
    gameList: []
  }




  constructor(private listService: ListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.currentListId = this.route.snapshot.paramMap.get('id');
    this.currentListId != null ? this.currentListId = +this.currentListId : '';
    this.header = this.currentListId === 0 ? "Add List" : "Edit List"; 

    // if (this.currentListId != 0) {
    //   this.editGameList = this.listService.getGamesList(this.currentListId);
    //   this.listService.getGamesList(this.currentListId.id)
    //     .subscribe(data => {
    //       this.editGameList = data;
    //     });
    // }
  }

  modList(form: NgForm) {
    let gameList = {
      name: form.value.name,
      description: form.value.description
    }
    this.listService.createList(gameList);
    this.router.navigateByUrl('my-lists');
  }

}
