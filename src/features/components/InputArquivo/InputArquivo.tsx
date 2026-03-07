import type { ChangeEvent } from "react";
import "../InputTexto/InputTexto.css";

interface InputArquivoProps {
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    controlador?: boolean;
    label?: string;
    obrigatorio?: boolean;
    submitOcorreu?: boolean;
    mensagemErro?: string;
}

const InputArquivo = (props: InputArquivoProps) => {
    return (
        <div className="inputTexto-container">

            {props.label &&
                <div className="label-container">
                    <label>{props.label}</label>
                    {props.obrigatorio && <span className="obrigatorio">*</span>}
                </div>
            }

            <input
                type="file"
                accept="image/*"
                onChange={props.onChange}
                className={`inputTexto ${props.className} ${props.submitOcorreu
                        ? props.controlador === false
                            ? "bordaVermelha"
                            : "bordaVerde"
                        : ""
                    }`}
            />

            {props.submitOcorreu && (
                <div className="texto-obrigatorio-container">
                    {!props.controlador && (
                        <span className="texto-obrigatorio">
                            {props.mensagemErro ? props.mensagemErro : "Campo obrigatório"}
                        </span>
                    )}
                </div>
            )}

        </div>
    );
};

export default InputArquivo;
