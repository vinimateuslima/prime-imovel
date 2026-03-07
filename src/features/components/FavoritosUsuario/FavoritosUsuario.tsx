import { useEffect, useState } from 'react'
import CardImovel from '../CardImovel/CardImovel'
import TabelaPropriedades from '../TabelaPropriedades/TabelaPropriedades'
import './FavoritosUsuario.css'
import type { Propriedade } from '../../../pages/Home/Home'
import { Bounce, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../../contexts/LoadingContext'
import { apiController } from '../../api/apiController'
import { FaRegHeart } from 'react-icons/fa'

const FavoritosUsuario = () => {

    const [propriedadesFavoritas, setPropriedadesFavoridas] = useState<Propriedade[]>([])

    // Ferramentas
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    async function aoFavoritar(id: number): Promise<boolean> {
        setLoading(true)

        await apiController.post(`/user/favorites/${id}`).then((response) => {

            setLoading(false)


            return true


        }).catch(error => {
            setLoading(false)

            console.error('Erro ao favoritar propriedade:', error.message)

            toast.error('Erro ao favoritar propriedade.', {
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

            return false
        })

        return false

    }

    async function desFavoritar(id: number): Promise<boolean> {
        setLoading(true)

        await apiController.delete(`/user/favorites/${id}`).then((response) => {

            setLoading(false)
            return true

        }).catch(error => {
            setLoading(false)

            console.error('Erro ao desFavoritar propriedade:', error.message)

            toast.error('Erro ao tentar remover favorito.', {
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
            return false
        })

        return false

    }

    function listarFavoritos() {
        setLoading(true)
        apiController.get(`/user/favorites`)
            .then(response => {
                console.log("favoritos ", response)

                const novoArray = response.map((propriedade: any) => ({
                    ...propriedade,
                    favorito: true
                }));

                setPropriedadesFavoridas(novoArray)
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)
                console.error('Erro ao buscar favoritos:', error.message)
                toast.error('Erro ao buscar favoritos.', {
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
            })

    }

    useEffect(() => {
        listarFavoritos()
    }, [])


    return (
        <div className="favoritos-container">
            <h3 className="mb-4">Gerencie as suas propriedades favoritas</h3>
            {propriedadesFavoritas?.length > 0 ? (<div className="card-grid">
                {
                    propriedadesFavoritas?.map(propriedade => (
                        <CardImovel
                            key={propriedade.id}
                            propriedade={propriedade}
                            link={`/detalhes?id=${propriedade.id}`}
                            aoFavoritar={aoFavoritar}
                            desFavoritar={desFavoritar}
                        />
                    ))
                }
            </div>) :

                (<div className="nenhumFavorito">
                    <FaRegHeart />
                    <h5>Nenhum favorito ainda</h5>
                </div>)

            }
        </div>
    )
}

export default FavoritosUsuario