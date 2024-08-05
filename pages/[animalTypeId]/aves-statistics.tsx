import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { GetIncubationsAPI } from '@/api-site/incubations';
import { GetSalesAPI } from '@/api-site/sales';
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

  const { data: dataIncubations } = GetIncubationsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    animalTypeId: animalTypeId,
  });

  const { data: dataSales } = GetSalesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    detail: 'EGGS',
    animalTypeId: animalTypeId,
  });

  const initialValue = 0;
  const sumIncubations = dataIncubations?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue.quantityStart,
    initialValue,
  );

  const sumHatched = dataIncubations?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) =>
      accumulator + currentValue.quantityEnd,
    initialValue,
  );

  const sumHSaleEggs = dataSales?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.number,
    initialValue,
  );

  const sumHSaleChicks = dataSales?.pages[0]?.data?.value.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.number,
    initialValue,
  );

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Nombre total oeufs vendus </CardDescription>
          <CardTitle className="text-4xl">{sumHSaleEggs}</CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Nombre total oeufs incubés </CardDescription>
          <CardTitle className="text-4xl">{sumIncubations}</CardTitle>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
        <CardHeader className="pb-2">
          <CardDescription>Nombre total oeufs éclos </CardDescription>
          <CardTitle className="text-4xl">{sumHatched}</CardTitle>
        </CardHeader>
      </Card>
      {animalType.name === 'Canards' ? (
        <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Canettons un jour vendus </CardDescription>
            <CardTitle className="text-4xl">{sumHSaleChicks}</CardTitle>
          </CardHeader>
        </Card>
      ) : animalType.name === 'Poulets Goliaths' ? (
        <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Goliathaux un jour vendus </CardDescription>
            <CardTitle className="text-4xl">{sumHSaleChicks}</CardTitle>
          </CardHeader>
        </Card>
      ) : animalType.name === 'Dinde' ? (
        <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Dindoneaux un jour vendus </CardDescription>
            <CardTitle className="text-4xl">{sumHSaleChicks}</CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <Card x-chunk="dashboard-05-chunk-2" className=" dark:border-gray-800">
          <CardHeader className="pb-2">
            <CardDescription>Poussins un jour vendus </CardDescription>
            <CardTitle className="text-4xl">{sumHSaleChicks}</CardTitle>
          </CardHeader>
        </Card>
      )}
    </>
  );
};
export { AvesStatistics };
