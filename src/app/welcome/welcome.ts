import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-welcome',
  imports: [RouterModule,CommonModule],
  standalone:true,
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class Welcome {
va="blue";


}
