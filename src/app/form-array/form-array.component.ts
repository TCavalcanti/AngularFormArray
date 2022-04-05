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
      id:1,
      acao:'VALE3',
      cotacaoAtual:79.90,
      quantidade:15000
    },
    {
      id:1,
      acao:'BBDC4',
      cotacaoAtual:29.90,
      quantidade:25000
    }

  ]


  public formInvestimento:FormGroup | any = null;


  constructor(private fb:FormBuilder) { 



  }

  ngOnInit(): void {
    this.buildFormAcoes();
    this.popularForArray();
  }


  buildFormAcoes():void{

    this.formInvestimento = new FormGroup({
      investimentos: this.fb.array([])
    })

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

  
      // console.log(this.formInvestimento);

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



}
