import { GetArchiveStatisticsAPI } from '@/api-site/animals';
import { GetOneUserMeAPI } from '@/api-site/user';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDateDDMMYY } from '@/utils';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
const ViewArchiveStatistics = ({
  showModal,
  setShowModal,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const t = useIntl();
  const { data: user } = GetOneUserMeAPI();
  const { data: getArchivedStatistics } = GetArchiveStatisticsAPI({
    animalId: animal?.id,
  });

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="my-4">
              <div className="my-2 flex justify-center p-2 space-x-4">
                <div className="items-center">
                  <Label className="ml-12">
                    {t.formatMessage({ id: 'VIEW.LOCATION' })}
                  </Label>
                  <Input
                    disabled
                    type="text"
                    value={getArchivedStatistics?.location?.code || 'N/A'}
                  />
                </div>
                <div className="items-center">
                  <Label className="ml-8">
                    {t.formatMessage({ id: 'LAUNCHING.DATE' })}
                  </Label>
                  <Input
                    disabled
                    value={
                      formatDateDDMMYY(getArchivedStatistics?.birthday) || 'N/A'
                    }
                  />
                </div>
              </div>
              <>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  <>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getArchivedStatistics?.deathsCount ?? 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'ANIMAL.FEED' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getArchivedStatistics?.feedingsCount ?? 0}kg
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({
                          id: 'ANIMAL.TREATMENTS',
                        })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getArchivedStatistics?._count?.treatments}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    x-chunk="dashboard-05-chunk-1"
                    className=" dark:border-gray-800"
                  >
                    <CardHeader className="pb-2">
                      <CardDescription>
                        {t.formatMessage({ id: 'ANIMAL.SOLD' })}
                      </CardDescription>
                      <CardTitle className="text-4xl">
                        {getArchivedStatistics?.chickenSaleCount ?? 0}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card
                    className="sm:col-span-2 dark:border-gray-800"
                    x-chunk="dashboard-05-chunk-0"
                  >
                    <CardHeader className="pb-3">
                      <CardDescription className="max-w-lg text-balance leading-relaxed">
                        {t.formatMessage({ id: 'AMOUNT.SOLD' })}
                      </CardDescription>
                      <CardTitle className="text-4xl text-green-600">
                        {getArchivedStatistics?.chickenSaleAmount?.toLocaleString(
                          'en-US',
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          },
                        ) ?? 0}
                        {user?.profile?.currency?.symbol}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  {!['Poulet de chair', 'Pisciculture'].includes(
                    getArchivedStatistics?.animalType?.name,
                  ) ? (
                    <>
                      <Card
                        x-chunk="dashboard-05-chunk-1"
                        className=" dark:border-gray-800"
                      >
                        <CardHeader className="pb-2">
                          <CardDescription>
                            {t.formatMessage({ id: 'CHICKS.SOLD' })}
                          </CardDescription>
                          <CardTitle className="text-4xl">
                            {getArchivedStatistics?.chickSaleCount ?? 0}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card
                        className="sm:col-span-2 dark:border-gray-800"
                        x-chunk="dashboard-05-chunk-0"
                      >
                        <CardHeader className="pb-3">
                          <CardDescription className="max-w-lg text-balance leading-relaxed">
                            {t.formatMessage({ id: 'AMOUNT.SOLD' })}
                          </CardDescription>
                          <CardTitle className="text-4xl text-green-600">
                            {getArchivedStatistics?.chickSaleAmount?.toLocaleString(
                              'en-US',
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            ) ?? 0}
                            {user?.profile?.currency?.symbol}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card
                        x-chunk="dashboard-05-chunk-1"
                        className=" dark:border-gray-800"
                      >
                        <CardHeader className="pb-2">
                          <CardDescription>
                            {t.formatMessage({ id: 'ANIMAL.EGGSOLD' })}
                          </CardDescription>
                          <CardTitle className="text-4xl">
                            {getArchivedStatistics?.eggSaleCount ?? 0}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card
                        className="sm:col-span-2 dark:border-gray-800"
                        x-chunk="dashboard-05-chunk-0"
                      >
                        <CardHeader className="pb-3">
                          <CardDescription className="max-w-lg text-balance leading-relaxed">
                            {t.formatMessage({ id: 'AMOUNT.SOLD' })}
                          </CardDescription>
                          <CardTitle className="text-4xl text-green-600">
                            {getArchivedStatistics?.eggSaleAmount?.toLocaleString(
                              'en-US',
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              },
                            ) ?? 0}
                            {user?.profile?.currency?.symbol}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewArchiveStatistics };
