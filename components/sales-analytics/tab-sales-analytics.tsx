/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useInputState } from '@/components/hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const TabSalesAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t } = useInputState();
  const { data: user } = GetOneUserMeAPI();
  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.SOLD' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumSaleChickens}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.sumSaleEggs}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.sumSaleChicks}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'AMOUNT.SALE.CHICKENS' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.amountSaleChickens.toLocaleString('en-US')}{' '}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.amountSaleEggs.toLocaleString('en-US')}{' '}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.amountSaleChicks.toLocaleString('en-US')}{' '}
                {user?.profile?.currency?.symbol}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
};
export { TabSalesAnalytics };
