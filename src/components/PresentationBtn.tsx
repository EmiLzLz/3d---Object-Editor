import useGeometryStore from "../store/useGeometryStore";

interface Props {
  isActive: boolean;
  onToggle: () => void;
}

function PresentationBtn({ isActive, onToggle }: Props) {
  return (
    <button className="presentation-btn" onClick={onToggle}>
      {isActive ? "✕ Exit" : "⊞ Present"}
    </button>
  );
}

export default PresentationBtn;