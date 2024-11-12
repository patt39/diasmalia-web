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
import { Cross } from 'lucide-react';
import { useState } from 'react';
import { Health } from './tab-health';

export function FeedStock() {
  const { t, userStorage } = useInputState();
  const { data: dataAssignedTypes } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: dataAssignedTypes?.pages[0]?.data?.value[0].animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const [animalTypeName, setAnimalTypeName] = useState(
    dataAssignedTypes?.pages[0]?.data?.value[0].animalType?.name,
  );

  return (
    <>
      <LayoutDashboard
        title={`${userStorage?.user?.profile?.firstName} ${userStorage?.user?.profile?.lastName} - Health box`}
      >
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className="sm:col-span-2 dark:border-gray-800"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>
                    {t.formatMessage({ id: 'HEALTH.TITLE' })}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {t.formatMessage({ id: 'HEALTH.DESCRIPTION' })}
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'MEDECINES.AVAILABLE' })}
                  </CardDescription>
                  <CardTitle className="text-4xl">
                    {animalStatistics?.sumMedications ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="justify-items-center items-center">
                  <Cross className="h-10 w-10 mt-2 hover:shadow-xxl relative inline-flex animate-ping text-green-400" />
                </CardHeader>
              </Card>
            </div>
            {dataAssignedTypes ? <Health /> : null}
          </main>
          <DashboardFooter />
        </div>
      </LayoutDashboard>
    </>
  );
}
export default FeedStock;
