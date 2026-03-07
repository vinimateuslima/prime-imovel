import FormBasico from '../../features/components/FormBasico/FormBasico'
import '../Login/Login.css'
import { IoLockClosedOutline } from 'react-icons/io5'
import Botao from '../../features/components/Botao/Botao'
import { useEffect, useState, type ChangeEvent } from 'react'
import { Max100Caracteres, Max2147483647Caracteres, validandoInput, validandoInputVazioEMinimo, validarInputVazio } from '../../features/Util'
import { apiController } from '../../features/api/apiController'
import { Router, useNavigate } from 'react-router-dom'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import InputSenha from '../../features/components/InputSenha/InputSenha'
import Swal from "sweetalert2";
import { Bounce, toast } from 'react-toastify'
import { useLoading } from '../../contexts/LoadingContext'


const Cadastro = () => {

    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [controlNome, setControlNome] = useState<boolean>(false)
    const [controlEmail, setControlEmail] = useState<boolean>(false)
    const [controlPassword, setControlPassword] = useState<boolean>(false)
    const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)

    const [mensagemErroEmail, setMensagemErroEmail] = useState<string>('Campo obrigatório')
    const [mensagemErroPassword, setMensagemErroPassword] = useState<string>('Campo obrigatório')
    const [mensagemErroNome, setMensagemErroNome] = useState<string>('Campo obrigatório')

    // Ferramentas
    const navigate = useNavigate();
    const { setLoading } = useLoading();


    function Cadastrar() {

        setSubmitOcorreu(true)


        if (controlEmail && controlPassword) {
            setLoading(true)
            const data = {
                name: nome,
                email: email,
                password: password,
                role: 'CLIENTE'
            }

            apiController.post('/auth/register', data).then((response) => {
                setLoading(false)
                navigate('/login')
                toast.success('Cadastro realizado com sucesso!', {
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
        validandoInputVazioEMinimo(nome, setControlNome, setMensagemErroNome, 3, 'nome')
        validandoInputVazioEMinimoEmail(email, setControlEmail, setMensagemErroEmail)
        validandoInputVazioEMinimo(password, setControlPassword, setMensagemErroPassword, 6, 'senha')

    }
        , [email, password, nome])



    return (

       <div className="container">
         <div className="login text-center  row justify-content-center align-items-center login-container">
            <div className="col-12 d-flex justify-content-center">

                <FormBasico title='Cadastro' description='Crie sua conta para acessar o portal'>
                    <div className="form-login-group">
                        {/* <CiMail className='icon' /> */}
                        <InputTexto label='Nome' value={nome} onChange={(e) => validandoInput(e, setNome, Max100Caracteres)} placeholder='Seu nome' controlador={controlNome} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroNome} />
                    </div>
                    <div className="form-login-group">
                        {/* <CiMail className='icon' /> */}
                        <InputTexto label='E-mail' value={email} onChange={(e) => validandoInput(e, setEmail, Max100Caracteres)} placeholder='seu@email.com' controlador={controlEmail} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroEmail} />
                    </div>
                    <div className="form-login-group">
                        {/* <IoLockClosedOutline className='icon' /> */}
                        <InputSenha label='Senha' value={password} onChange={(e) => validandoInput(e, setPassword, Max2147483647Caracteres)} placeholder='Digite sua senha' controlador={controlPassword} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroPassword} />
                    </div>
                    <Botao type='button' onClick={Cadastrar}>
                        Cadastrar
                    </Botao>
                    <p>Possui uma conta? <a href="/login">Faça login</a></p>
                </FormBasico>

            </div>
        </div>
       </div>
    )
}

export default Cadastro