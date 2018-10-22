import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  cidades: CidadeDTO[];
  estados: EstadoDTO[];

  formGroup: FormGroup;
  //instancia o formGroup com o formBuilder.group
  // dentro do .group cria objeto colocando as informações que tem no html, no atribudo name das tags.. 
  //nome:['sempre o que tu quer que apareca na inicializacao',[regras de validação para o campo]]
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder, 
              public cidadeService: CidadeService,
              public clienteService: ClienteService, 
              public estadoService: EstadoService, 
              public alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
          nome:['Joaquim Silva',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
          email:['joaquim@gmail.com',[Validators.required,Validators.email]],
          tipo:['1',[Validators.required]],
          cpfOuCnpj:['34645470000',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
          senha:['123',[Validators.required]],
          logradouro:['Rua viva',[Validators.required]],
          numero:['98',[Validators.required]],
          complemento:['Apt 3',[Validators.required]],
          bairro:['Copacabana',[Validators.required]],
          cep:['827739927',[Validators.required]],
          telefone1:['89847892',[Validators.required]],
          telefone2:['',[]],
          telefone3:['',[]],
          estadoId:[null,[Validators.required]],
          cidadeId:[null,[Validators.required]]
    });

  }
  ionViewDidLoad(){
    this.estadoService.findAll().subscribe(response=>{
      this.estados=response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error=>{});
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(respose =>{
      this.cidades = respose;
      this.formGroup.controls.cidadeId.setValue(null);
    },
    error=>{});
  }

  signupUser(){
      this.clienteService.insert(this.formGroup.value)
          .subscribe(response =>{this.showInsertOK()},error=>{});

  }
  
  showInsertOK(){
    let alert = this.alertController.create({
        title: 'Feito!',
        message: 'Cadastro Realizado com sucesso',
        enableBackdropDismiss: false,
        buttons: [{text:'Ok', handler: ()=>{
          this.navCtrl.pop(); // como a tela de cadastro está empilhada sobre a tela de login, se der tudo certo eu desempilho a tela
        }}]
    });
    alert.present(); //apresenta o alert
}


}
