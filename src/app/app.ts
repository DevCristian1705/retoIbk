import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ApiService],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}
