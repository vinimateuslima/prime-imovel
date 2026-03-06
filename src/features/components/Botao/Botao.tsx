import './Botao.css'

interface BotaoProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    className?: string
    children?: React.ReactNode;
}


const Botao = (props: BotaoProps) => {
  return (
    <button type={props.type} className={`botao ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Botao