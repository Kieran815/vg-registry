import { Component, OnInit, TemplateRef } from '@angular/core';

// SERVICES
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { ListService } from 'src/app/_services/list.service';

// NGX BOOTSTRAP
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// ***** COMPONENT IMPORT *****
import { ListCreationComponent } from './list-creation/list-creation.component';
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  currentUser: any;
  
  // NGX
  open: boolean = true;
  disabled: boolean = true;
  modalRef?: BsModalRef;

  // component variables
  gameLists: any | undefined;
  selectedGame: any;

  constructor(private token: TokenStorageService, private listService: ListService, private modalService: BsModalService) {
  }

  // NGX Accordion
  log(isOpened: boolean){
    console.log(isOpened);
  }

  // NGX Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
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
      this.listService.getAllLists()
      .subscribe(data => {
        return this.gameLists = data;
      });
    }
  }  

  getGameData(apiId: number) {
    console.log(`Getting Game data from list...`)
    this.listService.findGameByKey(apiId)
      .subscribe(data => {
        this.selectedGame = data;
        this.logGame();
      })
  }

  logGame() {
    console.log(this.selectedGame)
  }

  deleteGameFromList(listId: number, gameIndex:number) {
    console.log(listId);
    this.listService.deleteGameFromList(listId, gameIndex);
    this.listService.getAllLists()
      .subscribe(data => {
        return this.gameLists = data;
      });
  }
  
  
}