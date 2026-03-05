import type { ChangeEvent } from "react";

import './InputSenha.css'

import '../InputTexto/InputTexto.css'

interface InputTextoProps {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  controlador?: boolean;
  label: string;
  obrigatorio?: boolean;
  submitOcorreu?: boolean;
  mensagemErro: string;
  esqueceuSenhaLink?: boolean;
}

const InputSenha = (props: InputTextoProps) => {
  return (
    <div className="inputSenha-container">
      <div className="label-senha-container">
        <div className="label-texto">
          <label>{props.label}</label>
          {props.obrigatorio && <span className="obrigatorio">*</span>}
        </div>
        {props.esqueceuSenhaLink && <div className="label-senha">
          <a href="/esqueci-senha">Esqueceu a senha?</a>
        </div>}
      </div>
      <input
        type={"text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`inputSenha ${props.className} ${props.submitOcorreu ? props.controlador == false ? 'bordaVermelha' : 'bordaVerde' : ''}`}
      />

      {props.submitOcorreu && !props.controlador && (
        <span className="texto-obrigatorio">
          {props.mensagemErro}
        </span>
      )}
    </div>
  )
}

export default InputSenha
