import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-formulario-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    SeparadorComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './formulario-contato.component.html',
  styleUrl: './formulario-contato.component.css'
})
export class FormularioContatoComponent implements OnInit {
  contatoForm!: FormGroup;

  constructor(private contatosService: ContatoService, private router: Router) {
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      obs: new FormControl('')
    });
  }

  salvarContato() {
    if (this.contatoForm.valid) {
      const novoContato = this.contatoForm.value;
      this.contatosService.salvarContato(novoContato);
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    }
  }

  cancelar() {
    this.router.navigateByUrl('/lista-contatos');
  }
}
