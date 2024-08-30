import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PrimeNGConfig } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { TableComponent } from '../table/table.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';

interface Nivel {
  nivel: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    CalendarModule,
    DropdownModule,
    CheckboxModule,
    InputTextareaModule,
    TableModule,
    ToastModule,
    RippleModule,
    ButtonModule,
    CommonModule,
    ConfirmDialogModule,
    InputMaskModule,
  ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
    niveis: Nivel[] = [];
    formGroup: FormGroup;
    nomesCadastrados: string[] = [];
    value: string | undefined;
  
    constructor(
      private messageService: MessageService,
      private router: Router) {
      const today = new Date();
      this.formGroup = new FormGroup({
        nome: new FormControl<string | null>(null, Validators.required),
        apelido: new FormControl<string | null>(null),
        dataNascimento: new FormControl< | null>(null, Validators.required),
        selecionarNivel: new FormControl<Nivel | null>(null, Validators.required),
        goleiro: new FormControl<string | null>(null),
        dataEntrada: new FormControl(today),
        obs: new FormControl<string | null>(null),
        convidadoPor: new FormControl<string | null>(null)  
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
        const jogadores = JSON.parse(storedJogadores);
        this.nomesCadastrados = jogadores.map((jogador: any) => jogador.nome);
      }
    }
  
    onSubmit() {
      if (this.formGroup.valid) {
        const jogador = {
          nome: this.formGroup.value.nome!,
          apelido: this.formGroup.value.apelido!,
          dataNascimento: this.formGroup.value.dataNascimento!,
          selecionarNivel: this.formGroup.value.selecionarNivel!,
          goleiro: this.formGroup.value.goleiro!,
          dataEntrada: this.formGroup.value.dataEntrada!,
          obs: this.formGroup.value.obs!,
          convidadoPor: this.formGroup.value.convidadoPor! 
        };
  
        let jogadores = [];
        const storedJogadores = localStorage.getItem('jogadores');
        if (storedJogadores) {
          jogadores = JSON.parse(storedJogadores);
        }
  
        jogadores.push(jogador);
        localStorage.setItem('jogadores', JSON.stringify(jogadores));
  
    
        this.nomesCadastrados.push(jogador.nome);
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Você foi cadastrado!' });
        this.formGroup.reset({
          dataEntrada: new Date()
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Preencha o formulário corretamente' });
      }
    }
  
    tabela() {
      this.router.navigateByUrl('/tabela');
    }
  
  }