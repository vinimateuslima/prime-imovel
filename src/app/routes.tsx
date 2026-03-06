import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import Cadastro from "../pages/Cadastro/Cadastro";
import SessaoExpirada from "../pages/SessaoExpirada/SessaoExpirada";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
             <Route path="/cadastro" element={<Cadastro />} />
             <Route path="/sessao-expirada" element={<SessaoExpirada />} />

        </Routes>
    );
}
