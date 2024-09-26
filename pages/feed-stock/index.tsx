import { LayoutDashboard } from '@/components/layouts/dashboard';

import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';
import { TabFeedStock } from './tab-feed-stock';

export function FeedStock() {
  const { t } = useInputState();
  const { data: dataAssignedTypes } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: dataAssignedTypes?.pages[0]?.data?.value[0].animalTypeId,
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );

  return (
    <>
      <LayoutDashboard title={'Feed stock'}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'STOCK.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'STOCK.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'NUMBER.FEEDBAGS' })}
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {animalStatistics?.sumStocks?.number ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'TOTAL.WEIGHT' })}
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {animalStatistics?.sumStocks?.weight ?? 0}
                    kg
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            {dataAssignedTypes ? <TabFeedStock /> : null}
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default FeedStock;
