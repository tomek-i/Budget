import './papershredder.css';
interface PapershredderProps {}
export const Papershredder: React.FC<PapershredderProps> = () => {
  return (
    <div className="shredder-cont">
      <div className="shredder-paper"></div>
      <button className="shredder">
        <div className="shredder-loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Deleting
      </button>
      <div className="shredder-g-cont">
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
        <div className="shredder-garbage"></div>
      </div>
    </div>
  );
};
