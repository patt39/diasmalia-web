import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetSaleStatisticsAPI } from '@/api-site/sales';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

const AvesStatistics = () => {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: saleStatistics } = GetSaleStatisticsAPI();

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  return (
    <>
      {animalType?.name !== 'Poulet de chair' ? (
        <>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.EGGS.SALE' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {saleStatistics?.sumSaleEggs}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.EGGS.INCUBATED' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumIncubations}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.sumHatched}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.CHICKS.SOLD' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {saleStatistics?.sumSaleChicks}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.sumFeedings}kg
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.TREATMENTS' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumTreatments}
              </CardTitle>
            </CardHeader>
          </Card>
        </>
      ) : (
        <>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.SOLD' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {saleStatistics?.sumSaleChickens}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.DEATH' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumDeaths}
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
              <CardTitle className="text-4xl">
                {animalStatistics?.sumFeedings}kg
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.TREATMENTS' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumTreatments}
              </CardTitle>
            </CardHeader>
          </Card>
        </>
      )}
    </>
  );
};
export { AvesStatistics };
