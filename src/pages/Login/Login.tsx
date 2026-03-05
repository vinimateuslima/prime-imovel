import { CiMail } from 'react-icons/ci'
import FormBasico from '../../features/components/FormBasico/FormBasico'
import './Login.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import Botao from '../../features/components/Botao/Botao'
import { useEffect, useState, type ChangeEvent } from 'react'
import { Max100Caracteres, Max2147483647Caracteres, Max255Caracteres, validandoInput, validandoInputVazioEMinimo, validarInputVazio } from '../../features/Util'
import { apiController } from '../../features/api/apiController'
import { Router, useNavigate } from 'react-router-dom'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import InputSenha from '../../features/components/InputSenha/InputSenha'
import Swal from "sweetalert2";
import { Bounce, toast } from 'react-toastify'
import { useLoading } from '../../contexts/LoadingContext'



const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // Controllers
  const [controlEmail, setControlEmail] = useState<boolean>(false)
  const [controlPassword, setControlPassword] = useState<boolean>(false)
  const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)

  const [mensagemErroEmail, setMensagemErroEmail] = useState<string>('Campo obrigatório')
  const [mensagemErroPassword, setMensagemErroPassword] = useState<string>('Campo obrigatório')

  // Ferramentas
  const navigate = useNavigate();
  const { setLoading } = useLoading();



  function Login() {



    setSubmitOcorreu(true)
   

    if (controlEmail && controlPassword) {
 setLoading(true)
      const data = {
        email: email,
        password: password
      }

      apiController.post('/auth/login', data).then((response) => {
        setLoading(false)
        if (response.token) {
          localStorage.setItem('token', response.token)
          navigate('/')
          toast.success('Login realizado com sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      }).catch((error) => {
        setLoading(false)

        Swal.fire({
          icon: "error",
          title: "Opa",
          text: `${error.response.data.message}`,

        });

      })

    }
  }

  function validandoInputVazioEMinimoEmail(valor: string, setControlador: Function, setMensagemErro: Function) {
    if (valor.trim() === '') {
      setControlador(false)
      setMensagemErro('Campo obrigatório')
    } else {

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(valor)) {
        setControlador(false)
        setMensagemErro(`Email no formato incorreto`)
        return
      }

      setControlador(true)
    }
  }


  useEffect(() => {
    validandoInputVazioEMinimoEmail(email, setControlEmail, setMensagemErroEmail)
    validandoInputVazioEMinimo(password, setControlPassword, setMensagemErroPassword, 6, 'senha')

  }
    , [email, password])

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token ", token);

    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  return (

    <div className="login row justify-content-center align-items-center login-container">
      <div className="col-12">
        <form action="">
          <FormBasico title='Login' description='Faça login para acessar sua conta'>
            <div className="form-login-group">
              {/* <CiMail className='icon' /> */}
              <InputTexto label='E-mail' value={email} onChange={(e) => validandoInput(e, setEmail, Max255Caracteres)} placeholder='seu@email.com' controlador={controlEmail} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroEmail} />
            </div>
            <div className="form-login-group">
              {/* <IoLockClosedOutline className='icon' /> */}
              <InputSenha label='Senha' value={password} onChange={(e) => validandoInput(e, setPassword, Max2147483647Caracteres)} placeholder='Digite sua senha' controlador={controlPassword} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroPassword} esqueceuSenhaLink />
            </div>
            <Botao nome='Entrar' type='button' onClick={Login} />
            <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
          </FormBasico>
        </form>
      </div>
    </div>
  )
}

export default Login