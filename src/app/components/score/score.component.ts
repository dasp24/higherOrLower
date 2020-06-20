import { Component, OnInit } from '@angular/core';
import { NumbersService } from '../../services/numbers.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  leaderInFormat: any = [];
  // leaderboard: string[];
  constructor(private numbersService: NumbersService) {
  }
  get score() {
    return this.numbersService.score;
  }

  get leaderBoard() {
    console.log(this.numbersService.leaderBoard);
    if (this.numbersService.leaderBoard.length) {
      this.formatResults(this.numbersService.leaderBoard);
    };
    return this.numbersService.leaderBoard;
  }
  ngOnInit(): void {

  }

  formatResults(data) {
    const sortedResults = data.sort((a, b) => {
      if (a.data.score < b.data.score) {
        return 1;
      }
      if (a.data.score > b.data.score) {
        return -1;
      }
      if (a.data.score === b.data.score) {
        if (a.data.time > b.data.time) {
          return 1;
        } else {
          return -1;
        }
      }
    }, []).slice(0, 3);
    this.leaderInFormat = sortedResults.map(item=>{
      return `${item.data.name} ${item.data.score} points`;
    })
    console.log(data);
  }

}
