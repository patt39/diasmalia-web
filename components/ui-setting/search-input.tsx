import { Input } from '@/components/ui/input';

interface Props {
  onChange: any;
  className?: string;
  placeholder: string;
}

export const SearchInput = ({ onChange, className, placeholder }: Props) => {
  return (
    <>
      <Input
        type="text"
        className={className}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};
