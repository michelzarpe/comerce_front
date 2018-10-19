import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  //instancia o formGroup com o formBuilder.group
  // dentro do .group cria objeto colocando as informações que tem no html, no atribudo name das tags.. 
  //nome:['sempre o que tu quer que apareca na inicializacao',[regras de validação para o campo]]
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
          nome:['Joaquim Silva',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
          email:['joaquim@gmail.com',[Validators.required,Validators.email]],
          tipo:['2',[Validators.required]],
          cpfOuCnpj:['05626788913',[Validators.required,Validators.minLength(11),Validators.maxLength(14)]],
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

  signupUser(){
    console.log("Enviou o formulário");
  }
}
