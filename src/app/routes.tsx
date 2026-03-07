import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Cadastro from "../pages/Cadastro/Cadastro";
import SessaoExpirada from "../pages/SessaoExpirada/SessaoExpirada";
import Detalhes from "../pages/Detalhes/Detalhes";
import MinhasPropriedades from "../pages/MinhasPropriedades/MinhasPropriedades";
import MinhaConta from "../pages/MinhaConta/MinhaConta";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/detalhes" element={<Detalhes />} />
                    <Route path="/minhas-propriedades" element={<MinhasPropriedades />} />
                    <Route path="/minha-conta" element={<MinhaConta />} />
                </Route>


            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sessao-expirada" element={<SessaoExpirada />} />


        </Routes>
    );
}
