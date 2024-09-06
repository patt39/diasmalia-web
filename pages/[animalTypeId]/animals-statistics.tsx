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
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

const AnimalStatistics = () => {
  const t = useIntl();
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  const { data: animalStatistics } = GetAnimalStatisticsAPI({
    animalTypeId: animalTypeId,
  });

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

  const chartDataTwo = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  const chartConfigTwo = {
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
            {animalStatistics?.sumFemales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>
            {t.formatMessage({ id: 'ANIMALTYPE.MALE' })}
          </CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Taux de Reproduction</CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Taux de Mortalité des Jeunes</CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Taux de Morbidité</CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Taux de Décès</CardDescription>
          <CardTitle className="text-4xl">
            {animalStatistics?.sumMales}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-0 w-96 dark:border-gray-800">
        <CardHeader className="items-center">
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfigTwo}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadarChart data={chartDataTwo}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
              />
              <Radar dataKey="mobile" fill="var(--color-mobile)" />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="py-0 w-96 ml-24 dark:border-gray-800">
        <CardHeader className="items-center">
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px] w-80"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="py-0 w-96 ml-48 dark:border-gray-800">
        <CardHeader className="items-center">
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="py-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px] w-80"
          >
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
};
export { AnimalStatistics };
