import './Botao.css'

interface BotaoProps {
    nome: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}


const Botao = (props: BotaoProps) => {
  return (
    <button type={props.type} className='botao' onClick={props.onClick}>
      {props.nome}
    </button>
  )
}

export default Botao