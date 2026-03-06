import './DropdownUsuario.css'

import { useEffect, useRef, useState } from "react";
import { FaHeart, FaUser, FaSignOutAlt, FaBuilding, FaRegUserCircle } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface DropdownUsuarioProps {
    name: string;
}

function DropdownUsuario(props: DropdownUsuarioProps) {
    const [open, setOpen] = useState(false);

    // Ferramentas
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);


    function Logout() {

        Swal.fire({
            title: "Tem certeza que deseja sair?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            confirmButtonColor: "#C9A227",
            cancelButtonColor: "#0F172A"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                navigate('/login');
                Swal.fire(
                    'Logout realizado!',
                    'Você saiu da sua conta.',
                    'success'
                )

            }
        });
    }



    return (
        <>
            <div className="dropdown" onClick={() => setOpen(!open)} ref={dropdownRef}>
                <div className="dropdown-background d-flex gap-2">
                    <FaRegUserCircle className='avatar' />
                    <button>{props.name}</button>
                </div>


            </div>
            {open && (
                <div className="menu">
                    <div className="item">
                        <FaHeart />
                        Favoritos
                    </div>

                    <div className="item">
                        <FaUser />
                        Minha Conta
                    </div>

                    <div className="item" onClick={()=> navigate("/minhas-propriedades")}>
                        <FaBuilding />
                        Minhas Propriedades
                    </div>

                    <div className="divider"></div>

                    <div className="item" onClick={Logout}>
                        <FaSignOutAlt />
                        Sair
                    </div>
                </div>
            )}


        </>
    );
}


export default DropdownUsuario;