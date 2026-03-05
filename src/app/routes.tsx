import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />

        </Routes>
    );
}
