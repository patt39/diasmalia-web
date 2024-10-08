import { useInputState } from '../hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const TabBestSaleChannel = ({ saleChannel }: { saleChannel: any }) => {
  const bestSaleChannel = Object.keys(saleChannel).reduce((a, b) =>
    saleChannel[a] > saleChannel[b] ? a : b,
  );
  const { t } = useInputState();

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-1" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'BEST.SALE.CHANNEL' })}
          </CardDescription>
          <CardTitle className="text-xl">
            {bestSaleChannel == 'Farm'
              ? t.formatMessage({ id: 'FARM' })
              : bestSaleChannel == 'Market'
                ? t.formatMessage({ id: 'MARKET' })
                : bestSaleChannel == 'SocialMedia'
                  ? t.formatMessage({ id: 'SOCIALMEDIA' })
                  : bestSaleChannel == 'Auction'
                    ? t.formatMessage({ id: 'AUCTION' })
                    : bestSaleChannel == 'Contract'
                      ? t.formatMessage({ id: 'CONTRACT' })
                      : t.formatMessage({ id: 'OTHER' })}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
};
export { TabBestSaleChannel };
