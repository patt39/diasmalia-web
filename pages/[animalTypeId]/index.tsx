import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import { TabAnalytics } from '@/components/analytics/tab-analytics';
import { TabAnimals } from '@/components/animals/tab-animals';
import { TabAvesAnimals } from '@/components/aves-animals/tab-aves-animals';
import { TabAvesDeaths } from '@/components/aves-deaths/tab-aves-deaths';
import { TabAvesFeedings } from '@/components/aves-feeding/tab-aves-feedings';
import { TabAvesIsolations } from '@/components/aves-isolations/tab-aves-isolations';
import { TabAvesSales } from '@/components/aves-sales/tab-aves-sales';
import { TabAvesTreatments } from '@/components/aves-treatments/tab-aves-treatment';
import { TabBreedings } from '@/components/breedings/tab-breedings';
import { TabDeaths } from '@/components/deaths/tab-deaths';
import { TabEggHarvestings } from '@/components/egg-harvestings/tab-egg-harvestings';
import { TabFarrowings } from '@/components/farrowings/tab-farrowings';
import { TabFattenings } from '@/components/fattenings/tab-fattenings';
import { TabFeedings } from '@/components/feedings/tab-feedings';
import { TabGestations } from '@/components/gestations/tab-gestations';
import { TabIncubations } from '@/components/incubations/tab-incubations';
import { TabIsolations } from '@/components/isolations/tab-isolations';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { TabLocations } from '@/components/locations/tab-locations';
import { TabMilkings } from '@/components/milkings/tab-milkings';
import { TabSales } from '@/components/sales/tab-sales';
import { TabTreatments } from '@/components/treatments/tab-treatment';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PrivateComponent } from '@/components/util/private-component';
import { TabWeanings } from '@/components/weanings/tab-weanings';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { AvesStatistics } from './aves-statistics';

export function Index() {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <LayoutDashboard title={animalType?.name}>
        <div className="flex min-h-screen w-full flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {['Porciculture'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemales}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMales}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : ['Cuniculture'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemales}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMales}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : ['Bovins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemales}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMales}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : ['Caprins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemales}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMales}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : ['Ovins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemales}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMales}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : ['Pondeuses'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics.sumMaleAnimals}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemaleAnimals}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumEggHarvested}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Canards'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMaleAnimals}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemaleAnimals}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumEggHarvested}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Dinde'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}{' '}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMaleAnimals}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemaleAnimals}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumEggHarvested}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Poulets Goliaths'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}{' '}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMaleAnimals}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemaleAnimals}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumEggHarvested}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Poulets Brahma'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMAL.SUM.MALES' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumMaleAnimals}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumFemaleAnimals}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-2"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS' })}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumEggHarvested}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Poulet de chair'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.BROILERS.DESCRIPTION',
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}{' '}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
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
                    <CardTitle className="text-4xl">
                      {Math.floor(animalStatistics?.averageWeight * 100) /
                        100 || '00'}
                      Kg
                    </CardTitle>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Pisciculture'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    <CardTitle>
                      {t.formatMessage({ id: 'DIASMALIA.WELCOME' })}
                      {animalType?.slug || 'pisciculture'}
                    </CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.BROILERS.DESCRIPTION',
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card
                  x-chunk="dashboard-05-chunk-1"
                  className=" dark:border-gray-800"
                >
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {t.formatMessage({ id: 'ANIMALTYPE.AVES.QUANTITY' })}
                      {animalType?.slug}
                    </CardDescription>
                    <CardTitle className="text-4xl">
                      {animalStatistics?.sumAnimalsQuantity}
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
                    <CardTitle className="text-4xl">
                      {animalStatistics?.averageWeight || '00'} Kg
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            ) : (
              ''
            )}

            <Tabs defaultValue="locations">
              <div className="flex items-center">
                {[
                  'Porciculture',
                  'Bovins',
                  'Cuniculture',
                  'Caprins',
                  'Ovins',
                ].includes(animalType?.name) ? (
                  <TabsList>
                    {['Porciculture'].includes(animalType?.name) ? (
                      <TabsTrigger value="locations">
                        {t.formatMessage({ id: 'ANIMALTYPE.LOCATIONS.PIGS' })}
                      </TabsTrigger>
                    ) : ['Cuniculture'].includes(animalType?.name) ? (
                      <TabsTrigger value="locations">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.LOCATIONS.RABBITS',
                        })}
                      </TabsTrigger>
                    ) : (
                      <TabsTrigger value="locations">
                        {t.formatMessage({ id: 'ANIMALTYPE.LOCATIONS' })}
                      </TabsTrigger>
                    )}

                    {['Porciculture'].includes(animalType?.name) ? (
                      <TabsTrigger value="animals">
                        {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.PIGS' })}
                      </TabsTrigger>
                    ) : ['Cuniculture'].includes(animalType?.name) ? (
                      <TabsTrigger value="animals">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.ANIMALS.RABBITS',
                        })}
                      </TabsTrigger>
                    ) : ['Bovins'].includes(animalType?.name) ? (
                      <TabsTrigger value="animals">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.ANIMALS.BOVINS',
                        })}
                      </TabsTrigger>
                    ) : ['Caprins'].includes(animalType?.name) ? (
                      <TabsTrigger value="animals">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.ANIMALS.CAPRINS',
                        })}
                      </TabsTrigger>
                    ) : (
                      <TabsTrigger value="animals">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.ANIMALS.SHEEPS',
                        })}
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="feedings">
                      {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                    </TabsTrigger>
                    {!['Bovins', 'Caprins', 'Ovins'].includes(
                      animalType?.name,
                    ) ? (
                      <TabsTrigger value="fattenings">
                        {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                      </TabsTrigger>
                    ) : (
                      ''
                    )}

                    <TabsTrigger value="breedings">
                      {t.formatMessage({ id: 'ANIMALTYPE.BREEDING' })}
                    </TabsTrigger>
                    <TabsTrigger value="gestations">
                      {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
                    </TabsTrigger>
                    <TabsTrigger value="farrowings">
                      {t.formatMessage({ id: 'ANIMALTYPE.FARROWING' })}
                    </TabsTrigger>
                    {!['Bovins', 'Caprins'].includes(animalType?.name) ? (
                      <TabsTrigger value="weanings">
                        {t.formatMessage({ id: 'ANIMALTYPE.WEANINGS' })}
                      </TabsTrigger>
                    ) : (
                      ''
                    )}
                    {['Bovins', 'Caprins'].includes(animalType?.name) ? (
                      <TabsTrigger value="milkings">
                        {t.formatMessage({ id: 'ANIMALTYPE.MILKINGS' })}
                      </TabsTrigger>
                    ) : (
                      ''
                    )}
                    <TabsTrigger value="deaths">
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </TabsTrigger>
                    <TabsTrigger value="isolations">
                      {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                    </TabsTrigger>
                    <TabsTrigger value="treatments">
                      {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                    </TabsTrigger>
                    <TabsTrigger value="sales">
                      {t.formatMessage({ id: 'MENU.SALES' })}
                    </TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>
                ) : [
                    'Pondeuses',
                    'Dinde',
                    'Canards',
                    'Pintarde',
                    'Poulets Brahma',
                    'Poulets Goliaths',
                  ].includes(animalType?.name) ? (
                  <TabsList>
                    <TabsTrigger value="locations">
                      {t.formatMessage({ id: 'ANIMALTYPE.LOCATIONS.AVES' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-animals">
                      {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.AVES' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-feedings">
                      {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                    </TabsTrigger>
                    <TabsTrigger value="egg-harvestings">
                      {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
                    </TabsTrigger>
                    <TabsTrigger value="incubations">
                      {t.formatMessage({ id: 'ANIMALTYPE.INCUBATION' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-deaths">
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-isolations">
                      {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-treatments">
                      {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-sales">
                      {t.formatMessage({ id: 'MENU.SALES' })}
                    </TabsTrigger>
                  </TabsList>
                ) : (
                  <TabsList>
                    {['Poulet de chair'].includes(animalType?.name) ? (
                      <TabsTrigger value="locations">
                        {t.formatMessage({
                          id: 'ANIMALTYPE.LOCATIONS.AVES',
                        })}
                      </TabsTrigger>
                    ) : (
                      <TabsTrigger value="locations">
                        {t.formatMessage({ id: 'ANIMALTYPE.LOCATIONS.FISH' })}
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="aves-animals">
                      {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.AVES' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-feedings">
                      {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-deaths">
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-isolations">
                      {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-treatments">
                      {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                    </TabsTrigger>
                    <TabsTrigger value="aves-sales">
                      {t.formatMessage({ id: 'SALE.TITLE.PAGE' })}
                    </TabsTrigger>
                  </TabsList>
                )}
              </div>
              <TabsContent value="locations">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabLocations animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-animals">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesAnimals animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="animals">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAnimals animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="feedings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabFeedings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-feedings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesFeedings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="fattenings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabFattenings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="breedings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabBreedings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="gestations">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabGestations animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="farrowings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabFarrowings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="weanings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabWeanings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="milkings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabMilkings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="deaths">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabDeaths animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-deaths">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesDeaths animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="egg-harvestings">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabEggHarvestings animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="incubations">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabIncubations animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="isolations">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabIsolations animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-isolations">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesIsolations animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="treatments">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabTreatments animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-treatments">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesTreatments animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="aves-sales">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAvesSales animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="sales">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabSales animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
              <TabsContent value="analytics">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="dark:border-gray-800"
                >
                  <TabAnalytics animalTypeId={animalTypeId} />
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Index);
