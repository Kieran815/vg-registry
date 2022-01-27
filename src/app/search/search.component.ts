import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  title: string = "Search Component"

  gameTitleSearch: string = '';
  titleSearchResults: any;

  constructor(private http: HttpClient) { }

  findGame(gameTitle: string) {
    console.log(`Searching For ${gameTitle}`);
    this.http
      .get(`https://api.rawg.io/api/games?key=<API_KEY_HERE>&search=${gameTitle}`)
      .subscribe((response) => {
        this.titleSearchResults = response;
        console.log(this.titleSearchResults)
      });
  }

  ngOnInit(): void {
  }



}
