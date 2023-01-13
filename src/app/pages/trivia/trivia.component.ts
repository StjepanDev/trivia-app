import { Component, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  constructor(public triviaService:TriviaService){}


  ngOnInit(): void {
    this.triviaService.getQuestions()

  }
}
