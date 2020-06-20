import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  number: number;
  numberChange: Subject<number> = new Subject<number>();
  score = 0;
  scoreToShow = 0;
  pointsForCorrectGuess = 1;
  pointsToWin = 10;
  scoreChange: Subject<boolean> = new Subject<boolean>();
  leaderBoard: any = [];
  leaderBoardChange: Subject<object> = new Subject<object>();
  startTime: number;

  constructor(private http: HttpClient) {
    this.numberChange
      .subscribe((res) => this.number = res);
    this.scoreChange
      .subscribe((res) => this.score += this.pointsForCorrectGuess);
    this.leaderBoardChange
      .subscribe((res) => this.leaderBoard = res);
  }

  generateNumberAndGuess(direction?) {
    if (!direction) {
      this.getFileData();
      this.startTime = performance.now();
    }
    const newNumber = Math.ceil(Math.random() * 100);
    const endTime = performance.now();
    const timeTaken = endTime - this.startTime;
    console.log(Math.round(timeTaken / 1000), 'seconds');
    if (this.number !== newNumber) {
      this.guess(direction, newNumber);
      this.numberChange.next(newNumber);
    } else {
      this.generateNumberAndGuess(direction);
    }
  }

  guess(direction: string, newNumber: number): void {
    switch (direction) {
      case 'up':
        if (this.number < newNumber) {
          this.scoreChange.next(true);
          if (this.score >= this.pointsToWin) {
            this.endGame();
          }
        } else {
          this.endGame();
        }
        break;
      case 'down':
        if (this.number > newNumber) {
          this.scoreChange.next(true);
          if (this.score >= this.pointsToWin) {
            this.endGame(true);
          }
        } else {
          this.endGame(true);
        }
        break;
      default:
        console.log('no direction provided');
    }
  }

  endGame(win = false) {
    // take time to grab time and score and ask for name and save to db
    // let text;
    let name = prompt('game over, what is your name for the scoreboard, would you like to play again?');
    if (win) {
      name = prompt('You are the winner! leave you name and play again');
    }
    const endTime = performance.now();
    const timeTaken = Math.round((endTime - this.startTime) / 1000);
    const itemToStore = {
      name, score: this.score, time: timeTaken
    };

    this.saveFileData(itemToStore).subscribe(data => this.leaderBoardChange.next(data));
    // this.deleteFile();


    // max score from game is 110 for everysecond a score out of 100 goes down
    this.resetGame();
  }


  getFileData() {
    this.http.get('/highscores', { responseType: 'json' }).subscribe(data => {
      this.leaderBoard = data;
    });
  }

  saveFileData(data) {
    return this.http.post('/highscores', { data }, { responseType: 'json' });
  }



  deleteFile() {
    return this.http.delete('assets/highscores.txt');
  }

  resetGame() {
    this.score = 0;
    this.generateNumberAndGuess();
  }
}
