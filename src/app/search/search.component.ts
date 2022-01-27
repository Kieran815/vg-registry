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
      .get(`https://api.rawg.io/api/games?key=aa7e732482ae43419435e2e3e6a960a7&search=${gameTitle}`)
      .subscribe((response) => {
        this.titleSearchResults = response;
        console.log(this.titleSearchResults)
      });
  }

  getGamesList() {
    console.log("Connecting to IVGR DataBase...");
    this.http.get("http://localhost:9092/api/lists")
    .subscribe((response) => {
      console.log(response);
    })
  }

  ngOnInit(): void {
  }



}
