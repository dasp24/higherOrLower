import { Component, OnInit } from '@angular/core';
import { NumbersService } from 'src/app/services/numbers.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  constructor(private numbersService: NumbersService) {
    // this.number = numbersService.number;
   }

   get number(): number {
    return this.numbersService.number;
}


  ngOnInit(): void {
    this.numbersService.generateNumberAndGuess();
  }
}


