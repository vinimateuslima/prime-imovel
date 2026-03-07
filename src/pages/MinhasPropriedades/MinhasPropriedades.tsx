import { useEffect, useState } from 'react'
import { apiController } from '../../features/api/apiController'
import TabelaPropriedades from '../../features/components/TabelaPropriedades/TabelaPropriedades'
import type { Propriedade } from '../Home/Home'
import './MinhasPropriedades.css'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '../../contexts/LoadingContext'
import ModalPadrao from '../../features/components/Modal/ModalPadrao'
import InputTexto from '../../features/components/InputTexto/InputTexto'
import { apenasNumeros, estadosBrasil, formatarValor, Max100Caracteres, Max255Caracteres, validandoInput, validandoInputVazioEMinimo, validarArquivoVazio, validarInputVazio } from '../../features/Util'
import SelectTipo from '../../features/components/SelectTipo/SelectTipo'
import Botao from '../../features/components/Botao/Botao'
import Swal from 'sweetalert2'
import { FaPlus } from 'react-icons/fa'
import TextoArea from '../../features/components/TextoArea/TextoArea'
import axios from 'axios'
import InputArquivo from '../../features/components/InputArquivo/InputArquivo'

const MinhasPropriedades = () => {

  const [propriedades, setPropriedades] = useState<Propriedade[]>()

  // Ferramentas
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const [abrirModal, setAbrirModal] = useState(false);

  const [name, setName] = useState<string>("");
  const [mensagemErroName, setMensagemErroName] = useState<string>();

  const [submitOcorreu, setSubmitOcorreu] = useState<boolean>(false)

  const [id, setId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("CASA");
  const [value, setValue] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("AC");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isAtualizar, setIsAtualizar] = useState<boolean>();

  const [propriedadeOriginal, setPropriedadeOriginal] = useState<Propriedade>();

  // Controladores
  const [controlName, setControlName] = useState<boolean>(false);
  const [controlDescription, setControlDescription] = useState<boolean>(false);
  const [controlType, setControlType] = useState<boolean>(false);
  const [controlValue, setControlValue] = useState<boolean>(false);
  const [controlArea, setControlArea] = useState<boolean>(false);
  const [controlBedrooms, setControlBedrooms] = useState<boolean>(false);
  const [controlAddress, setControlAddress] = useState<boolean>(false);
  const [controlCity, setControlCity] = useState<boolean>(false);
  const [controlImage, setControlImage] = useState<boolean>(false);
  const [controlState, setControlState] = useState<boolean>(false);


  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);



  const [isAdmin, setIsAdmin] = useState<boolean>();


  function aoEditar(id: number) {
    setIsAtualizar(true)
    setSubmitOcorreu(false)
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
      setImagePreview(response.imageUrls)
      setPropriedadeOriginal(response)

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

  function aoCriar() {
    limparCampos()
    setAbrirModal(true)
    setIsAtualizar(false)
    setSubmitOcorreu(false)
  }

  function limparCampos() {
    setId("")
    setName("")
    setDescription("")
    setType("CASA")
    setValue("")
    setArea("")
    setBedrooms("")
    setAddress("")
    setState("AC")
    setCity("")
    setImage(null)
    setImagePreview("")
    setPropriedadeOriginal(undefined)
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

    if (tipoUsuario == "CLIENTE") {
      navigate("/");
    }

    if (tipoUsuario == "ADMIN") {
      console.log("passou");

      path = `/property?page=${page}`
    }

    console.log("path ", path);


    apiController.get(path).then((response) => {
      console.log("response ", response);

      if (tipoUsuario == "ADMIN") {
        setPropriedades(response.content)
        setTotalPages(response.totalPages)
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

  function cadastrarPropriedade() {
    Swal.fire({
      title: "Tem certeza que deseja cadastrar a propriedade?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      confirmButtonColor: "#C9A227",
      cancelButtonColor: "#0F172A"
    }).then(async (result) => {
      if (result.isConfirmed) {

        let imageUrl = "https://placehold.co/600x400";

        if (image) {
          const urlRetornada = await uploadImagem(image)

          if (urlRetornada.trim() != "") {
            imageUrl = urlRetornada
          }

        }


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
          imageUrls: imageUrl
        }

        console.log("Dados ", data);


        setLoading(true)
        apiController.post(`/property`, data).then((response) => {

          Swal.fire({
            title: 'Sucesso!',
            text: 'Propriedade cadastrada com sucesso!',
            icon: 'success',
            confirmButtonColor: '#C9A227',
            confirmButtonText: 'OK'
          });

          setAbrirModal(false)
          setLoading(false)
          limparCampos()
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

  function atualizarOuCadastrarPropriedade() {
    setSubmitOcorreu(true)


    if (!controlName || !controlDescription || !controlValue || !controlArea || !controlBedrooms || !controlAddress || !controlCity) return

    if (isAtualizar) {
      atualizarPropriedade()
    } else {
      console.log("passou");
      if (!controlImage) return
      cadastrarPropriedade()
    }
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
    }).then(async (result) => {
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
          state: state
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
          limparCampos()
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

  async function uploadImagem(file: File) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_propriedades"); // seu preset

    let resposta = ""

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dbdgfkp4c/image/upload",
      formData
    ).then((response) => {
      resposta = response.data.secure_url;
      return resposta
    }).catch((error) => {
      console.log(error.message);
      return resposta
    })


    console.log("Response da imagem ", response);
    return resposta


  };

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("imagePreview ", imagePreview);

    if (e.target.files) {
      console.log("Arquivo ", e.target.files);

      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    buscarPropriedadesUsuario()


  }, [])

  useEffect(() => {
    validandoInputVazioEMinimo(name, setControlName, setMensagemErroName, 10, "Nome")
    validarInputVazio(description, setControlDescription)
    validarInputVazio(value, setControlValue)
    validarInputVazio(area, setControlArea)
    validarInputVazio(bedrooms, setControlBedrooms)
    validarInputVazio(address, setControlAddress)
    validarInputVazio(city, setControlCity)
    validarArquivoVazio(image, setControlImage)

  }, [name, description, value, area, bedrooms, address, city, image])

  useEffect(() => {
    buscarPropriedadesUsuario()

  }, [page, size])

  return (
    <>
      <div className=" container mt-5 mb-5">
        <div className="minhas-propriedades-header">
          <h2 className='mb-4'>Minhas Propriedades</h2>
          <Botao onClick={aoCriar}><FaPlus /> Nova propriedade</Botao>
        </div>
        <TabelaPropriedades propriedades={propriedades || []} aoEditar={aoEditar} aoExcluir={aoExcluir} aoTrocarStatus={aoTrocarStatus} isAdmin={isAdmin} />
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => { setPage(index) }}
              className={page == index ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <ModalPadrao titulo={isAtualizar ? "Atualizar propriedade" : "Cadastrar propriedade"} aberto={abrirModal} aoFechar={() => aoFechar()} className='modalEditarPropriedade'>
        <InputTexto label='Nome' value={name} onChange={(e) => validandoInput(e, setName, Max100Caracteres)} controlador={controlName} mensagemErro={mensagemErroName} submitOcorreu={submitOcorreu} />
        <div className="descricao">
          <TextoArea value={description} onChange={(e) => setDescription(e.target.value)} label='Descrição' controlador={controlDescription} submitOcorreu={submitOcorreu} />
        </div>
        <div className="row align-items-center">
          <div className="col-6">
            <SelectTipo tipo={type} onChange={(e) => setType(e.target.value)} className='selectMargem' temLabel>
              <option value="CASA">CASA</option>
              <option value="TERRENO">TERRENO</option>
              <option value="APARTAMENTO">APARTAMENTO</option>
            </SelectTipo>
          </div>
          <div className="col-6">
            <InputTexto controlador={controlValue} submitOcorreu={submitOcorreu} value={value} onChange={(e) => formatarValor(e, setValue)} label='Valor' isMoeda />
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-6">
            <InputTexto controlador={controlArea} submitOcorreu={submitOcorreu} value={area} onChange={(e) => validandoInput(e, setArea, apenasNumeros)} label='Área m²' />
          </div>
          <div className="col-6">
            <InputTexto value={bedrooms} controlador={controlBedrooms} submitOcorreu={submitOcorreu} onChange={(e) => validandoInput(e, setBedrooms, apenasNumeros)} label='Quartos' />

          </div>
        </div>

        <InputTexto value={address} controlador={controlAddress} submitOcorreu={submitOcorreu} onChange={(e) => validandoInput(e, setAddress, Max255Caracteres)} label='Endereço' />

        <div className="row align-items-center">
          <div className="col-6">
            <InputTexto value={city} controlador={controlCity} submitOcorreu={submitOcorreu} onChange={(e) => validandoInput(e, setCity, Max255Caracteres)} label='Cidade' />
          </div>
          <div className="col-6">
            <SelectTipo tipo={state} onChange={(e) => setState(e.target.value)} label="Estado" temLabel>
              {estadosBrasil.map((estado) => (
                <option value={estado}>{estado}</option>
              ))}
            </SelectTipo>
          </div>
        </div>

        {!isAtualizar && <InputArquivo onChange={handleFileChange} controlador={controlImage} submitOcorreu={submitOcorreu} />}
        {/* <div className="image-preview">
          <img src={imagePreview} alt="" />
        </div> */}
        <Botao onClick={atualizarOuCadastrarPropriedade}>
          {isAtualizar ? `Atualizar` : `Adicionar`}
        </Botao>
      </ModalPadrao>
    </>

  )
}

export default MinhasPropriedades