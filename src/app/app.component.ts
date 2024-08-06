import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Gerenciar Jogadores';

}
