import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalByAnimalTypeAPI } from '@/api-site/animals';
import { TabAnalytics } from '@/components/analytics/tab-analytics';
import { TabAnimals } from '@/components/animals/tab-animals';
import { TabAvesAnimals } from '@/components/aves-animals/tab-aves-animals';
import { AvesDeathsAnalytics } from '@/components/aves-deaths/aves-deaths-analytics';
import { TabAvesDeaths } from '@/components/aves-deaths/tab-aves-deaths';
import { FeedingsAnalytics } from '@/components/aves-feeding/feedings-analytics';
import { TabAvesFeedings } from '@/components/aves-feeding/tab-aves-feedings';
import { TabAvesIsolations } from '@/components/aves-isolations/tab-aves-isolations';
import { TabAvesLocations } from '@/components/aves-locations/tab-aves-locations';
import { TabAvesSales } from '@/components/aves-sales/tab-aves-sales';
import { TabAvesTreatments } from '@/components/aves-treatments/tab-aves-treatment';
import { TabBreedings } from '@/components/breedings/tab-breedings';
import { TabBuildings } from '@/components/buildings/tab-buildings';
import { TabDeaths } from '@/components/deaths/tab-deaths';
import { EggHarvestingsAnalytics } from '@/components/egg-harvestings/eggHarvestings-analytics';
import { TabEggHarvestings } from '@/components/egg-harvestings/tab-egg-harvestings';
import { TabFarrowings } from '@/components/farrowings/tab-farrowings';
import { TabFattenings } from '@/components/fattenings/tab-fattenings';
import { TabFeedings } from '@/components/feedings/tab-feedings';
import { TabGestations } from '@/components/gestations/tab-gestations';
import { TabIncubations } from '@/components/incubations/tab-incubations';
import { TabIncubationsAnalytics } from '@/components/incubations/tab-incubations-analytics';
import { TabIsolations } from '@/components/isolations/tab-isolations';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { MilkingsAnalytics } from '@/components/milkings/milkings-analytics';
import { TabMilkings } from '@/components/milkings/tab-milkings';
import { ChickenSalesAnalytics } from '@/components/sales-analytics/chickens-sales-analytics';
import { ChickSalesAnalytics } from '@/components/sales-analytics/chicks-sales-analytics';
import { EggSalesAnalytics } from '@/components/sales-analytics/eggs-sales-analytics';
import { TabSalesAnalytics } from '@/components/sales-analytics/tab-sales-analytics';
import { TabTreatments } from '@/components/treatments/tab-treatment';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PrivateComponent } from '@/components/util/private-component';
import { FarrowingsWeaningsAnalytics } from '@/components/weanings/birth-analytics';
import { TabWeanings } from '@/components/weanings/tab-weanings';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { TabAnimalDeathStatistics } from './animals-deaths-statistics';
import { TabAnimalSoldStatistics } from './animals-sold-statistics';
import { AnimalStatistics } from './animals-statistics';
import { AvesStatistics } from './aves-statistics';

export function Index() {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalByType } = GetAnimalByAnimalTypeAPI({
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
                    {animalType?.slug === 'porcs' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.PIGS' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AnimalStatistics />
              </div>
            ) : ['Cuniculture'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'lapins' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.RABBITS' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AnimalStatistics />
              </div>
            ) : ['Bovins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'boeufs' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.COW' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AnimalStatistics />
              </div>
            ) : ['Caprins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'chèvres' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.GOAT' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AnimalStatistics />
              </div>
            ) : ['Ovins'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'moutons' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.SHEEP' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AnimalStatistics />
              </div>
            ) : ['Pondeuses'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'pondeuses' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.LAYERS' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : ['Canard'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'canards' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.DUCKS' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
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
                    {animalType?.slug === 'dindons' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.TURKEY' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({ id: 'ANIMALTYPE.LAYERS.DESCRIPTION' })}
                    </CardDescription>
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
                <AvesStatistics />
              </div>
            ) : ['Pintarde'].includes(animalType?.name) ? (
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
                <AvesStatistics />
              </div>
            ) : ['Quails'].includes(animalType?.name) ? (
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
                <AvesStatistics />
              </div>
            ) : ['Poulet de chair'].includes(animalType?.name) ? (
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                  className="sm:col-span-2 dark:border-gray-800"
                  x-chunk="dashboard-05-chunk-0"
                >
                  <CardHeader className="pb-3">
                    {animalType?.slug === 'poulets de chair' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.BROILERS' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.BROILERS.DESCRIPTION',
                      })}
                    </CardDescription>
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
                    {animalType?.slug === 'poissons' ? (
                      <CardTitle>
                        {t.formatMessage({ id: 'DIASMALIA.WELCOME.FISH' })}
                      </CardTitle>
                    ) : null}
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      {t.formatMessage({
                        id: 'ANIMALTYPE.FISH.DESCRIPTION',
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
                <AvesStatistics />
              </div>
            ) : null}
            {animalType?.tab ? (
              <Tabs defaultValue={animalType?.tab}>
                <div className="flex items-center justify-center ">
                  {[
                    'Porciculture',
                    'Bovins',
                    'Cuniculture',
                    'Caprins',
                    'Ovins',
                  ].includes(animalType?.name) ? (
                    <TabsList>
                      <TabsTrigger value="locations">
                        {t.formatMessage({ id: 'BUILDING' })}
                      </TabsTrigger>
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
                      ) : null}
                      <TabsTrigger value="breedings">
                        {t.formatMessage({ id: 'ANIMALTYPE.BREEDING' })}
                      </TabsTrigger>
                      <TabsTrigger value="gestations">
                        {t.formatMessage({ id: 'ANIMALTYPE.GESTATIONS' })}
                      </TabsTrigger>
                      <TabsTrigger value="farrowings">
                        {t.formatMessage({ id: 'ANIMALTYPE.FARROWING' })}
                      </TabsTrigger>
                      <TabsTrigger value="weanings">
                        {t.formatMessage({ id: 'ANIMALTYPE.WEANINGS' })}
                      </TabsTrigger>
                      {['Bovins', 'Caprins'].includes(animalType?.name) ? (
                        <TabsTrigger value="milkings">
                          {t.formatMessage({ id: 'ANIMALTYPE.MILKINGS' })}
                        </TabsTrigger>
                      ) : null}
                      <TabsTrigger value="deaths">
                        {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                      </TabsTrigger>
                      <TabsTrigger value="isolations">
                        {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                      </TabsTrigger>
                      <TabsTrigger value="treatments">
                        {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                      </TabsTrigger>
                      <TabsTrigger value="analytics">Statistiques</TabsTrigger>
                    </TabsList>
                  ) : [
                      'Pondeuses',
                      'Dinde',
                      'Canard',
                      'Pintarde',
                      'Poulets Brahma',
                      'Poulets Goliaths',
                    ].includes(animalType?.name) ? (
                    <TabsList>
                      <TabsTrigger value="aves-locations">
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
                      {animalType?.name === 'Pondeuses' ? null : (
                        <TabsTrigger value="incubations">
                          {t.formatMessage({ id: 'ANIMALTYPE.INCUBATION' })}
                        </TabsTrigger>
                      )}
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
                      <TabsTrigger value="sales-analytics">
                        {t.formatMessage({ id: 'SALES.ANALYTICS' })}
                      </TabsTrigger>
                    </TabsList>
                  ) : (
                    <TabsList>
                      {['Poulet de chair'].includes(animalType?.name) ? (
                        <TabsTrigger value="aves-locations">
                          {t.formatMessage({
                            id: 'ANIMALTYPE.LOCATIONS.AVES',
                          })}
                        </TabsTrigger>
                      ) : (
                        <TabsTrigger value="aves-locations">
                          {t.formatMessage({ id: 'ANIMALTYPE.LOCATIONS' })}
                        </TabsTrigger>
                      )}
                      <TabsTrigger value="aves-animals">
                        {t.formatMessage({ id: 'ANIMALTYPE.ANIMALS.AVES' })}
                      </TabsTrigger>
                      <TabsTrigger value="aves-feedings">
                        {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                      </TabsTrigger>
                      {animalByType?.productionPhase === 'LAYING' ? (
                        <>
                          <TabsTrigger value="egg-harvestings">
                            {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
                          </TabsTrigger>
                          <TabsTrigger value="incubations">
                            {t.formatMessage({ id: 'ANIMALTYPE.INCUBATION' })}
                          </TabsTrigger>
                        </>
                      ) : null}
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
                      {animalByType?._count?.sales !== 0 &&
                      animalByType?.productionPhase === 'LAYING' ? (
                        <TabsTrigger value="sales-analytics">
                          {t.formatMessage({ id: 'SALES.ANALYTICS' })}
                        </TabsTrigger>
                      ) : null}
                    </TabsList>
                  )}
                </div>
                <TabsContent value="locations">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabBuildings animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                <TabsContent value="aves-locations">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabAvesLocations animalTypeId={animalTypeId} />
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
                {animalType?._count?.feedings !== 0 ? (
                  <TabsContent value="feedings">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <FeedingsAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
                <TabsContent value="aves-feedings">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabAvesFeedings animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                {animalType?._count?.feedings !== 0 ? (
                  <TabsContent value="aves-feedings">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <FeedingsAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
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
                <TabsContent value="weanings">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <FarrowingsWeaningsAnalytics animalTypeId={animalTypeId} />
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
                <TabsContent value="milkings">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <MilkingsAnalytics animalTypeId={animalTypeId} />
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
                {animalType?._count?.deaths !== 0 ? (
                  <TabsContent value="aves-deaths">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <AvesDeathsAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
                <TabsContent value="egg-harvestings">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabEggHarvestings animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                {animalType?._count?.eggHavestings !== 0 ? (
                  <TabsContent value="egg-harvestings">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <EggHarvestingsAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
                <TabsContent value="incubations">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabIncubations animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                {animalType?._count?.incubations !== 0 ? (
                  <TabsContent value="incubations">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <TabIncubationsAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
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
                <TabsContent value="analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabAnalytics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabAnimalSoldStatistics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                <TabsContent value="analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabAnimalDeathStatistics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                <TabsContent value="sales-analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <TabSalesAnalytics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                <TabsContent value="sales-analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <ChickenSalesAnalytics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
                {animalType?.name !== 'Pondeuses' ? (
                  <TabsContent value="sales-analytics">
                    <Card
                      x-chunk="dashboard-06-chunk-0"
                      className="dark:border-gray-800"
                    >
                      <ChickSalesAnalytics animalTypeId={animalTypeId} />
                    </Card>
                  </TabsContent>
                ) : null}
                <TabsContent value="sales-analytics">
                  <Card
                    x-chunk="dashboard-06-chunk-0"
                    className="dark:border-gray-800"
                  >
                    <EggSalesAnalytics animalTypeId={animalTypeId} />
                  </Card>
                </TabsContent>
              </Tabs>
            ) : null}
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Index);
