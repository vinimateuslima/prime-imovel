import { Navigate, Outlet } from "react-router-dom";
import { apiController } from "../features/api/apiController";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  // let autenticado = false;

  // apiController.get("/user").then((response) => {

  //   autenticado = true;

  //   console.log("Usuario ", response);
    

  // }).catch((error) => {
  //   autenticado = false;
  //   console.log(error.message);
    
  // })

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
