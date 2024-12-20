import { GetOneAnimalAPI } from '@/api-site/animals';
import { XIcon } from 'lucide-react';
import { useInputState } from '../hooks';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const ViewAvesAnimal = ({
  showModal,
  setShowModal,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const { t, userStorage } = useInputState();
  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animal?.id,
  });

  const feedConversionIndex = Number(
    getOneAnimal?.feedingsCount / getOneAnimal?.weight,
  );

  const layingPercentageLayers =
    Number(getOneAnimal?.totalEggsHarvested / getOneAnimal?.quantity) * 100;

  const layingPercentage =
    Number(getOneAnimal?.totalEggsHarvested / getOneAnimal?.female) * 100;

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
              <>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 mt-8">
                  {[
                    'Poulet de chair',
                    'Pisciculture',
                    'Poulets Goliaths',
                    'Pondeuses',
                    'Poulets Brahma',
                    'Dinde',
                    'Pintarde',
                  ].includes(getOneAnimal?.animalType?.name) &&
                  getOneAnimal?.productionPhase === 'GROWTH' ? (
                    <>
                      {getOneAnimal?.animalType?.name !== 'Pondeuses' ? (
                        <>
                          {!['Poulet de chair', 'Pisciculture'].includes(
                            getOneAnimal?.animalType?.name,
                          ) ? (
                            <>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.MALES' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.male || 0}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.female || 0}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.isolatedCount}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                            </>
                          ) : null}
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.deathsCount}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </>
                      ) : (
                        <Card
                          x-chunk="dashboard-05-chunk-1"
                          className=" dark:border-gray-800"
                        >
                          <CardHeader className="pb-2">
                            <CardDescription>
                              {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                            </CardDescription>
                            <CardTitle className="text-4xl">
                              {getOneAnimal?.deathsCount}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      )}
                      <Card
                        x-chunk="dashboard-05-chunk-1"
                        className=" dark:border-gray-800"
                      >
                        <CardHeader className="pb-2">
                          <CardDescription>
                            {t.formatMessage({ id: 'ANIMAL.FEED' })}
                          </CardDescription>
                          <CardTitle className="text-4xl">
                            {getOneAnimal?.feedingsCount ?? 0}kg
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      <Card
                        x-chunk="dashboard-05-chunk-1"
                        className=" dark:border-gray-800"
                      >
                        <CardHeader className="pb-2">
                          <CardDescription>
                            {t.formatMessage({ id: 'FEED.INDEX' })}
                          </CardDescription>
                          <CardTitle className="text-4xl">
                            {feedConversionIndex < 2 ? (
                              <div className="text-4xl my-2 font-bold text-green-600">
                                {feedConversionIndex.toFixed(1)}
                              </div>
                            ) : (
                              <div className="text-2xl my-2 font-bold text-red-600">
                                {feedConversionIndex.toFixed(1)}
                              </div>
                            )}
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
                            {getOneAnimal?.chickenSaleCount}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                      {getOneAnimal?.quantity === 0 ||
                      getOneAnimal?.status === 'ARCHIVED' ? (
                        <Card
                          className="sm:col-span-2 dark:border-gray-800"
                          x-chunk="dashboard-05-chunk-0"
                        >
                          <CardHeader className="pb-3">
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                              {t.formatMessage({ id: 'AMOUNT.SOLD' })}
                            </CardDescription>
                            <CardTitle className="text-4xl text-green-600">
                              {getOneAnimal?.chickenSaleAmount.toLocaleString(
                                'en-US',
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                              {userStorage?.profile?.currency?.symbol}
                            </CardTitle>
                          </CardHeader>
                        </Card>
                      ) : (
                        <>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.TREATMENTS' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?._count?.treatments ?? 0}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.isolatedCount}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {getOneAnimal?.productionPhase === 'LAYING' &&
                      getOneAnimal?.quantity !== 0 ? (
                        <>
                          {getOneAnimal?.animalType?.name !== 'Pondeuses' ? (
                            <>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.MALES' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.male || 0}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.female || 0}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.isolatedCount}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                            </>
                          ) : null}
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.deathsCount}
                              </CardTitle>
                            </CardHeader>
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
                                {t.formatMessage({ id: 'ANIMAL.FEED' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.feedingsCount ?? 0}kg
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.TREATMENTS' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?._count?.treatments ?? 0}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.DEATH' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.deathsCount}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </>
                      )}
                      {getOneAnimal?.quantity !== 0 &&
                      getOneAnimal?.productionPhase === 'LAYING' ? (
                        <>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.FEED' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.feedingsCount ?? 0}kg
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          {getOneAnimal?.animalType?.name === 'Pondeuses' &&
                          getOneAnimal?.productionPhase === 'LAYING' ? (
                            <Card
                              x-chunk="dashboard-05-chunk-1"
                              className=" dark:border-gray-800"
                            >
                              <CardHeader className="pb-2">
                                <CardDescription>
                                  {t.formatMessage({ id: 'LAYING.PERCENTAGE' })}
                                </CardDescription>
                                <CardTitle className="text-4xl">
                                  {layingPercentageLayers > 80 ? (
                                    <div className="text-4xl my-2 font-bold text-green-600">
                                      {layingPercentageLayers.toFixed(1)}%
                                    </div>
                                  ) : (
                                    <div className="text-4xl my-2 font-bold text-red-600">
                                      {layingPercentageLayers.toFixed(1)}%
                                    </div>
                                  )}
                                </CardTitle>
                              </CardHeader>
                            </Card>
                          ) : (
                            <Card
                              x-chunk="dashboard-05-chunk-1"
                              className=" dark:border-gray-800"
                            >
                              <CardHeader className="pb-2">
                                <CardDescription>
                                  {t.formatMessage({ id: 'LAYING.PERCENTAGE' })}
                                </CardDescription>
                                <CardTitle className="text-4xl">
                                  {layingPercentage > 80 ? (
                                    <div className="text-4xl my-2 font-bold text-green-600">
                                      {layingPercentage.toFixed(1)}%
                                    </div>
                                  ) : (
                                    <div className="text-4xl my-2 font-bold text-red-600">
                                      {layingPercentage.toFixed(1)}%
                                    </div>
                                  )}
                                </CardTitle>
                              </CardHeader>
                            </Card>
                          )}
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.EGGHAVESTED' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.totalEggsHarvested ?? 0}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          {getOneAnimal?.animalType?.name !== 'Pondeuses' ? (
                            <>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({
                                      id: 'ANIMAL.EGGINCUBATED',
                                    })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.incubationCount}
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
                                      id: 'ANIMAL.EGGHATCHED',
                                    })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.eggHatchedCount}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'CHICKS.SOLD' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.chickSaleCount}
                                  </CardTitle>
                                </CardHeader>
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
                                    {t.formatMessage({
                                      id: 'ANIMAL.TREATMENTS',
                                    })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?._count?.treatments ?? 0}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'ANIMAL.ISOLATED' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {getOneAnimal?.isolatedCount}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                              <Card
                                x-chunk="dashboard-05-chunk-1"
                                className=" dark:border-gray-800"
                              >
                                <CardHeader className="pb-2">
                                  <CardDescription>
                                    {t.formatMessage({ id: 'FEED.INDEX' })}
                                  </CardDescription>
                                  <CardTitle className="text-4xl">
                                    {feedConversionIndex < 2 ? (
                                      <div className="text-4xl my-2 font-bold text-green-600">
                                        {feedConversionIndex.toFixed(1)}
                                      </div>
                                    ) : (
                                      <div className="text-2xl my-2 font-bold text-red-600">
                                        {feedConversionIndex.toFixed(1)}
                                      </div>
                                    )}
                                  </CardTitle>
                                </CardHeader>
                              </Card>
                            </>
                          )}
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'ANIMAL.EGGSOLD' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.eggSaleCount}
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
                                {getOneAnimal?.chickenSaleCount}
                              </CardTitle>
                            </CardHeader>
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
                                {t.formatMessage({ id: 'ANIMAL.SOLD' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.chickenSaleCount}
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
                                {getOneAnimal?.chickenSaleAmount.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                                {userStorage?.profile?.currency?.symbol}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                          <Card
                            x-chunk="dashboard-05-chunk-1"
                            className=" dark:border-gray-800"
                          >
                            <CardHeader className="pb-2">
                              <CardDescription>
                                {t.formatMessage({ id: 'CHICKS.SOLD' })}
                              </CardDescription>
                              <CardTitle className="text-4xl">
                                {getOneAnimal?.chickSaleCount}
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
                                {getOneAnimal?.chickSaleAmount?.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                                {userStorage?.profile?.currency?.symbol}
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
                                {getOneAnimal?.eggSaleCount}
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
                                {getOneAnimal?.eggSaleAmount?.toLocaleString(
                                  'en-US',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  },
                                )}
                                {userStorage?.profile?.currency?.symbol}
                              </CardTitle>
                            </CardHeader>
                          </Card>
                        </>
                      )}
                    </>
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

export { ViewAvesAnimal };
