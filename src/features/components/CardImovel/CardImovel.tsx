import { FaHeart, FaRegHeart } from 'react-icons/fa'
import './CardImovel.css'
import { CiLocationOn } from 'react-icons/ci'
import { MdOutlineBed } from 'react-icons/md'
import { useState } from 'react'
import type { Propriedade } from '../../../pages/Home/Home'
import { Bounce, toast } from 'react-toastify'

interface CardImovelProps {
    propriedade: Propriedade
    link: string,
    aoFavoritar?: Function;
    desFavoritar?: Function
}

const CardImovel = (props: CardImovelProps) => {

    const [favorito, setFavorito] = useState<boolean>(props.propriedade.favorito || false)

    const handleFavoritar = (id: number) => {

        if (!favorito) {

            const retorno = props.aoFavoritar?.(id)


            if (retorno) {
                setFavorito(!favorito)
                toast.success('Propriedade favoritada com sucesso!', {
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
            return

        }

        const retorno = props.desFavoritar?.(id)

        if (retorno) {
            setFavorito(!favorito)
            toast.success('Favorito removido com sucesso!', {
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



    }

    return (
        <div className="card-imovel">
            <div className="card-imovel-top d-flex justify-content-between">
                <div className="tags">
                    <span className='tipo'>{props.propriedade.type}</span>
                    <span className={props.propriedade.active ? "tag-ativo" : "tag-inativo"}>
                        {props.propriedade.active ? "Ativo" : "Inativo"}
                    </span>
                </div>
                <button className="favorito" onClick={() => handleFavoritar(props.propriedade.id)}>
                    {favorito ? <FaHeart color='#C9A227' /> : <FaRegHeart />}
                </button>
            </div>
            <img src={props.propriedade.imageUrls || "https://placehold.co/388x291"} alt="" />
            <div className="card-imovel-body">
                <h5 className='titulo'>{props.propriedade.name}</h5>
                <div className="local d-flex gap-1">
                    <CiLocationOn />

                    <p>{props.propriedade.city} - {props.propriedade.state}</p>
                </div>


                <div className="quartos d-flex gap-1">
                    <MdOutlineBed />
                    <p>{props.propriedade.bedrooms} quartos</p>
                    <p>{props.propriedade.area} m²</p>
                </div>

                <div className="card-imovel-footer d-flex justify-content-between">
                    <p className='valor'>R$ {props.propriedade.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <a href={props.link} target="_self" rel="noopener noreferrer">
                        Ver detalhes
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CardImovel