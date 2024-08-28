import { ChevronDownIcon } from 'lucide-react';
import { SizeButton, VariantButton } from '../ui/button';
import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
  size?: SizeButton;
  variant?: VariantButton;
}

export const ButtonLoadMore = ({
  // children = 'Load More',
  variant = 'outline',
  onClick,
  ref,
  size = 'icon',
  isFetchingNextPage,
}: Props) => {
  return (
    <>
      <div className="my-2 sm:mt-0 rounded-sm">
        <ButtonInput
          type="button"
          size={size}
          variant={variant}
          className=""
          ref={ref}
          loading={isFetchingNextPage ? true : false}
          onClick={onClick}
        >
          <ChevronDownIcon className="h-4 w-4" />
        </ButtonInput>
      </div>
    </>
  );
};
