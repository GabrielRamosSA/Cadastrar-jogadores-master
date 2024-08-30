import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Nivel {
  nivel: string;
}

interface Jogador {
  nome: string;
  apelido: string;
  dataNascimento: Date;
  selecionarNivel: { nivel: string };
  goleiro: string;
  dataEntrada: Date;
  obs: string;
  convidadoPor: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    MatCheckboxModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    InputTextareaModule,
    TableModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ConfirmationService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  jogadores: Jogador[] = [];
  visible: boolean = false;
  niveis: Nivel[] = [];
  nomesCadastrados: string[] = [];
  formGroup: FormGroup;
  editIndex: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      apelido: [''],
      dataNascimento: ['', Validators.required],
      selecionarNivel: ['', Validators.required],
      goleiro: [''],
      convidadoPor: [''],
      dataEntrada: ['', Validators.required],
      obs: ['']
    });
  }

  ngOnInit() {
    this.niveis = [
      { nivel: '1' },
      { nivel: '2' },
      { nivel: '3' },
      { nivel: '4' },
      { nivel: '5' },
      { nivel: '6' }
    ];
    const storedJogadores = localStorage.getItem('jogadores');
    if (storedJogadores) {
      this.jogadores = JSON.parse(storedJogadores);
      this.nomesCadastrados = this.jogadores.map(jogador => jogador.nome);
    }
  }

  showDialog(index: number) {
    this.editIndex = index;
    const jogador = this.jogadores[index];
    this.formGroup.patchValue(jogador);
    this.visible = true;
  }

  onSubmit() {
    if (this.formGroup.valid && this.editIndex !== null) {
      const jogador: Jogador = {
        nome: this.formGroup.value.nome!,
        apelido: this.formGroup.value.apelido!,
        dataNascimento: this.formGroup.value.dataNascimento!,
        selecionarNivel: this.formGroup.value.selecionarNivel!,
        goleiro: this.formGroup.value.goleiro!,
        dataEntrada: this.formGroup.value.dataEntrada!,
        obs: this.formGroup.value.obs!,
        convidadoPor: this.formGroup.value.convidadoPor!
      };

      
      this.jogadores[this.editIndex] = jogador;
      localStorage.setItem('jogadores', JSON.stringify(this.jogadores));
      
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Jogador atualizado!' });
      this.visible = false;
      this.editIndex = null;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Preencha o formulário corretamente' });
    }
  }

  confirm2(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você deseja deletar esse jogador?',
      header: 'Confirmar exclusão',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      accept: () => {
        this.removerJogador(index);
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Jogador removido' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Ação cancelada' });
      }
    });
  }

  removerJogador(index: number) {
    this.jogadores.splice(index, 1);
    localStorage.setItem('jogadores', JSON.stringify(this.jogadores));
  }

  voltar() {
    this.router.navigateByUrl('/');
  }
}
