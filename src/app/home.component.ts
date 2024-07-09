import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatDatepickerModule, NgbPaginationModule, NgbAlertModule, NgbModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isNavbarCollapsed = true;
  formularioDoJogador: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nome', 'apelido', 'dataNascimento'];

  constructor(private fb: FormBuilder) {
    this.formularioDoJogador = this.fb.group({
      nome: ['', Validators.required],
      apelido: [''],
      dataNascimento: [''],
    });
  }

  onSubmit() {
    if (this.formularioDoJogador.valid) {
      this.dataSource.data.push(this.formularioDoJogador.value);
      this.dataSource.data = [...this.dataSource.data]; 
      this.formularioDoJogador.reset();
    }else{
      window.alert('Preencha o nome do jogador!')
    }
  }
  }
