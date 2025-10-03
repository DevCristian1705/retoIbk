import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Result } from '../../interface/reto-interface';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/service';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss'
})
export class Resultados {

  @Input() resultsData: Result[] = []; 
  status: any;
  @Input() query: string = '';
  @Input() info: any;
  @Output() paginate = new EventEmitter<{ query: string; page: number }>();
  currentPage = 1;

  constructor(
    public service : ApiService
  ) {  
    this.status = this.service.currentState;
  }

  goToPage(page: number) {
    this.service.currentState.set('Cargando...')
    if (page < 1 || page > this.info.pages) return;
    this.currentPage = page;
    this.paginate.emit({ query: this.query, page });
  } 
}
