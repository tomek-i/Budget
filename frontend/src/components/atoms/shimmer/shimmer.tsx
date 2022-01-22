// import './shimmer.css';
interface ShimmerProps {
  type: 'box' | 'line' | 'round';
  width?: string;
  height?: string;
}
export const Shimmer: React.FC<ShimmerProps> = ({ type, width, height }) => {
  switch (type) {
    case 'box': {
      let w = width ?? '12';
      let h = height ?? '12';
      return (
        <div className={`animate-pulse rounded bg-slate-200 h-${h} w-${w}`} />
      );
    }
    case 'round': {
      let w = width ?? '12';
      let h = height ?? '12';
      return (
        <div
          className={`animate-pulse rounded-full bg-slate-200 h-${h} w-${w}`}
        />
      );
    }
    case 'line':
    default: {
      let h = height ?? '4';
      return <div className={`animate-pulse rounded bg-slate-200 h-${h}`} />;
    }
  }
};
