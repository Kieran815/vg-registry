import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../_services/list.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Game } from '../models/game.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  gameTitleSearch: string = '';
  titleSearchResults: any;
  selectedTitle: any;
  modalRef?: BsModalRef;
  gameLists: any;
  selectedList: number = 0;

  constructor(private http: HttpClient, private listService: ListService, private modalService: BsModalService) { }

  // NGX Modal
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // form select
  form = new FormGroup({
    addToList: new FormControl('', Validators.required)
  });

  get f(){
    return this.form.controls;
  }
  
  submit(){
    if(this.form.value.addToList === '') {
      alert("Please Select a List");
      return;
    }
    this.selectedList = this.form.value.addToList;
    this.listService.addGameToList(this.form.value.addToList, this.selectedTitle);
  }


  // ********************************************
  findGame(gameTitle: string) {
    this.titleSearchResults = '';
    console.log(`Searching For ${gameTitle}`);
    this.listService.findGame(gameTitle)
      .subscribe((response) => {
        this.titleSearchResults = response;
        if (this.titleSearchResults.count > 20) {
          this.titleSearchResults.count = 20;
        }
        console.log(this.titleSearchResults)
      });
  }

  selectGame(index: number) {
    this.selectedTitle = this.titleSearchResults.results[index]
    console.log(this.selectedTitle);
  }

  ngOnInit(): void {
    this.listService.getAllLists()
      .subscribe(data => {
        this.gameLists = data;
      })
  }




}


