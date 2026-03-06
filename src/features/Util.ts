import type { ChangeEvent } from "react"

export function validandoInput(event: ChangeEvent<HTMLInputElement, HTMLInputElement>, setState: Function, regra: Function): void {
  const value = event.target.value
  if (regra(value)) {
    setState(value)
  }
}

export function validarInputVazio(valor: string, setControlador: Function) {
  if (valor.trim() === '') {
    setControlador(false)
  } else {
    setControlador(true)
  }
}

export function validandoInputVazioEMinimo(valor: string, setControlador: Function, setMensagemErro: Function, minimo: number, nome: string) {
  if (valor.trim() === '') {
    setControlador(false)
    setMensagemErro('Campo obrigatório')
  } else {
    if (valor.length < minimo) {
      setControlador(false)
      setMensagemErro(`O campo ${nome} deve conter no mínimo ${minimo} caracteres`)
      return
    }
    setControlador(true)
  }
}

export function Max255Caracteres(valor: string): boolean {
  if (valor.length <= 255) {
    return true;
  }
  return false;
}

export function Max100Caracteres(valor: string): boolean {
  if (valor.length <= 100) {
    return true;
  }
  return false;
}

export function Max2147483647Caracteres(valor: string): boolean {
  if (valor.length <= 2147483647) {
    return true;
  }
  return false;
}

export function apenasNumeros(valor: string): boolean {
  const regex = /^[0-9]*$/;

  if (!regex.test(valor)) return false;

  const numero = Number(valor);
  

  if (numero < 0 ) return false;

  if (numero > 10000000) return false;

  return true;
}

export function formatarValor(e: ChangeEvent<HTMLInputElement, HTMLInputElement>, setState: Function) {

let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

  if (!valor) {
    setState("");
    return;
  }

  const numero = Number(valor) / 100;

  setState(numero.toFixed(2));
}

export const estadosBrasil = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO"
];

