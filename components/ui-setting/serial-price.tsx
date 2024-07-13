import { formatePrice } from '@/utils';

interface Props {
  value: number;
  className: string;
  currency: { amount?: string; code: string };
}

const SerialPrice: React.FC<Props> = ({ value, currency, className }) => {
  return (
    <>
      <span className={className}>
        {formatePrice({
          value: currency?.amount
            ? Number(value || 0) * Number(currency?.amount || 0)
            : Number(value || 0),
          isDivide: true,
        }) ?? ''}
        &nbsp;{currency?.code ?? 'USD'}
      </span>
    </>
  );
};

export { SerialPrice };
