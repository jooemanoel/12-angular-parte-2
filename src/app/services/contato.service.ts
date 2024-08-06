import { Injectable } from '@angular/core';
import { Contato } from '../componentes/contato/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatos: Contato[] = [];
  constructor() {
    this.contatos = JSON.parse(localStorage.getItem('contatos') || '');
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }
  getContatos() {
    return this.contatos;
  }
  salvarContato(contato: Contato) {
    this.contatos.push(contato);
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }
}
