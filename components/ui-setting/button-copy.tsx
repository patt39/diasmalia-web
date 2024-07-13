import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { SizeButton, VariantButton } from '../ui/button';
import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  link: string;
  title?: string;
  variant: VariantButton;
  size: SizeButton;
  iconClassName: string;
}

export const ButtonCopy = ({
  children,
  link,
  variant,
  size,
  title = 'Copy',
  iconClassName,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const copyToClipBoard = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <>
      <ButtonInput
        variant={variant}
        type="button"
        size={size}
        title={title}
        icon={
          copied ? (
            <CheckIcon className={iconClassName} />
          ) : (
            <CopyIcon className={iconClassName} />
          )
        }
        onClick={() => {
          copyToClipBoard(link), setCopied(true);
        }}
        onMouseLeave={() => setCopied(false)}
      >
        {children}
      </ButtonInput>
    </>
  );
};
