import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListService } from '../_services/list.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string = "Search Component"

  gameTitleSearch: string = '';
  titleSearchResults: any;
  selectedTitle: any;

  constructor(private http: HttpClient, private listService: ListService) { }

  findGame(gameTitle: string) {
    console.log(`Searching For ${gameTitle}`);
    this.listService.findGame(gameTitle)
      .subscribe((response) => {
        this.titleSearchResults = response;
        console.log(this.titleSearchResults)
      });
  }

  selectGame(index: number) {
    console.log(index);
    this.selectedTitle = this.titleSearchResults.results[index]
    console.log(this.selectedTitle);
    this.listService.addGameToList(this.selectedTitle, 21)
  }

  ngOnInit(): void {
  }



}
