import "./ModalPadrao.css";

type Props = {
  aberto: boolean;
  aoFechar: () => void;
  children: React.ReactNode;
  className?: string
};

function ModalPadrao({ aberto, aoFechar, children, className }: Props) {
  if (!aberto) return null;

  return (
    <div className={`${className} modal-overlay`} onClick={aoFechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-fechar" onClick={aoFechar}>
          ×
        </button>

        {children}
      </div>
    </div>
  );
}

export default ModalPadrao;
