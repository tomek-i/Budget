// import './shimmer.css';
interface ShimmerProps {
  type: 'box' | 'line' | 'photo';
  width?: string;
  height?: string;
}
export const Shimmer: React.FC<ShimmerProps> = ({ type, width, height }) => {
  return <span className={`shimmer ${type}`} style={{ width, height }}></span>;
};
