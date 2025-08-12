import { ArrowUpRight } from 'lucide-react';

interface Props {
  size?: number;
  className?: string;
}

export default function AnimatedArrowUpRight({ size = 16, className = '' }: Props) {
  return (
    <div
      className={`transition-smooth relative overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <ArrowUpRight
        size={size}
        className="transition-smooth absolute inset-0 group-hover:translate-x-full group-hover:-translate-y-full"
      />
      <ArrowUpRight
        size={size}
        className="transition-smooth absolute inset-0 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </div>
  );
}
