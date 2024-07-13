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
  children = 'Load More',
  variant = 'default',
  onClick,
  ref,
  size = 'lg',
  isFetchingNextPage,
}: Props) => {
  return (
    <>
      <div className="my-2 sm:mt-0">
        <ButtonInput
          type="button"
          size={size}
          variant={variant}
          className="w-[200px]"
          ref={ref}
          loading={isFetchingNextPage ? true : false}
          onClick={onClick}
        >
          {children}
        </ButtonInput>
      </div>
    </>
  );
};
