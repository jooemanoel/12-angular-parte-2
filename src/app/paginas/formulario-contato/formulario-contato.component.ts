import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../componentes/container/container.component';
import { SeparadorComponent } from "../../componentes/separador/separador.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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

  constructor(
    private contatosService: ContatoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarContato();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      avatar: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      aniversario: new FormControl(''),
      redes: new FormControl(''),
      obs: new FormControl('')
    });
  }

  carregarContato() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatosService.buscarContato(parseInt(id)).subscribe((contato) => {
        this.contatoForm.patchValue(contato);
      });
    }
  }

  salvarContato() {
    if (this.contatoForm.valid) {
      const novoContato = this.contatoForm.value;
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      novoContato.id = id ? parseInt(id) : null;
      this.contatosService.salvarContato(novoContato).subscribe(() => {
        this.contatoForm.reset();
        this.router.navigateByUrl('/lista-contatos');
      });
    }
  }

  aoSelecionarArquivo(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.lerArquivo(file);
    }
  }

  lerArquivo(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.contatoForm.get('avatar')?.setValue(reader.result);
      }
    }
    reader.readAsDataURL(file);
  }

  cancelar() {
    this.router.navigateByUrl('/lista-contatos');
  }
}
