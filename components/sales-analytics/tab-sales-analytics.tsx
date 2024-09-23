/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetBestSaleChannelAPI } from '@/api-site/sales';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { TabBestSaleChannel } from './tab-best-channel';

const TabSalesAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t } = useInputState();
  const { data: user } = GetOneUserMeAPI();
  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const { data: saleChannel } = GetBestSaleChannelAPI({
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'ANIMAL.SUM.SOLD' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {animalStatistics?.sumSaleChickens?.number ?? 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              x-chunk="dashboard-05-chunk-2"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'ANIMAL.EGGS.SALE' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {animalStatistics?.sumSaleEggs?.number ?? 0}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'ANIMAL.CHICKS.SOLD' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {animalStatistics?.sumSaleChicks?.number ?? 0}
                </CardTitle>
              </CardHeader>
            </Card>
            {saleChannel ? (
              <TabBestSaleChannel saleChannel={saleChannel} />
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'AMOUNT.SALE.CHICKENS' })}
                </CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {animalStatistics?.sumSaleChickens?.price?.toLocaleString(
                    'en-US',
                  ) ?? 0}{' '}
                  {user?.profile?.currency?.symbol}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'AMOUNT.SALE.EGGS' })}
                </CardDescription>
                <CardTitle className="text-3xl text-green-600">
                  {animalStatistics?.sumSaleEggs?.price?.toLocaleString(
                    'en-US',
                  ) ?? 0}{' '}
                  {user?.profile?.currency?.symbol}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card
              x-chunk="dashboard-05-chunk-1"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'AMOUNT.SALE.CHICKS' })}
                </CardDescription>
                <CardTitle className="text-3xl  text-green-600">
                  {animalStatistics?.sumSaleChicks?.price?.toLocaleString(
                    'en-US',
                  ) ?? 0}{' '}
                  {user?.profile?.currency?.symbol}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </>
      </main>
    </>
  );
};
export { TabSalesAnalytics };
