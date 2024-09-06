import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const AvesStatistics = () => {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

  const layingPercentage =
    Number(
      animalStatistics?.sumEggHarvested / animalStatistics?.sumFemaleAnimals,
    ) * 100;

  const hatchingPercentage =
    Number(animalStatistics?.sumHatched / animalStatistics?.sumIncubations) *
    100;

  const deathPercentage =
    Number(animalStatistics?.sumDeath / animalStatistics?.sumAnimalsQuantity) *
    100;

  const feedConversionPercentage = Number(
    animalStatistics?.sumFeedings / animalStatistics?.averageWeight,
  );

  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
  ];
  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: 'hsl(var(--chart-1))',
    },
    mobile: {
      label: 'Mobile',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

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
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'LAYING.PERCENTAGE' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {Math.floor(layingPercentage * 100) / 100}%
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
                {t.formatMessage({ id: 'HATCHING.PERCENTAGE' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {Math.floor(hatchingPercentage * 100 || 0) / 100}%
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'DEATH.PERCENTAGE' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {Math.floor(deathPercentage * 100) / 100 || 0}%
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
          <Card className="dark:border-input dark:bg-background sm:col-span-2">
            <CardHeader>
              <CardTitle>Area Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="lg:h-[200px] lg:w-[500px]"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="dark:border-input dark:bg-background sm:col-span-2">
            <CardHeader>
              <CardTitle>Area Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                className="lg:h-[200px] lg:w-[500px]"
              >
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
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
                {Math.floor(animalStatistics?.averageWeight * 100) / 100} Kg
              </CardTitle>
            </CardHeader>
          </Card>
          <Card
            x-chunk="dashboard-05-chunk-2"
            className=" dark:border-gray-800"
          >
            <CardHeader className="pb-2">
              <CardDescription>
                {t.formatMessage({ id: 'ANIMAL.SUM.SOLD' })}
              </CardDescription>
              <CardTitle className="text-4xl">
                {animalStatistics?.sumSaleChickens}
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
                {Math.floor(feedConversionPercentage * 100) / 100}
              </CardTitle>
            </CardHeader>
          </Card>
        </>
      )}
    </>
  );
};
export { AvesStatistics };
