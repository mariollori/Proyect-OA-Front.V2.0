import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner-blanc',
  templateUrl: './spinner-blanc.component.html',
  styleUrls: ['./spinner-blanc.component.css']
})
export class SpinnerBlancComponent implements OnInit {
  @Input() message:String; 
  constructor() { }

  ngOnInit() {
  }

}
