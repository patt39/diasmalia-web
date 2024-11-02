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

const TabAnimalDeathStatistics = ({
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
      <main className="flex flex-1 flex-col md:gap-8 md:p-8">
        <div className="flex items-center">
          <div className="mr-auto mt-0 items-center gap-2">
            <CardTitle className="text-xl">
              {t.formatMessage({ id: 'DEAD.HISTORY' })}
            </CardTitle>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    {animalStatistics?.animalsDead ?? 0}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  <p>
                    {t.formatMessage({ id: 'ANIMALTYPE.TOOLTIP' })}{' '}
                    {animalStatistics?.animalsDead ?? 0}{' '}
                    {t.formatMessage({ id: 'ANIMAL.DEATH' })}
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
                {t.formatMessage({ id: 'ANIMAL.FEMALE.GROWTH' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumAnimalFemaleGrowthDead ?? 0}
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
                {animalStatistics?.sumAnimalMaleGrowthDead ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-1"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.FATTENING.DEAD' })}
              </CardDescription>
              <CardTitle className="text-2xl">
                {animalStatistics?.sumAnimalFatteningDead ?? 0}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </>
  );
};
export { TabAnimalDeathStatistics };
