import './Header.css'
import DropdownUsuario from '../DropdownUsuario/DropdownUsuario'
import { apiController } from '../../api/apiController'
import {useEffect, useState } from 'react'
import { CiLogin } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const Header = () => {
 
    // Ferramentas
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState("CLIENTE");

  function buscarUsuario() {

    if (!localStorage.getItem("token")) {
      return;
    }

    apiController.get("/user").then(response => {
      setName(response.name)
      setUserRole(response.role)
    }).catch(error => {
      console.log("Erro ao buscar usuário ", error.message)
    })
  }

  useEffect(() => {
    buscarUsuario()
  }, [])

  return (
    <nav className='header'>

      <div className="col-6">
        <h1 onClick={() => navigate("/")}><span className='texto-destaque'>Prime</span> Imóvel</h1>
      </div>
      <div className="col-6 d-flex justify-content-end">
       { name ? <DropdownUsuario userRole={userRole} name={name} /> : <button className='btn-entrar' onClick={() => navigate("/login")} ><CiLogin /> Entrar</button> }
      </div>

    </nav>
  )
}

export default Header