import { GetAnimalStatisticsAPI } from '@/api-site/animals';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';

const AnimalStatistics = () => {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

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
      <Card x-chunk="dashboard-05-chunk-1" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.FEMALE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumFemales ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'FERTILITY.RATE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {Math.floor(fertilityRate * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'FECONDITY.RATE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {Math.floor(farrowingPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'WEANING.PERCENTAGE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {Math.floor(weaningPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'YOUTH.DEATH.PERCENTAGE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {Math.floor(youngDeathPercentage * 100) / 100 || 0}%
          </CardTitle>
        </CardHeader>
      </Card>
      {/* <Card className="dark:border-input dark:bg-background sm:col-span-2">
        <CardHeader>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
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
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
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
      </Card> */}
    </>
  );
};
export { AnimalStatistics };
