import { Component, OnInit } from '@angular/core';
import { NumbersService } from '../../services/numbers.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  constructor(private numbersService: NumbersService) {
  }
  get score() {
    return this.numbersService.score;
  }
  ngOnInit(): void {

  }

}
