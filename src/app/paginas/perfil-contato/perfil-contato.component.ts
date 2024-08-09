import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "../../componentes/container/container.component";
import { Contato } from '../../componentes/contato/contato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { SeparadorComponent } from "../../componentes/separador/separador.component";

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [CommonModule, ContainerComponent, RouterLink, SeparadorComponent],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})
export class PerfilContatoComponent implements OnInit {
  contato: Contato = {
    id: 0,
    nome: '',
    avatar: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: ''
  };

  constructor(
    private contatosService: ContatoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatosService.buscarContato(parseInt(id)).subscribe((contato) => {
        this.contato = contato;
      });
    }
  }

  excluir() {
    this.contatosService.excluirContato(this.contato.id).subscribe(() => {
      this.router.navigateByUrl('/lista-contatos');
    });
  }
}