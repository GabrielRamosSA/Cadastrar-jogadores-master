import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, FormControl,  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from '@angular/material/checkbox';
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

interface Nivel {
  nivel: string;
}
interface Jogador {
  nome: string;
  apelido: string;
  dataNascimento: Date;
  selecionarNivel: Nivel;
  goleiro: string;
  dataEntrada: Date;
  obs: string;
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
     ButtonModule

    ],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  niveis: Nivel[] = [];
  formGroup: FormGroup;
  jogadores: Jogador[] = [];

  constructor( private messageService: MessageService) {
    const today = new Date();
    this.formGroup = new FormGroup({
      nome: new FormControl<string | null>(null),
      apelido: new FormControl<string | null>(null),
      dataNascimento: new FormControl<Date | null>(null),
      selecionarNivel: new FormControl<Nivel | null>(null),
      goleiro: new FormControl<string | null>(null),
      dataEntrada: new FormControl(today),
      obs: new FormControl<string | null>(null),
    });
  }
  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Jogador foi adicionado' });
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
    
  }

  onSubmit() {
    const formData = this.formGroup.value;

    const jogador: Jogador = {
      nome: formData.nome,
      apelido: formData.apelido,
      dataNascimento: formData.dataNascimento,
      selecionarNivel: formData.selecionarNivel,
      goleiro: formData.goleiro,
      dataEntrada: formData.dataEntrada,
      obs: formData.obs
    };

    this.jogadores = [...this.jogadores, jogador];
    this.formGroup.reset({
      dataEntrada: new Date()
    });
  }
 
}