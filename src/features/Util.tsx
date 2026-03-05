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
      setMensagemErro(`O campo de ${nome} deve conter no mínimo ${minimo} caracteres`)
      return
    }
    setControlador(true)
  }
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
