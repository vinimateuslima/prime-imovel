import { FaHeart, FaRegHeart } from 'react-icons/fa'
import './CardImovel.css'
import { CiLocationOn } from 'react-icons/ci'
import { MdOutlineBed } from 'react-icons/md'
import { useState } from 'react'

interface CardImovelProps {
    titulo: string
    localizacao: string
    quartos: number
    area: number
    valor: number
    link: string
}

const CardImovel = (props: CardImovelProps) => {

    const [favorito, setFavorito] = useState<boolean>(false)


    return (
        <div className="card-imovel">
            <div className="card-imovel-top d-flex justify-content-between">
                <span className="tag-ativo">Ativo</span>
                <button className="favorito" onClick={() => setFavorito(!favorito)}>
                    {favorito ? <FaHeart /> : <FaRegHeart />}
                </button>
            </div>
            <img src="https://placehold.co/388x291" alt="" />
            <div className="card-imovel-body">
                <h5 className='titulo'>{props.titulo}</h5>
                <div className="local d-flex gap-1">
                    <CiLocationOn />

                    <p>{props.localizacao}</p>
                </div>
                <div className="quartos d-flex gap-1">
                    <MdOutlineBed />
                    <p>{props.quartos} quartos</p>
                    <p>{props.area} m²</p>
                </div>
                <div className="card-imovel-footer d-flex justify-content-between">
                    <p className='valor'>R$ {props.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <a href={props.link} target="_blank" rel="noopener noreferrer">
                        Ver detalhes
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardImovel