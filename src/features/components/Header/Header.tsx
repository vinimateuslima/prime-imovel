import { Dropdown } from 'react-bootstrap'
import './Header.css'
import DropdownUsuario from '../DropdownUsuario/DropdownUsuario'
import { apiController } from '../../api/apiController'
import { use, useEffect, useState } from 'react'
import { CiLogin } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    // Ferramentas
  const navigate = useNavigate();

  const [name, setName] = useState("");

  function buscarUsuario() {

    if (!localStorage.getItem("token")) {
      return;
    }

    apiController.get("/user").then(response => {
      setName(response.name)
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
        <h1>Prime Imóvel</h1>
      </div>
      <div className="col-6 d-flex justify-content-end">
       { name ? <DropdownUsuario name={name} /> : <button className='btn-entrar' onClick={() => navigate("/login")} ><CiLogin /> Entrar</button> }
      </div>

    </nav>
  )
}

export default Header