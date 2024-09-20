import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetOneSaleAnimalTypeAPI } from '@/api-site/sales';
import { formatDateDDMMYY } from '@/utils';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ViewAnimal = ({
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
    animalId: animal?.id,
  });

  const feedConversionIndex =
    getOneAnimal?.feedingsCount / getOneAnimal?.weight;

  const { data: getOneSaleAnimalType } = GetOneSaleAnimalTypeAPI({
    animalTypeId: animal?.animalTypeId,
  });

  return (
    <>
      {showModal ? (
        <div className="max-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
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
            <form className="mt-8">
              <>
                {getOneAnimal?.gender === 'FEMALE' ? (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.FARROWINGS' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.farrowinglitterCount}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.WEANINGS' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.weaninglitterCount}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.feedingsCount}kg
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.BREEDING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.breedingCount || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.FEEDINGS' })} (kg)
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.feedingsCount || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </>
              <div className="mt-4 flex-auto justify-center p-2">
                <div className="mb-2 flex items-center space-x-4">
                  <Input disabled type="text" value={getOneAnimal?.code} />
                  <Input disabled type="text" value={getOneAnimal?.gender} />
                  {getOneAnimal?.productionPhase === 'GROWTH' ? (
                    <Input
                      disabled
                      type="text"
                      value={t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                    />
                  ) : getOneAnimal?.productionPhase === 'FATTENING' ? (
                    <Input
                      disabled
                      type="text"
                      value={t.formatMessage({
                        id: 'PRODUCTIONTYPE.FATTENING',
                      })}
                    />
                  ) : getOneAnimal?.productionPhase === 'GESTATION' ? (
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.productionPhase}
                    />
                  ) : getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.productionPhase}
                    />
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.productionPhase}
                    />
                  )}

                  {getOneAnimal?.status === 'ACTIVE' ? (
                    <Input
                      disabled
                      type="text"
                      value={t.formatMessage({ id: 'STATUS.ACTIVE' })}
                    />
                  ) : getOneAnimal?.status === 'SOLD' ? (
                    <Input
                      disabled
                      type="text"
                      value={t.formatMessage({ id: 'STATUS.SOLD' })}
                    />
                  ) : (
                    <Input
                      disabled
                      type="text"
                      value={t.formatMessage({ id: 'STATUS.DEATH' })}
                    />
                  )}
                </div>
                <div className="mb-2 flex items-center space-x-10">
                  <div>
                    <Label> {t.formatMessage({ id: 'VIEW.BREED' })}</Label>
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.breed?.name}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                    <Input disabled type="text" value={getOneAnimal?.weight} />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.BIRTHDATE' })}</Label>
                    <Input
                      disabled
                      value={formatDateDDMMYY(getOneAnimal?.birthday) || 'N/A'}
                    />
                  </div>
                </div>
                <div className="mb-2 flex items-center space-x-10">
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.LOCATION' })}</Label>
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.location?.code || 'N/A'}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.codeMother || 'N/A'}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                    <Input
                      disabled
                      type="text"
                      value={getOneAnimal?.codeFather || 'N/A'}
                    />
                  </div>
                </div>
                {getOneAnimal?.status === 'ACTIVE' ? (
                  <div>
                    <div className="mb-2 flex items-center space-x-10">
                      <div>
                        <Label>
                          {t.formatMessage({ id: 'VIEW.ISOLATED' })}?
                        </Label>
                        <Input
                          disabled
                          type="text"
                          value={
                            getOneAnimal?.isIsolated === 'YES'
                              ? t.formatMessage({ id: 'ISOLATED.YES' })
                              : t.formatMessage({ id: 'ISOLATED.NO' })
                          }
                        />
                      </div>
                      {getOneAnimal?.gender === 'MALE' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'VIEW.CASTRATED' })}?
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              getOneAnimal?.isCastrated === 'YES'
                                ? t.formatMessage({ id: 'ISOLATED.YES' })
                                : t.formatMessage({ id: 'ISOLATED.NO' })
                            }
                          />
                        </div>
                      ) : (
                        ''
                      )}
                      <div>
                        <Label>{t.formatMessage({ id: 'FEED.INDEX' })}</Label>
                        <Input
                          disabled
                          type="text"
                          value={feedConversionIndex.toFixed(1)}
                        />
                      </div>
                    </div>
                  </div>
                ) : getOneAnimal?.status === 'SOLD' ? (
                  <div className="mb-2 flex items-center space-x-10">
                    <div>
                      <Label>Client</Label>
                      <Input
                        disabled
                        type="text"
                        value={getOneSaleAnimalType?.soldTo || 'N/A'}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        disabled
                        type="text"
                        value={getOneSaleAnimalType?.phone || 'N/A'}
                      />
                    </div>
                    <div>
                      <Label>Date de vente</Label>
                      <Input
                        disabled
                        value={
                          formatDateDDMMYY(getOneAnimal?.createdAt) || 'N/A'
                        }
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAnimal };
