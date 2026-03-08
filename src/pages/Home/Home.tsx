
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { useLoading } from '../../contexts/LoadingContext'
import { apiController } from '../../features/api/apiController'
import Botao from '../../features/components/Botao/Botao'
import CardImovel from '../../features/components/CardImovel/CardImovel'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import SelectTipo from '../../features/components/SelectTipo/SelectTipo'
import { apenasNumeros, formatarValor, validandoInput } from '../../features/Util'
import './Home.css'

export interface Propriedade {
  "id": number,
  "name": string,
  "description": string,
  "type": string,
  "value": number,
  "area": number,
  "bedrooms": number,
  "address": string,
  "city": string,
  "state": string,
  "active": boolean,
  "brokerId": number,
  "brokerName": string,
  "imageUrls": string,
  "favorito"?: boolean
}

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams({ sort: "id", page: "0", size: "10" });


  const [dadosImoveis, setDadosImoveis] = useState<Propriedade[]>([])
  const [page, setPage] = useState(searchParams.get("page") || 0);
  const [size, setSize] = useState(searchParams.get("size") || 10);
  const [tipo, setTipo] = useState(searchParams.get("type") || "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("minPrice") || "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("maxPrice") || "");
  const [quartos, setQuartos] = useState(searchParams.get("minBedrooms") || "");
  const [nome, setNome] = useState(searchParams.get("name") || "");
  const [totalPages, setTotalPages] = useState(0);

  // Ferramentas

  const { setLoading } = useLoading();

  function mudarParametro() {
    const params = new URLSearchParams(searchParams)

    if (nome) {
      params.set("name", nome)
    } else {
      params.delete("name")
    }




    if (tipo) {
      params.set("type", tipo)
    } else {
      params.delete("type")
    }

    if (precoMin) {
      params.set("minPrice", precoMin)
    } else {
      params.delete("minPrice")
    }

    if (precoMax) {
      params.set("maxPrice", precoMax)
    } else {
      params.delete("maxPrice")
    }

    if (quartos) {
      params.set("minBedrooms", quartos)
    } else {
      params.delete("minBedrooms")
    }

    setSearchParams(params)

    listarImoveis()
  }

  function mudarPagina(valor: number, parametro: string) {

    const params = new URLSearchParams(searchParams)

    params.set(parametro, valor.toString())

    setSearchParams(params)


  }

  async function aoFavoritar(id: number): Promise<boolean> {
    setLoading(true)

    await apiController.post(`/user/favorites/${id}`).then(() => {

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

    await apiController.delete(`/user/favorites/${id}`).then(() => {

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

  function listarImoveis() {


    const query = `?sort=id&page=${page}&size=${size}&name=${nome}&type=${tipo}&minPrice=${precoMin}&maxPrice=${precoMax}&minBedrooms=${quartos}`

    console.log("Query ", query);

    setLoading(true)
    apiController.get(`/property${query}`).then(async response => {


      const listaFavoritos: Propriedade[] | void = await listarFavoritos();



      if (listaFavoritos) {
        const dadosTratados = response.content.map((propriedade: Propriedade) => {

          const isFavorito = listaFavoritos.some(
            (fav: Propriedade) => fav.id === propriedade.id
          );

          return {
            ...propriedade,
            favorito: isFavorito
          };

        });
        setDadosImoveis(dadosTratados);


      } else {
        setDadosImoveis(response.content)
      }


      setTotalPages(response.totalPages);


      setLoading(false)

    }).catch(error => {
      setLoading(false)

      console.error('Erro ao buscar imóveis:', error)
    })

  }



  async function listarFavoritos(): Promise<Propriedade[]> {

    return apiController.get(`/user/favorites`)
      .then(response => {

        return response
      })
      .catch(error => {
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
        return []
      })

  }

  function limparFiltro() {
    setNome("")
    setTipo("")
    setPrecoMin("")
    setPrecoMax("")
    setQuartos("")
    setSearchParams({ sort: "id", page: "0", size: "10" })
    listarImoveis()
  }

  useEffect(() => {
    listarImoveis()
    const params = new URLSearchParams(searchParams)

    if (size) {
      params.set("size", size.toString())
    } else {
      params.delete("size")
    }

    setSearchParams(params)

  }, [page, size])

  useEffect(() => {
    const timer = setTimeout(() => {
      mudarParametro()
      listarImoveis()


    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [nome]);


  return (
    <div className="container p-5">
      <div className="header-imovel">
        <h1>Encontre o imóvel ideal <br />
          <span className='texto-destaque'>para você</span></h1>
      </div>
      <div className='searchBar-container d-flex justify-content-center'><div className="searchBar d-flex justify-content-between align-items-end gap-2">
        <input value={nome} onChange={(e) => setNome(e.target.value)} type="search" name="" id="" placeholder='Digite o nome de um imóvel e aguarde para pesquisar' />

      </div>
      </div>
      <div className="filtro-container d-flex justify-content-center">
        <div className="filtro">
          <div className=' d-flex justify-content-between align-items-center gap-2'>
            <SelectTipo tipo={tipo} onChange={(e) => setTipo(e.target.value)} />

            <InputTexto value={precoMin} placeholder='Preço Min' onChange={(e) => formatarValor(e, setPrecoMin)} isMoeda />
            <InputTexto value={precoMax} placeholder='Preço Max' onChange={(e) => formatarValor(e, setPrecoMax)} isMoeda />
            <InputTexto value={quartos} placeholder='Qtd Min Quartos' onChange={(e) => validandoInput(e, setQuartos, apenasNumeros)} />

            <Botao className='botaoFiltro' onClick={mudarParametro}> Filtrar </Botao>
          </div>

          <div className="limparFiltro">
            <a onClick={limparFiltro}>Limpar filtro</a>
          </div>
        </div>
      </div>


      <div className="header-grid">
        <h4>Imóveis em destaque</h4>
        <select className='tamanho' value={size} onChange={(e) => setSize(e.target.value)}>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
          <option value={50}>50 por página</option>
        </select>
      </div>
      <div className="card-grid">
        {
          dadosImoveis?.map(propriedade => (
            <CardImovel
              key={propriedade.id}
              propriedade={propriedade}
              link={`/detalhes/${propriedade.id}`}
              aoFavoritar={aoFavoritar}
              desFavoritar={desFavoritar}
            />
          ))
        }
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => { mudarPagina(index, "page"); setPage(index) }}
            className={page == index ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Home