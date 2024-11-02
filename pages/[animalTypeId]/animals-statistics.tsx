import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { GetBestSaleChannelAPI } from '@/api-site/sales';
import { TabBestSaleChannel } from '@/components/sales-analytics/tab-best-channel';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { formatWeight } from '../../utils/formate-date';

const AnimalStatistics = () => {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: saleChannel } = GetBestSaleChannelAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const weaningPercentage =
    Number(animalStatistics?.sumWeanings / animalStatistics?.sumFarrowings) *
    100;

  const farrowingPercentage =
    Number(
      animalStatistics?.sumFarrowings / animalStatistics?.sumFemaleReproduction,
    ) * 100;

  const fertilityRate =
    Number(
      animalStatistics?.totalPositiveBreedings /
        animalStatistics?.totalBreedings,
    ) * 100;

  const totalAnimals = Number(
    animalStatistics?.sumFemaleGrowth + animalStatistics?.sumMaleGrowth,
  );

  const youngDeathPercentage =
    Number(animalStatistics?.sumAnimalGrowthDead / totalAnimals) * 100;

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-1" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {animalStatistics?.sumFemales ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {animalStatistics?.sumMales ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'FERTILITY.RATE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {Math.floor(fertilityRate * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'FECONDITY.RATE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {Math.floor(farrowingPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'WEANING.PERCENTAGE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {Math.floor(weaningPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'PROLIFICITY' })}
          </CardDescription>
          <CardTitle className="text-3xl flex">
            {animalStatistics?.prolificity?.toFixed(1) ?? 0}
            <CardDescription>
              <div className="pt-4 text-xs">
                / {t.formatMessage({ id: 'LITTER.PER.FEMALE' })}
              </div>
            </CardDescription>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'YOUTH.DEATH.PERCENTAGE' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {Math.floor(youngDeathPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {animalStatistics?.sumIsolations ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMAL.FEED' })}
          </CardDescription>
          <CardTitle className="text-3xl">
            {formatWeight(animalStatistics?.sumFeedings ?? 0)}
          </CardTitle>
        </CardHeader>
      </Card>
      {saleChannel ? <TabBestSaleChannel saleChannel={saleChannel} /> : null}
    </>
  );
};
export { AnimalStatistics };
