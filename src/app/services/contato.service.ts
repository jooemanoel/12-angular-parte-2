import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly API = 'http://127.0.0.1:3000/contatos';

  constructor(private http: HttpClient) { }

  getContatos(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.API);
  }

  salvarContato(contato: Contato): Observable<Contato> {
    if (contato.id) {
      return this.editarContato(contato);
    }
    else {
      return this.http.post<Contato>(this.API, contato);
    }
  }

  buscarContato(id: number): Observable<Contato> {
    const url: string = `${this.API}/${id}`;
    return this.http.get<Contato>(url);
  }

  excluirContato(id: number): Observable<Contato> {
    const url: string = `${this.API}/${id}`;
    return this.http.delete<Contato>(url);
  }

  editarContato(contato: Contato): Observable<Contato> {
    const url: string = `${this.API}/${contato.id}`;
    return this.http.put<Contato>(url, contato);
  }

}
