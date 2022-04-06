import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  public investimentos = [
    {
      id:1,
      acao:'OIBR3',
      cotacaoAtual:0.91,
      quantidade:10000
    },
    {
      id:2,
      acao:'PETR4',
      cotacaoAtual:32.90,
      quantidade:35200
    },
    {
      id:3,
      acao:'VALE3',
      cotacaoAtual:79.90,
      quantidade:15000
    },
    {
      id:4,
      acao:'BBDC4',
      cotacaoAtual:29.90,
      quantidade:25000
    }

  ]


  public formInvestimento:FormGroup;
  public formNovoInvestimento:FormGroup;


  constructor(private fb:FormBuilder) { 

    this.formInvestimento     = this.buildFormAcoes();
    this.formNovoInvestimento = this.buildFormNovoInvestimento();

  }

  ngOnInit(): void {
    this.popularForArray();
  }


  buildFormAcoes():FormGroup{
    return this.fb.group({
      investimentos: this.fb.array([])
    });
  }


  buildFormNovoInvestimento():FormGroup{
    return this.fb.group({
      nomeAcao: [null, [Validators.required]],
      quantidade:[null, Validators.required]
    });
  }

  popularForArray():void{
    
    this.investimentos.forEach(e =>{

      const item:FormGroup = this.fb.group({
        id: e.id,
        acao: e.acao,
        cotacaoAtual:e.cotacaoAtual,
        quantidade: e.quantidade,
        valorSaque: [null,  [ Validators.min(100), Validators.max(e.quantidade), this.validarLoteResgate()]],
      });

      this.formArray().push(item);
    })

  }


  validarLoteResgate():ValidatorFn{

    return(control:AbstractControl): ValidationErrors | null =>{

      const value = Number(control.value);

      //se der bom vai retornar um json com o campo saque válido 
      if((value%100) !== 0){
        return {loteInvalido: true};
      }

      return null;
    }
  }



  formArray():FormArray{
    return this.formInvestimento.get('investimentos') as FormArray;
  }


  errorsItemFormArray(index:number): any{

    const formArray = this.formArray();

    const controls = (formArray.at(index) as FormControl);

    const errors = controls.get('valorSaque')?.errors;

    //  console.log(controls.get('valorSaque'));

    return errors;


  }


  saquePronto():boolean{

    const formArray = this.formArray();

    let itensSaque = null;
    
    formArray.value.forEach((e:any)=>{
      if(e.valorSaque > 0)
        itensSaque = e;
    });

    return !itensSaque;
  }

  

  onSubmit():void{

    console.log(this.formInvestimento.value)

  }



  preparaSaque():any{

    const formArray = this.formArray();

    let itensSaque:any = {
      valorTotal:0,
      itens:[]
    };
    
    formArray.value.forEach((e:any)=>{
      if(e.valorSaque > 0){

        const item:any = {
          acao: e.acao,
          cotacaoAtual:e.cotacaoAtual,
          qntSaque: e.valorSaque,
          valor:e.valorSaque*e.cotacaoAtual
        };

        itensSaque.valorTotal+=item.valor;
        itensSaque.itens.push(item);
      }
        
    });

    return itensSaque;

  }



  onSalvarNovoInvesimento():void{
    
    //gerando um id dinamic entre 1 e 100
    const id = Math.floor(Math.random() * 100) + 1;
    // gerando cotação dinamica
    const cotacao = Math.random() * 100;

    const values = this.formNovoInvestimento.value;

    //criar um form group novo e add no formArray
    const item:FormGroup = this.fb.group({
      id: id,
      acao: values.nomeAcao,
      cotacaoAtual:cotacao,
      quantidade: values.quantidade,
      valorSaque: [null,  [ Validators.min(100), Validators.max(values.quantidade), this.validarLoteResgate()]],
    });

    //recuprar o formArray e add o elemento nele
    const formArray = this.formArray();
    formArray.push(item);

    this.formNovoInvestimento.reset();

  }

}
