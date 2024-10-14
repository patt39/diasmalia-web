/* eslint-disable @next/next/no-img-element */
import { GetAnimalDeadSoldStatisticsAPI } from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const TabAnimalSoldStatistics = ({
  animalTypeId,
}: {
  animalTypeId: string;
}) => {
  const { t } = useInputState();

  const { data: animalStatistics } = GetAnimalDeadSoldStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <div className="mr-auto mt-0 items-center gap-2">
            <CardTitle className="text-xl">
              {t.formatMessage({ id: 'SOLD.HISTORY' })}
            </CardTitle>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {animalStatistics?.animalSold ?? 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {animalStatistics?.animalSold ?? 0}{' '}
                    {t.formatMessage({ id: 'ANIMAL.SOLD' })}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FEMALE.REPRODUCTION' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumFemaleReproductionSold ?? 0}
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
              <CardTitle className="text-3xl">
                {animalStatistics?.sumMaleReproductionSold ?? 0}
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
              <CardTitle className="text-3xl">
                {animalStatistics?.sumFemaleGestationSold ?? 0}
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
              <CardTitle className="text-3xl">
                {animalStatistics?.sumAnimalFemaleGrowthSold ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.MALE.GROWTH' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumAnimalMaleGrowthSold ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FATTENING' })}
              </CardDescription>
              <CardTitle className="text-3xl">
                {animalStatistics?.sumAnimalFatteningSold ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
};
export { TabAnimalSoldStatistics };
