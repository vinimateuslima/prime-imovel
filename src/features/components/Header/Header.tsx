import { Dropdown } from 'react-bootstrap'
import './Header.css'
import DropdownUsuario from '../DropdownUsuario/DropdownUsuario'

const Header = () => {
  return (
    <nav className='header'>

           <div className="col-6"> 
            <h1>Prime Imóvel</h1>
           </div>
           <div className="col-6 d-flex justify-content-end">
            <DropdownUsuario/>
           </div>
      
    </nav>
  )
}

export default Header