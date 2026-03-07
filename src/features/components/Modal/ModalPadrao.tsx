import { IoClose } from "react-icons/io5";
import "./ModalPadrao.css";

type Props = {
  aberto: boolean;
  aoFechar: () => void;
  children: React.ReactNode;
  className?: string
  titulo?: string
};

function ModalPadrao({ aberto, aoFechar, children, className, titulo }: Props) {
  if (!aberto) return null;

  return (
    <div className={`${className} modal-overlay`}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={aoFechar}>
          <IoClose />
        </button>
        {titulo && <h4>{titulo}</h4>}
        {children}
      </div>
    </div>
  );
}

export default ModalPadrao;
