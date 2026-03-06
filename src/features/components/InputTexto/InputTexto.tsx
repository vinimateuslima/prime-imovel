import type { ChangeEvent } from "react";

import './InputTexto.css'

interface InputTextoProps {
    value: string;
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    controlador?: boolean;
    label?: string;
    obrigatorio?: boolean;
    submitOcorreu?: boolean;
    mensagemErro?: string;
    isMoeda?: boolean;
}

const InputTexto = (props: InputTextoProps) => {
  return (
   <div className="inputTexto-container">
      {props.label && 
      <div className="label-container"> 
        <label>{props.label}</label>
        {props.obrigatorio && <span className="obrigatorio">*</span>}
      </div>
      }
     <input 
      type={"text"} 
      value={`${props.isMoeda ? "R$ " : ""}${props.value}`} 
      onChange={props.onChange} 
      placeholder={props.placeholder}
      className={`inputTexto ${props.className} ${props.submitOcorreu ?  props.controlador == false ? 'bordaVermelha' : 'bordaVerde' : ''}`}
    />
 {props.submitOcorreu && !props.controlador && (
  <span className="texto-obrigatorio">
    {props.mensagemErro}
  </span>)}
   </div>
  )
}

export default InputTexto
