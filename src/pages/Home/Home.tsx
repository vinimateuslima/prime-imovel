import { CiLocationOn } from 'react-icons/ci'
import './Home.css'
import { MdOutlineBed } from 'react-icons/md'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import CardImovel from '../../features/components/CardImovel/CardImovel'
import { useEffect, useState } from 'react'
import { apiController } from '../../features/api/apiController'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useLoading } from '../../contexts/LoadingContext'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import Botao from '../../features/components/Botao/Botao'
import { apenasNumeros, validandoInput } from '../../features/Util'

interface Propriedade {
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
  "imageUrls": string
}

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams({ page: "0", size: "10" });


  const [dadosImoveis, setDadosImoveis] = useState<Propriedade[]>([])
  const [page, setPage] = useState(searchParams.get("page") || 0);
  const [size, setSize] = useState(searchParams.get("size") || 10);
  const [tipo, setTipo] = useState(searchParams.get("type") || "");
  const [precoMin, setPrecoMin] = useState(searchParams.get("minPrice") || "");
  const [precoMax, setPrecoMax] = useState(searchParams.get("maxPrice") || "");
  const [quartos, setQuartos] = useState(searchParams.get("minBedrooms") || "");
  const [nome, setNome] = useState(searchParams.get("name") || "");
  const [totalPages, setTotalPages] = useState(0);

    const [pesquisaDebounce, setPesquisaDebounce] = useState("");



  // Ferramentas
  const navigate = useNavigate();

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

  function listarImoveis() {
    console.log("page ", page);

    const query = `?page=${page}&size=${size}&name=${nome}&type=${tipo}&minPrice=${precoMin}&maxPrice=${precoMax}&minBedrooms=${quartos}`

    console.log("Query ", query);
    
    setLoading(true)
    apiController.get(`/property${query}`).then(response => {
      console.log("resposta ", response)
      setLoading(false)
      setDadosImoveis(response.content)
      setTotalPages(response.totalPages);

    }).catch(error => {
      setLoading(false)

      console.error('Erro ao buscar imóveis:', error)
    })

  }

  useEffect(() => {
    listarImoveis()


  }, [page, size])

  useEffect(() => {
    const timer = setTimeout(() => {
      mudarParametro()
      listarImoveis()
      console.log("Nome ", nome);
      
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [nome]);


  return (
    <div className="container p-5">
      <div className='searchBar-container d-flex justify-content-center'><div className="searchBar d-flex justify-content-between align-items-end gap-2">
        <input value={nome} onChange={(e) => setNome(e.target.value)} type="search" name="" id="" placeholder='Pesquise um imóvel' /> 

        </div>
        </div>
      <div className="filtro-container d-flex justify-content-center">
        <div className="filtro d-flex justify-content-between align-items-end gap-2">
          <select name="type" id="" className='tipos' value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value=""></option>
            <option value="CASA">CASA</option>
            <option value="TERRENO">TERRENO</option>
            <option value="APARTAMENTO">APARTAMENTO</option>
          </select>

          <InputTexto value={precoMin} placeholder='Preço Min' onChange={(e) => validandoInput(e, setPrecoMin, apenasNumeros)} />
          <InputTexto value={precoMax} placeholder='Preço Max' onChange={(e) => validandoInput(e, setPrecoMax, apenasNumeros)} />
          <InputTexto value={quartos} placeholder='Qtd Quartos' onChange={(e) => validandoInput(e, setQuartos, apenasNumeros)} />
          <Botao nome='Filtrar' className='botaoFiltro' onClick={mudarParametro} />
        </div>
      </div>


      <h4>Imóveis em destaque</h4>
      <div className="card-grid">
        {
          dadosImoveis?.map(propriedade => (
            <CardImovel
              key={propriedade.id} 
              titulo={propriedade.name} 
              cidade={propriedade.city}
              estado={propriedade.state}
              tipo={propriedade.type}
              status={propriedade.active}
              quartos={propriedade.bedrooms} 
              area={propriedade.area} 
              valor={propriedade.value} 
              link={''}
              imagemUrl={propriedade.imageUrls}
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