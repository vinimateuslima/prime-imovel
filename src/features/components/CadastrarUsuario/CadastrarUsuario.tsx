import { useEffect, useState } from 'react'
import './CadastrarUsuario.css'
import { useLoading } from '../../../contexts/LoadingContext'
import Swal from 'sweetalert2'
import { apiController } from '../../api/apiController'
import { Max100Caracteres, Max2147483647Caracteres, validandoInput, validandoInputVazioEMinimo, validandoInputVazioEMinimoEmail } from '../../Util'
import InputTexto from '../InputTexto/InputTexto'
import InputSenha from '../InputSenha/InputSenha'
import Botao from '../Botao/Botao'
import SelectTipo from '../SelectTipo/SelectTipo'

const CadastrarUsuario = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [role, setRole] = useState<string>('CORRETOR')

    // Controllers
    const [controlName, setControlName] = useState<boolean>(false)
    const [controlEmail, setControlEmail] = useState<boolean>(false)
    const [controlPassword, setControlPassword] = useState<boolean>(false)
    const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)


    const [mensagemErroName, setMensagemErroName] = useState<string>('Campo obrigatório')
    const [mensagemErroEmail, setMensagemErroEmail] = useState<string>('Campo obrigatório')
    const [mensagemErroPassword, setMensagemErroPassword] = useState<string>('Campo obrigatório')

    const { setLoading } = useLoading();


    function cadastrarUsuarioSendoAdmin() {

        setSubmitOcorreu(true)

        
        if (!controlName || !controlPassword || !controlEmail) return

        Swal.fire({
            title: "Tem certeza que deseja cadastrar o usuário?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            confirmButtonColor: "#C9A227",
            cancelButtonColor: "#0F172A"
        }).then(async (result) => {
            if (result.isConfirmed) {

                setLoading(true)

                const data = {
                    name: name,
                    email: email,
                    password: password,
                    role: role ? role : "CORRETOR"
                }


                apiController.post('/user/create', data).then(() => {
                    setLoading(false)
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário cadastrado com sucesso!',
                        icon: 'success',
                        confirmButtonColor: '#C9A227',
                        confirmButtonText: 'OK'
                    });
                    setSubmitOcorreu(false)
                    limparCampos()

                }).catch((error) => {
                    setLoading(false)
                    console.log("Erro ao buscar usuário ", error.message)

                    Swal.fire({
                        icon: "error",
                        title: "Opa",
                        text: `${error.response.data.message}`,

                    });
                })

            }
        })

    }


    function limparCampos() {
        setName("")
        setEmail("")
        setPassword("")
        setRole("CORRETOR")
    }

    useEffect(() => {
        validandoInputVazioEMinimo(name, setControlName, setMensagemErroName, 3, 'nome')
        validandoInputVazioEMinimoEmail(email, setControlEmail, setMensagemErroEmail)
        validandoInputVazioEMinimo(password, setControlPassword, setMensagemErroPassword, 6, 'senha')

    }, [name, email, password])


    return (
        <div className="perfilUsuario-container">
            <h3 className="mb-4">Cadastrar usuário</h3>
            <div className="form-perfil">
                <InputTexto label="Nome" placeholder='Nome da Silva' value={name} onChange={(e) => validandoInput(e, setName, Max100Caracteres)} controlador={controlName} submitOcorreu={submitOcorreu} mensagemErro={mensagemErroName} obrigatorio/>
                <InputTexto label='E-mail' value={email} onChange={(e) => validandoInput(e, setEmail, Max100Caracteres)} placeholder='seu@email.com' controlador={controlEmail} obrigatorio submitOcorreu={submitOcorreu} mensagemErro={mensagemErroEmail}/>
                <InputSenha label="Nova senha" placeholder='Teste@123' value={password} onChange={(e) => validandoInput(e, setPassword, Max2147483647Caracteres)} controlador={controlPassword} mensagemErro={mensagemErroPassword} submitOcorreu={submitOcorreu} obrigatorio/>
                <SelectTipo label='Tipo' tipo={role} onChange={(e) => setRole(e.target.value)} temLabel>
                    <option value="CORRETOR">CORRETOR</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="CLIENTE">CLIENTE</option>
                </SelectTipo>
                <Botao className="mt-2" onClick={cadastrarUsuarioSendoAdmin}>
                    Cadastrar Usuário
                </Botao>
            </div>
        </div>
    )
}

export default CadastrarUsuario