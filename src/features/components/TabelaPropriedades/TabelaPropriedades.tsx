import { FaEdit, FaTrash } from "react-icons/fa";
import "./TabelaPropriedades.css";
import type { Propriedade } from "../../../pages/Home/Home";
import { Form } from "react-bootstrap";

type TabelaPropriedadesProps = {
    propriedades: Propriedade[];
    aoEditar: (id: number) => void;
    aoExcluir: (id: number) => void;
    aoTrocarStatus: Function;
    isAdmin?: boolean;
};

export default function TabelaPropriedades({
    propriedades,
    aoEditar,
    aoExcluir,
    aoTrocarStatus,
    isAdmin
}: TabelaPropriedadesProps) {

    return (
        <div className="tabela-container">
            <table className="tabela-propriedades">
                <thead>
                    <tr>
                        <th>Imóvel</th>
                        <th>Tipo</th>
                        <th>Quartos</th>
                        <th>Preço</th>
                        <th className="acoes">Ações</th>
                        <th>Status</th>
                        {isAdmin && <th>Responsável</th>}
                    </tr>
                </thead>

                <tbody>
                    {propriedades
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((propriedade) => (
                            <tr key={propriedade.id}>
                                <td>{propriedade.name}</td>
                                <td>{propriedade.type}</td>
                                <td>{propriedade.bedrooms}</td>

                                <td className="preco">
                                    {propriedade.value.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </td>

                                <td className="acoes">
                                    <FaEdit
                                        className="icone editar"
                                        onClick={() => aoEditar(propriedade.id)}
                                    />

                                    <FaTrash
                                        className="icone excluir"
                                        onClick={() => aoExcluir(propriedade.id)}
                                    />



                                </td>

                                <td>
                                    <Form.Check
                                        className="switchStatus"
                                        type="switch"
                                        id="custom-switch"
                                        checked={propriedade.active}
                                        onChange={() => aoTrocarStatus(propriedade.id, propriedade.active)}
                                    />
                                </td>

                                {isAdmin && <td>
                                    {propriedade.brokerName}
                                </td>}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
