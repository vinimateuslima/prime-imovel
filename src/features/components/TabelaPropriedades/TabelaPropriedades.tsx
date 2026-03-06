import { FaEdit, FaTrash } from "react-icons/fa";
import "./TabelaPropriedades.css";
import type { Propriedade } from "../../../pages/Home/Home";

type TabelaPropriedadesProps = {
    propriedades: Propriedade[];
    aoEditar: (id: number) => void;
    aoExcluir: (id: number) => void;
};

export default function TabelaPropriedades({
    propriedades,
    aoEditar,
    aoExcluir,
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
                    </tr>
                </thead>

                <tbody>
                    {propriedades.map((propriedade) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
