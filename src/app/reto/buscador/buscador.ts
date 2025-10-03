import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-buscador',
  imports: [],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss'
})
export class Buscador {

  @Output()
  search: EventEmitter<string> = new EventEmitter<string>();
  
  onSearch(query: string) {   
    this.search.emit(query);
  }
}
