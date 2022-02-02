import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  listId: number | undefined;
  listName: string = '';
  listDescription: string = '';




  constructor(private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentListId = this.route.snapshot.paramMap.get('id');
    this.currentListId != null ? this.currentListId = +this.currentListId : '';
    console.log(this.currentListId);
    this.header = this.currentListId === 0 ? "Add List" : "Edit List"; 
  }

  modList(form: NgForm) {
    console.log(form);
    console.log("Modifying List", form.value);
    this.listName = form.value.name;
    console.log(this.listName)
    this.listDescription = form.value.description;
    console.log(this.listDescription);

    let gameList = {
      name: form.value.name,
      description: form.value.description
    }
    this.listService.createList(gameList);
  }

    // createNewList(newName: string, newDescription: string) {
  //   this.listName = newName;
  //   this.listDescription = newDescription;
  //   let body = {
  //     name: this.listName,
  //     description: this.listDescription
  //   }
  // }

  // }

}
