import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  number: number;
  constructor() { }

  ngOnInit(): void {
    this.generateNumber();
  }

  generateNumber(oldNumber?) {
    const newNumber = Math.ceil(Math.random() * 100);
    if (oldNumber !== newNumber) {
      this.number = newNumber;
    } else {
      this.generateNumber(oldNumber);
    }
  }

}
