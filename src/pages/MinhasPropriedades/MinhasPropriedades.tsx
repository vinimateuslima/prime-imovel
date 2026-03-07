import { useEffect, useState } from 'react'
import { apiController } from '../../features/api/apiController'
import TabelaPropriedades from '../../features/components/TabelaPropriedades/TabelaPropriedades'
import type { Propriedade } from '../Home/Home'
import './MinhasPropriedades.css'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../contexts/LoadingContext'
import ModalPadrao from '../../features/components/Modal/ModalPadrao'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import { apenasNumeros, estadosBrasil, formatarValor, Max100Caracteres, Max255Caracteres, validandoInput, validandoInputVazioEMinimo } from '../../features/Util'
import SelectTipo from '../../features/components/SelectTipo/SelectTipo'
import Botao from '../../features/components/Botao/Botao'
import Swal from 'sweetalert2'

const MinhasPropriedades = () => {

  const [propriedades, setPropriedades] = useState<Propriedade[]>()

  // Ferramentas
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [abrirModal, setAbrirModal] = useState(false);

  const [name, setName] = useState<string>("");
  const [controlName, setControlName] = useState<boolean>();
  const [mensagemErroName, setMensagemErroName] = useState<string>();

  const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)

  const [id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [trocarStatus, setTrocarStatus] = useState<boolean>();

  const [isAdmin, setIsAdmin] = useState<boolean>();


  function aoEditar(id: number) {
    setLoading(true)

    apiController.get(`/property/${id}`).then((response) => {

      console.log(response);

      setAbrirModal(true)
      setId(response.id)
      setName(response.name)
      setDescription(response.description)
      setType(response.type)
      setValue(response.value)
      setArea(response.area)
      setBedrooms(response.bedrooms)
      setAddress(response.address)
      setState(response.state)
      setCity(response.city)

      setLoading(false)

    }).catch((error) => {
      setLoading(false)
      console.log(error.message);

    })


  }

  function aoFechar() {
    setAbrirModal(false)
    limparCampos()

  }

  function aoExcluir(id: number) {

    Swal.fire({
      title: "Tem certeza que deseja excluir a propriedade?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      confirmButtonColor: "#C9A227",
      cancelButtonColor: "#0F172A"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        apiController.delete(`/property/${id}`).then((response) => {

          Swal.fire({
            title: 'Sucesso!',
            text: 'Propriedade excluída com sucesso!',
            icon: 'success',
            confirmButtonColor: '#C9A227',
            confirmButtonText: 'OK'
          });

          setLoading(false)
          buscarPropriedadesUsuario()

        }).catch((error) => {
          setLoading(false)
          console.log(error.message);
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
    setId("")
    setName("")
    setDescription("")
    setType("")
    setValue("")
    setArea("")
    setBedrooms("")
    setAddress("")
    setState("")
    setCity("")
  }

  async function buscarPropriedadesUsuario() {

    setLoading(true)

    let tipoUsuario: any

    let path = "/property/getUserProperties"

    await apiController.get(`/user`).then((response) => {

      tipoUsuario = response.role

      console.log("usuario role ", response.role);
      console.log("usuario 2 ", tipoUsuario == "ADMIN");

    }).catch((error) => {
      setLoading(false)
      console.log(error.message);

    })

    console.log("usuario 3 ", tipoUsuario);

    if (tipoUsuario == "ADMIN") {
      console.log("passou");

      path = "/property"
    }

    console.log("path ", path);


    apiController.get(path).then((response) => {

      if (tipoUsuario == "ADMIN") {
        setPropriedades(response.content)
        setIsAdmin(true)
      } else {
        setIsAdmin(false)
        setPropriedades(response)
      }

      setLoading(false)

    }).catch((error) => {
      setLoading(false)
      console.log(error.message);

    })
  }

  function atualizarPropriedade() {

    Swal.fire({
      title: "Tem certeza que deseja atualizar a propriedade?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      confirmButtonColor: "#C9A227",
      cancelButtonColor: "#0F172A"
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: name,
          description: description,
          type: type,
          value: value,
          area: area,
          bedrooms: bedrooms,
          address: address,
          city: city,
          state: state,
          //imageUrls: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
        }

        console.log("Dados ", data);


        setLoading(true)
        apiController.put(`/property/${id}`, data).then((response) => {

          Swal.fire({
            title: 'Sucesso!',
            text: 'Propriedade atualizada com sucesso!',
            icon: 'success',
            confirmButtonColor: '#C9A227',
            confirmButtonText: 'OK'
          });

          setAbrirModal(false)
          setLoading(false)
          buscarPropriedadesUsuario()

        }).catch((error) => {
          setLoading(false)
          console.log(error.message);
          Swal.fire({
            icon: "error",
            title: "Opa",
            text: `${error.response.data.message}`,

          });
        })

      }
    })

  }

  function aoTrocarStatus(id: number, statusAtual: boolean) {
    console.log("Id ", id);
    console.log("Status Atual ", statusAtual);

    Swal.fire({
      title: `Tem certeza que deseja ${statusAtual ? `desativar` : `ativar`} a propriedade?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      confirmButtonColor: "#C9A227",
      cancelButtonColor: "#0F172A"
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        apiController.patch(`/property/status/${id}`).then((response) => {

          Swal.fire({
            title: 'Sucesso!',
            text: 'Status da propriedade atualizado com sucesso!',
            icon: 'success',
            confirmButtonColor: '#C9A227',
            confirmButtonText: 'OK'
          });

          setLoading(false)
          buscarPropriedadesUsuario()

        }).catch((error) => {
          setLoading(false)
          console.log(error.message);
          Swal.fire({
            icon: "error",
            title: "Opa",
            text: `${error.response.data.message}`,

          });
        })


      }

    })

  }

  useEffect(() => {
    buscarPropriedadesUsuario()
  }, [])

  useEffect(() => {
    validandoInputVazioEMinimo(name, setControlName, setMensagemErroName, 10, "Nome")
  }, [name])

  return (
    <>
      <div className=" container mt-5 mb-5">
        <h2 className='mb-4'>Minhas Propriedades</h2>
        <TabelaPropriedades propriedades={propriedades || []} aoEditar={aoEditar} aoExcluir={aoExcluir} aoTrocarStatus={aoTrocarStatus} isAdmin={isAdmin}/>
      </div>

      <ModalPadrao aberto={abrirModal} aoFechar={() => aoFechar()} className='modalEditarPropriedade'>
        <InputTexto label='Nome' value={name} onChange={(e) => validandoInput(e, setName, Max100Caracteres)} controlador={controlName} mensagemErro={mensagemErroName} submitOcorreu={submitOcorreu} />
        <div className="descricao">
          <label className='mb-2 mt-1'>Descrição</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
        </div>
        <div className="row align-items-center">
          <div className="col-6">
            <SelectTipo tipo={type} onChange={(e) => setType(e.target.value)} temLabel />
          </div>
          <div className="col-6">
            <InputTexto value={value} onChange={(e) => formatarValor(e, setValue)} label='Valor' isMoeda />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-6">
            <InputTexto value={area} onChange={(e) => validandoInput(e, setArea, apenasNumeros)} label='Área m²' />
          </div>
          <div className="col-6">
            <InputTexto value={bedrooms} onChange={(e) => validandoInput(e, setBedrooms, apenasNumeros)} label='Quartos' />

          </div>
        </div>

        <InputTexto value={address} onChange={(e) => validandoInput(e, setAddress, Max255Caracteres)} label='Endereço' />

        <div className="row align-items-center">
          <div className="col-6">
            <InputTexto value={city} onChange={(e) => validandoInput(e, setCity, Max255Caracteres)} label='Cidade' />
          </div>
          <div className="col-6">
            <SelectTipo tipo={state} onChange={(e) => setState(e.target.value)} label="Estado" temLabel>
              {estadosBrasil.map((estado) => (
                <option value={estado}>{estado}</option>
              ))}
            </SelectTipo>
          </div>
        </div>
        <Botao onClick={atualizarPropriedade}>
          Atualizar
        </Botao>
      </ModalPadrao>
    </>

  )
}

export default MinhasPropriedades