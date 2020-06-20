import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  number: number;
  numberChange: Subject<number> = new Subject<number>();

  constructor() {
    this.numberChange
    .subscribe((res) => this.number = res);
   }

  generateNumber() {
    const newNumber = Math.ceil(Math.random() * 100);
    if (this.number !== newNumber) {
      this.numberChange.next(newNumber);
    } else {
      this.generateNumber();
    }
  }
}
