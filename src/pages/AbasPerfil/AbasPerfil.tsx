import { useEffect, useState } from "react";

import './AbasPerfil.css'
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import { apiController } from "../../features/api/apiController";
import type { Usuario } from "../../features/Interfaces";
import FavoritosUsuario from "../../features/components/FavoritosUsuario/FavoritosUsuario";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import CadastrarUsuario from "../../features/components/CadastrarUsuario/CadastrarUsuario";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";

const AbasPerfil = () => {

    const [abaAtiva, setAbaAtiva] = useState("perfil");

    const [dadosUsuario, setDadosUsuario] = useState<Usuario>()

    // Ferramentas
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    function buscarUsuario() {
        setLoading(true)
        apiController.get("/user").then(response => {

            let tipoUsuario: any = response.role


            setDadosUsuario(response)
            setLoading(false)


        }).catch(error => {
            setLoading(false)
            console.log("Erro ao buscar usuário ", error.message)
        })
    }

    useEffect(() => {
        buscarUsuario()
    }, [])

    return (
        <div className="abasPerfil-container">
            <div className="abasPerfil">

                <button
                    onClick={() => setAbaAtiva("perfil")}
                    className={`abasBotao ${abaAtiva === "perfil" ? "active" : ""}`}

                >
                    <FaRegUser />
                    Meu Perfil
                </button>

                <button
                    onClick={() => setAbaAtiva("favoritos")}
                    className={`abasBotao ${abaAtiva === "favoritos" ? "active" : ""}`}


                >
                    <FaRegHeart />
                    Favoritos
                </button>

                {dadosUsuario?.role === "ADMIN" && <button
                    onClick={() => setAbaAtiva("cadastro")}
                    className={`abasBotao ${abaAtiva === "cadastro" ? "active" : ""}`}


                >
                    <IoCreateOutline />
                    Cadastrar Usuário
                </button>}

            </div>

            <div className="abasBody">
                {abaAtiva === "perfil" && (
                    <PerfilUsuario dadosUsuario={dadosUsuario} />
                )}

                {abaAtiva === "favoritos" && (
                    <FavoritosUsuario />
                )}

                {abaAtiva === "cadastro" && (
                    <CadastrarUsuario />
                )}

            </div>
        </div>
    );
}

export default AbasPerfil