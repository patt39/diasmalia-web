import { GetOneAnimalAPI } from '@/api-site/animals';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
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
  const t = useIntl();

  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animal.id,
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
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {getOneAnimal.animalType.name === 'Poulet de chair' ? (
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
                          {getOneAnimal?.deathsCount}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'ANIMAL.FEED' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.feedingsCount}kg
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
                          {t.formatMessage({ id: 'ANIMAL.MALES' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal.male || 0}
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
                          {getOneAnimal.female || 0}
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
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'ANIMAL.FEED' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.feedingsCount}kg
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
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'ANIMAL.EGGHAVESTED' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.eggHavestedCount}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'ANIMAL.EGGINCUBATED' })}
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
                          {t.formatMessage({ id: 'ANIMAL.EGGHATCHED' })}
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
                          {t.formatMessage({ id: 'ANIMAL.TREATMENTS' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?._count.treatments}
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
              </div>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAvesAnimal };
