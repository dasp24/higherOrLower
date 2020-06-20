import { Component, OnInit, Input } from '@angular/core';
import { NumbersService } from '../../services/numbers.service';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss']
})
export class ArrowComponent implements OnInit {

  @Input() direction: string;
  constructor(private numberService: NumbersService) { }

  ngOnInit(): void {
  }

  guessAndGenerate() {
    // this.numberService.guess(this.direction);
    this.numberService.generateNumberAndGuess(this.direction);
  }

}
