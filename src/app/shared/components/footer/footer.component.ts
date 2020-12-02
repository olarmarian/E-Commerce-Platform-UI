import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  appName: string = "E-Commerce Platform"
  version: string = '1.0.0';
  name: string = 'Teo';
  constructor() {}

  ngOnInit(): void {}
}
