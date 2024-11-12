/* eslint-disable @next/next/no-img-element */
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const TabAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t, userStorage } = useInputState();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEMALE.REPRODUCTION' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumFemaleReproduction ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMALTYPE.MALE.REPRODUCTION' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumMaleReproduction ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEMALE.GESTATION' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumFemaleGestation ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEMALE.LACTATION' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumFemaleLactation ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'SUM.FARROWINGS' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumFarrowings ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'SUM.WEANINGS' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumWeanings ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEMALE.GROWTH' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumFemaleGrowth ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.MALE.GROWTH' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumMaleGrowth ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
};
export { TabAnalytics };
