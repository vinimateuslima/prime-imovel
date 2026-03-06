import { CiLocationOn } from 'react-icons/ci'
import './Detalhes.css'
import { MdOutlineBed } from 'react-icons/md'
import { LuMaximize } from 'react-icons/lu'
import Botao from '../../features/components/Botao/Botao'
import { FaRegHeart } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import type { Propriedade } from '../Home/Home'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { apiController } from '../../features/api/apiController'
import { IoArrowBack } from 'react-icons/io5'
import { useLoading } from '../../contexts/LoadingContext'

const Detalhes = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { setLoading } = useLoading();

    // Ferramentas
    const navigate = useNavigate();

    const [tipo, setTipo] = useState<string>("")
    const [endereco, setEndereco] = useState<string>("")
    const [valor, setValors] = useState<string>("")
    const [quartos, setQuartos] = useState<string>("")
    const [area, setArea] = useState<string>("")

    const [propriedade, setPropriedade] = useState<Propriedade>()

    function buscarPropriedade() {

        const id = searchParams.get("id");


        if (id) {
            setLoading(true)
            apiController.get(`/property/${id}`).then((response => {
                console.log("Resposta Propriedade ", response);
                setPropriedade(response)
                setLoading(false)

            })).catch((error) => {
                setLoading(false)
                console.log(error.message)
            })
        }

    }

    useEffect(() => {
        buscarPropriedade()
    }, [])


    return (
        <div className="container detalhes-container p-5">
            <div className="voltar">
                <button className='btn-voltar' onClick={() => navigate("/")}>
                    <IoArrowBack />
                    <span>Voltar</span></button>
            </div>
            {propriedade ? (
                <div className="row">
                    <div className="col-8">
                        <img src={propriedade.imageUrls} alt="Imagem do imóvel" className="img-fluid img-imovel" />
                    </div>
                    <div className="col-4 detalhes-body d-flex flex-column gap-2">
                        <div className="tipo-status d-flex justify-content-between">
                            <span className='tipo'>{propriedade.type}</span>
                            <span className={`status ${propriedade.active ? "tag-ativo" : "tag-inativo"}`}
>
                                {propriedade.active ? "Ativo" : "Inativo"}
                            </span>
                        </div>
                        <h2>{propriedade.name}</h2>
                        <div className="address d-flex gap-1 align-items-center">
                            <CiLocationOn />
                            <span>{`${propriedade.address}, ${propriedade.city} - ${propriedade.state}`}</span>
                        </div>

                        <p className='valor'>R$ {propriedade.value}</p>

                        <div className="info d-flex gap-1 justify-content-between">
                            <div className="d-flex gap-1">
                                <MdOutlineBed className="mt-1" />
                                <p>{propriedade.bedrooms} Quartos</p>
                            </div>
                            <div className="d-flex gap-1">
                                <LuMaximize className="mt-1" />
                                <p>{propriedade.area} m²</p>
                            </div>
                        </div>

                        <Botao className='d-flex align-items-center justify-content-center gap-2'>
                            <FaRegHeart />
                            Adicionar aos favoritos
                        </Botao>

                        <div className="descricao mt-2">
                            <h5>Descrição</h5>
                            <p>{propriedade.description}</p>
                        </div>


                    </div>
                </div>
            ) :

                <div><h2>Nenhuma propriedade encontrada.</h2></div>
            }

        </div>
    )
}

export default Detalhes