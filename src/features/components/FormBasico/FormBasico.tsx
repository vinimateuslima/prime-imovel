import type { ReactNode } from "react";

import './FormBasico.css'

interface FormBasicoProps {
    children: ReactNode;
    title: string;
    description: string;
}



const FormBasico = (props: FormBasicoProps) => {
  return (
    <form className="form-basico">
      <div className="form-header"><h2>{props.title}</h2>
      <p>{props.description}</p></div>

      <div className="form-body">
          {props.children}
      </div>
    </form>
  )
}

export default FormBasico