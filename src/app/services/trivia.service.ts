import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http:HttpClient) { }

questionsdata:Array<any> = [];

  public getQuestions(){
    return new Promise<any>((resolve,reject)=>{
      this.http.get('https://opentdb.com/api.php?amount=50&category=11&difficulty=medium&type=multiple').subscribe(
        (res)=>{
          resolve(res);

        },
        (err)=>{
          reject(err);

        }
      );

    })
  }
}
