import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatWeight } from '@/utils';
import { useRouter } from 'next/router';

const AvesStatistics = () => {
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const { t, userStorage } = useInputState();

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
    organizationId: userStorage?.organizationId,
  });

  const layingPercentage =
    Number(
      animalStatistics?.sumEggHarvested /
        animalStatistics?.sumAnimalsQuantity?.female,
    ) * 100;

  const layingPercentageLayers =
    Number(
      animalStatistics?.sumEggHarvested /
        animalStatistics?.sumAnimalsQuantity?.quantity,
    ) * 100;

  const hatchingPercentage =
    Number(animalStatistics?.sumHatched / animalStatistics?.sumIncubations) *
    100;

  return (
    <>
      {!['Poulet de chair', 'Pisciculture'].includes(animalType?.name) ? (
        <>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}
                {animalType?.slug}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumAnimalsQuantity?.quantity ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          {animalType?.name !== 'Pondeuses' ? (
            <>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {animalStatistics?.sumAnimalsQuantity?.male ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'ANIMAL.SUM.FEMALES' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {animalStatistics?.sumAnimalsQuantity?.female ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {animalStatistics?.sumIsolations ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
            </>
          ) : (
            ''
          )}
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumEggHarvested ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          {animalType?.name === 'Pondeuses' ? (
            <Card
              x-chunk="dashboard-05-chunk-2"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'LAYING.PERCENTAGE' })}
                </CardDescription>
                {layingPercentageLayers > 80 ? (
                  <CardTitle className="text-3xl text-green-600">
                    {Math.floor(layingPercentageLayers * 100) / 100 || 0}%
                  </CardTitle>
                ) : (
                  <CardTitle className="text-3xl">
                    {Math.floor(layingPercentageLayers * 100) / 100 || 0}%
                  </CardTitle>
                )}
              </CardHeader>
            </Card>
          ) : (
            <Card
              x-chunk="dashboard-05-chunk-2"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'LAYING.PERCENTAGE' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {Math.floor(layingPercentage * 100) / 100 || 0}%
                </CardTitle>
              </CardHeader>
            </Card>
          )}
          {animalType?.name !== 'Pondeuses' ? (
            <>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'ANIMAL.EGGS.INCUBATED' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {animalStatistics?.sumIncubations ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card
                x-chunk="dashboard-05-chunk-2"
                className=" dark:border-gray-800"
              >
                <CardHeader className="pb-2">
                  <CardDescription>
                    {t.formatMessage({ id: 'ANIMAL.EGGS.HATCHED' })}
                  </CardDescription>
                  <CardTitle className="text-3xl">
                    {animalStatistics?.sumHatched ?? 0}
                  </CardTitle>
                </CardHeader>
              </Card>
            </>
          ) : (
            ''
          )}
          {animalType?.name === 'Pondeuses' ? (
            <Card
              x-chunk="dashboard-05-chunk-2"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {animalStatistics?.sumIsolations ?? 0}
                </CardTitle>
              </CardHeader>
            </Card>
          ) : (
            ''
          )}
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.DEATH' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumDeaths ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEED' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {formatWeight(animalStatistics?.sumFeedings ?? 0)}
              </CardTitle>
            </CardHeader>
          </Card>
        </>
      ) : (
        <>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}{' '}
                {animalType?.slug}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumAnimalsQuantity?.quantity ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMALTYPE.BROILERS' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {formatWeight(animalStatistics?.averageWeight ?? 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          {animalType?.name === 'Pisciculture' ? (
            <Card
              x-chunk="dashboard-05-chunk-2"
              className=" dark:border-gray-800"
            >
              <CardHeader className="pb-2">
                <CardDescription>
                  {t.formatMessage({ id: 'FISH.SUM.SOLD' })}
                </CardDescription>
                <CardTitle className="text-3xl">
                  {animalStatistics?.sumSaleChickens?.number ?? 0}
                </CardTitle>
              </CardHeader>
            </Card>
          ) : (
            <Card
              x-chunk="dashboard-05-chunk-2"
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
          )}
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.DEATH' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumDeaths ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEED' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {formatWeight(animalStatistics?.sumFeedings ?? 0)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumIsolations ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </>
      )}
    </>
  );
};
export { AvesStatistics };
