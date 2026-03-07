import type { ChangeEvent } from "react";

import './TextoArea.css'

interface TextoAreaProps {
    value: string;
    onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
    controlador?: boolean;
    label?: string;
    obrigatorio?: boolean;
    submitOcorreu?: boolean;
    mensagemErro?: string;
}

const TextoArea = (props: TextoAreaProps) => {
  return (
   <div className="textoArea-container">
      {props.label && 
      <div className="label-container"> 
        <label>{props.label}</label>
        {props.obrigatorio && <span className="obrigatorio">*</span>}
      </div>
      }

     <textarea 
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={`textoArea ${props.className} ${props.submitOcorreu ?  props.controlador == false ? 'bordaVermelha' : 'bordaVerde' : ''}`}
    />


    <div className="texto-obrigatorio-container">
      {props.submitOcorreu && !props.controlador && (
      <span className="texto-obrigatorio">
        {props.mensagemErro ? props.mensagemErro : "Campo obrigatório"}
      </span>
    )}
    </div>
  
   </div>
  )
}

export default TextoArea
