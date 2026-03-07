import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { useLoading } from "../../contexts/LoadingContext"
import { apiController } from "../../features/api/apiController"
import Botao from "../../features/components/Botao/Botao"
import InputSenha from "../../features/components/InputSenha/InputSenha"
import InputTexto from "../../features/components/InputTexto/InputTexto"
import type { Usuario } from "../../features/Interfaces"
import { Max100Caracteres, Max2147483647Caracteres, validandoInput, validandoInputMinimo } from "../../features/Util"
import "./PerfilUsuario.css"

interface PerfilUsuarioProps {
    dadosUsuario?: Usuario;
}


const PerfilUsuario = ({ dadosUsuario }: PerfilUsuarioProps) => {


    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // Controllers
    const [controlName, setControlName] = useState<boolean>(false)
    const [controlPassword, setControlPassword] = useState<boolean>(false)
    const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)


    const [mensagemErroName, setMensagemErroName] = useState<string>('')
    const [mensagemErroPassword, setMensagemErroPassword] = useState<string>('')

    // Ferramentas
    const { setLoading } = useLoading();

    function atualizarUsuario() {

        if (!controlName || !controlPassword) return

        setSubmitOcorreu(true)

        Swal.fire({
            title: "Tem certeza que deseja atualizar o usuário?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            confirmButtonColor: "#C9A227",
            cancelButtonColor: "#0F172A"
        }).then(async (result) => {
            if (result.isConfirmed) {

                setLoading(true)
                setSubmitOcorreu(false)


                const data: { name?: string, password?: string, role?: string } = {}

                if (name) data.name = name

                if (password) data.password = password

                apiController.put('/user/update', data).then(() => {
                    setLoading(false)
                    setSubmitOcorreu(false)
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Usuário atualizado com sucesso!',
                        icon: 'success',
                        confirmButtonColor: '#C9A227',
                        confirmButtonText: 'OK'
                    });

                }).catch((error) => {
                    setLoading(false)
                    setSubmitOcorreu(false)
                    console.log("Erro ao buscar usuário ", error.message)
                })

            }
        })

    }



    useEffect(() => {
        validandoInputMinimo(name, setControlName, setMensagemErroName, 3, 'nome')
        validandoInputMinimo(password, setControlPassword, setMensagemErroPassword, 6, 'senha')

    }, [name, password])

    useEffect(() => {
        setName(dadosUsuario?.name || '')
        setPassword(dadosUsuario?.password || "")
    }, [dadosUsuario])

    return (
        <div className="perfilUsuario-container">
            <h3 className="mb-4">Atualizar os dados do perfil</h3>
            <div className="form-perfil">
                <InputTexto label="Nome" value={name} placeholder="Deixe em banco para manter a mesma" onChange={(e) => validandoInput(e, setName, Max100Caracteres)} controlador={controlName} submitOcorreu={submitOcorreu} mensagemErro={mensagemErroName} />
                <InputSenha label="Nova senha" placeholder="Deixe em banco para manter a mesma" value={password} onChange={(e) => validandoInput(e, setPassword, Max2147483647Caracteres)} controlador={controlPassword} mensagemErro={mensagemErroPassword} submitOcorreu={submitOcorreu} />
                <Botao className="mt-2" onClick={atualizarUsuario}>
                    Atualizar Perfil
                </Botao>
            </div>
        </div>
    )
}

export default PerfilUsuario