import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Buscador } from './buscador/buscador';
import { Resultados } from './resultados/resultados';
import { ApiService } from '../service/service';
import { Result } from '../interface/reto-interface';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reto',
  standalone: true,
  imports: [RouterModule, Buscador, Resultados],
  providers: [ApiService],
  templateUrl: './reto.html',
  styleUrl: './reto.scss'
})
export class Reto implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<{ query: string; page: number; }>(); 
  results: Result[] = [];
  info: any;
  page = 1;

  constructor(
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(3000),              // espera 5 segundos sin escribir
      distinctUntilChanged(),          // solo emite si cambia el valor
      switchMap(({ query, page }) => this.service.getData(query, page)),
      takeUntil(this.destroy$) 
    ).subscribe({
      next: data => { 
        this.results = data.results;
        this.info = data.info; 
      },
      error: () => {
        this.results = [];
        this.info = null;
      }
    });
  }
  
  onPageChange(event: { query: string; page: number }) { 
    this.results = [];
    this.page = event.page;
    this.searchSubject.next({ ...event }); 
  }

  onSearch(query: string) { 
    this.results = [];
    this.service.currentState.set('Buscando...');
    this.searchSubject.next({ query, page: 1 }); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

 

}

/*
//TODO: Implementar el reto aqui

  //FUNCIONALES
  1 crear componente  para la busqueda con un campo de entrada para el texto
  2 mostrar los resultados en una lista que incluya el nombre y la imagen de cada personaje
  3 los resultados deben estar paginados de acuerdo a la respuesta del api
  4 mostrar mensaje de estado "cargando" mientras se obtienen los datos, y "no se encontraron resultados" si la busqueda no arroja resultados, y un mensaje de error si la peticion falla
  5 aL darle click a cada item de la lista, debe redireccionar a una pagina de detalle que muestre toda la informacion del personaje
  6 si el campo de busqueda esta vacio mostrar la lista completa


  TENICOS:
  1 Cada vez que el usuario escribe, realizar la llamada a la api con un debounce de 300ms, es necesario cancelar la llamada anterior si el usuario sigue escribiendo
  2 El componeten de busqueda y el componete para mostrar deben estar en modulo diferentes
  3 Usar ngrx stores para almacenar y compartir la informacion entre los componentes
  4 pruebas unitarias 

*/
