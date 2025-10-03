import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { RetoResponse } from "../interface/reto-interface";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    url = 'https://rickandmortyapi.com/api/character/';
    currentState = signal<string>(''); 
  
    
    constructor(
        private http: HttpClient
    ) { }
  
    // getData(query: string, page: number = 1): Observable<RetoResponse> {
    //     this.currentState.set('Buscando...');
    //     return this.http.get<RetoResponse>(`${this.url}?name=${query}&page=${page}`).pipe(
    //         catchError(err => {
    //             this.currentState.set('Error en la consulta');
    //             return throwError(() => err);
    //         })
    //     );
    // }

    getData(query: string, page: number = 1): Observable<RetoResponse> { 
   
    return this.http.get<RetoResponse>(`${this.url}?name=${query}&page=${page}`).pipe(
        tap(data => {
        if (!data.results || data.results.length === 0) {
            this.currentState.set('No se encontraron resultados');
        } else {
            this.currentState.set('');
        }
        }),
        catchError(err => {
        if (err.status === 404) {
            this.currentState.set('No se encontraron resultados');
        } else {
            this.currentState.set('Error en la consulta');
        }
        // Devolvemos vacío para no romper el stream
        return of({ results: [], info: { count: 0, pages: 0, next: '', prev: null } } as RetoResponse);
        })
    );
    }

}