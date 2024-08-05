/* eslint-disable @next/next/no-img-element */
import { GetAnimalsAPI } from '@/api-site/animals';
import { GetFarrowingsAPI } from '@/api-site/farrowings';
import { GetWeaningsAPI } from '@/api-site/weanings';
import { useInputState } from '@/components/hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const TabAnalytics = ({ animalTypeId }: { animalTypeId: string }) => {
  const { t } = useInputState();

  const { data: dataFemaleReproduction } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const { data: dataFemaleReproductionSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'SOLD',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const { data: dataMaleReproduction } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'MALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const { data: dataMaleReproductionSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'MALE',
    status: 'SOLD',
    sortBy: 'createdAt',
    productionPhase: 'REPRODUCTION',
    animalTypeId: animalTypeId,
  });

  const { data: dataFemaleGrowth } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

  const { data: dataMaleGrowth } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'MALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

  const { data: dataFemaleGestation } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'GESTATION',
    animalTypeId: animalTypeId,
  });

  const { data: dataFemaleGestationSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'SOLD',
    sortBy: 'createdAt',
    productionPhase: 'GESTATION',
    animalTypeId: animalTypeId,
  });

  const { data: dataFemaleLactation } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    gender: 'FEMALE',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'LACTATION',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalFattening } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'FATTENING',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalFatteningSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'SOLD',
    sortBy: 'createdAt',
    productionPhase: 'FATTENING',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalFatteningDead } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'DEAD',
    sortBy: 'createdAt',
    productionPhase: 'FATTENING',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalGrowthSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'SOLD',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalGrowthDead } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'DEAD',
    sortBy: 'createdAt',
    productionPhase: 'GROWTH',
    animalTypeId: animalTypeId,
  });

  const { data: dataAnimalSold } = GetAnimalsAPI({
    take: 10,
    sort: 'asc',
    status: 'SOLD',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const { data: dataFarrowings } = GetFarrowingsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const { data: dataWeanings } = GetWeaningsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const initialValue = 0;
  const sumFarrowings = dataFarrowings?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.litter,
    initialValue,
  );

  const sumWeanings = dataWeanings?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.litter,
    initialValue,
  );

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets femèles </CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleGrowth?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets male</CardDescription>
              <CardTitle className="text-4xl">
                {dataMaleGrowth?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Animaux en engraissement</CardDescription>
              <CardTitle className="text-4xl">
                {dataAnimalFattening?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Femèles en reproduction</CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleReproduction?.pages[0]?.data?.total}
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
              <CardTitle className="text-4xl">
                {dataMaleReproduction?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Femèles gestantes </CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleGestation?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Femèles allaitantes</CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleLactation?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets nés</CardDescription>
              <CardTitle className="text-4xl">{sumFarrowings}</CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets sevrès</CardDescription>
              <CardTitle className="text-4xl">{sumWeanings}</CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets vendu</CardDescription>
              <CardTitle className="text-4xl">
                {dataAnimalGrowthSold?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Femèles gestantes vendu</CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleGestationSold?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Animaux engraissés vendu</CardDescription>
              <CardTitle className="text-4xl">
                {dataAnimalFatteningSold?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Males reproducteurs vendu</CardDescription>
              <CardTitle className="text-4xl">
                {dataMaleReproductionSold?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Femèles reproducteurs vendu</CardDescription>
              <CardTitle className="text-4xl">
                {dataFemaleReproductionSold?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Porcelets morts</CardDescription>
              <CardTitle className="text-4xl">
                {dataAnimalGrowthDead?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>Animaux engraissés morts</CardDescription>
              <CardTitle className="text-4xl">
                {dataAnimalFatteningDead?.pages[0]?.data?.total}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
};
export { TabAnalytics };
