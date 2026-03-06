import type { ChangeEventHandler } from "react"

import './SelectTipo.css'

interface SelectTipoProps {
    tipo: string,
    onChange: ChangeEventHandler<HTMLSelectElement, HTMLSelectElement>
    label?: string;
    temLabel?: boolean;
    children?: React.ReactNode;
}


const SelectTipo = ({ tipo, onChange, temLabel, label, children }: SelectTipoProps) => {




    return (
        <div className="selectTipo">
            {temLabel && <div className="label-container"><label className="" htmlFor="type">{label ? label : "Tipo"}</label></div>}
            <select name="type" id="" className='tipos' value={tipo} onChange={onChange}>
                {children ? children :
                    (<>
                        <option value=""></option>
                        <option value="CASA">CASA</option>
                        <option value="TERRENO">TERRENO</option>
                        <option value="APARTAMENTO">APARTAMENTO</option>
                    </>)
                }
            </select>
        </div>
    )
}

export default SelectTipo