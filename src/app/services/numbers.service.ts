import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
  startTime: number;

  constructor() {
    this.numberChange
      .subscribe((res) => this.number = res);
    this.scoreChange
      .subscribe((res) => this.score += this.pointsForCorrectGuess);
  }

  generateNumberAndGuess(direction?) {
    if (!direction) {
      this.startTime = performance.now();
    }
    const newNumber = Math.ceil(Math.random() * 100);
    const endTime = performance.now();
    const timeTaken = endTime - this.startTime;
    console.log(Math.round(timeTaken / 1000), 'seconds')
    if (this.number !== newNumber) {
      this.guess(direction, newNumber)
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
   if (win) {
     const endTime = performance.now();
     const timeTaken = endTime - this.startTime;
     console.log(Math.round(timeTaken / 1000), 'seconds')
   }
    // max score from game is 110 for everysecond a score out of 100 goes down
    const overallScore =
    this.resetGame();
  }

  resetGame() {
 
    this.score = 0;
    this.generateNumberAndGuess()
  }
}
