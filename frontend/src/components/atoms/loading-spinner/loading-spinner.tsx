import './loading-spinner.css';
interface LoadingSpinnerProps {
  color: string;
}
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ color }) => {
  return (
    <div className="loader">
      <div className="circle" style={{ background: color }}></div>
      <div className="circle" style={{ background: color }}></div>
      <div className="circle" style={{ background: color }}></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
    </div>
  );
};
