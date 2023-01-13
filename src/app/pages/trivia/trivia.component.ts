import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  constructor(public triviaService:TriviaService, private router:Router){}


  ngOnInit(): void {
    this.triviaService.getQuestions().then((res)=>{
      console.log(res);
      this.triviaService.questionsData = res.results;

      this.triviaService.questionsData[this.questionIndex].incorrect_answers.push(this.triviaService.questionsData[this.questionIndex].correct_answer)
      this.triviaService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());

      let timer = setInterval(() => {
        if (this.userAnswer === "" && this.countdown !== 0){
        this.countdown--;
      }
        if (this.countdown === 0){
          clearInterval(timer);
          this.triviaService.updateScore(this.score);


          setTimeout(() => {
            this.router.navigate(['/home']);
          },2000)
      }

      },1000)
    }).catch((err)=>{
      console.log(err);
      
    })

  }

  questionIndex = 0;

  userAnswer = "";

  score = 0;

  countdown = 15;

  selectAnswer(option:string){
    this.userAnswer = option;
    if (this.triviaService.questionsData[this.questionIndex].correct_answer === option){
      this.score += 5;
      
      setTimeout(()=>{
        this.userAnswer = "";
        this.questionIndex++
        this.triviaService.questionsData[this.questionIndex].incorrect_answers.push(this.triviaService.questionsData[this.questionIndex].correct_answer)
        this.triviaService.questionsData[this.questionIndex].incorrect_answers.sort(() => 0.5 - Math.random());
        this.countdown = 15;
      },2000)
      

    } else {
      this.triviaService.updateScore(this.score);


      setTimeout(() => {
        this.router.navigate(['/home']);

      },2000)
    }

  }

}
