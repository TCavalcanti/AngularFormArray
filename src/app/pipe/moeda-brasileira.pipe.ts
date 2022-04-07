import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaBrasileira'
})
export class MoedaBrasileiraPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    let moeda = "R$";

    if(args[0] === 'usd'){
      moeda = "$"
    }else if(args[0] ==='eur'){
      moeda = "€";
    }else if(args[0] ==='cad'){
      moeda = "C$";
    }

    let casasDecimais = 5;
    if(!!args[1]){
      casasDecimais = Number(args[1]);
    }

    const valor = Number(value).toFixed(casasDecimais)

    const res = `${moeda} ${valor}`;

    return res;
  }

}
