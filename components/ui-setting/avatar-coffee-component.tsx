import { cn } from '@/lib/utils';
import { CupSodaIcon } from 'lucide-react';

interface Props {
  color: any;
  size?: number;
  className?: string;
}

const AvatarCoffeeComponent = (props: Props) => {
  const { color, size, className = 'h-10 w-10' } = props;
  return (
    <>
      <CupSodaIcon className={cn('text-blue-400', className)} />
    </>
  );
};
export { AvatarCoffeeComponent };
