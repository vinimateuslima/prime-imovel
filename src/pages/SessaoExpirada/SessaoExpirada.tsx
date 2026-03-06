import { useNavigate } from 'react-router-dom';
import Botao from '../../features/components/Botao/Botao';
import './SessaoExpirada.css';
import { useEffect } from 'react';

const SessaoExpirada = () => {

const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
   <div className="sessao-expirada container">
        <h1>Sessão Expirada</h1>
        <h5>Faça o login para acessar novamente.</h5>
        <Botao nome='Fazer login' className='botaoLogin' onClick={() => {navigate('/login')}}/>
   </div>
  )
}

export default SessaoExpirada