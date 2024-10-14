import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetOneMaleBreedingAPI } from '@/api-site/breedings';
import { GetOneFarrowingByAnimalIdAPI } from '@/api-site/farrowings';
import { GetOneFatteningAPI } from '@/api-site/fattenings';
import { GetOneSaleAnimalTypeAPI } from '@/api-site/sales';
import { GetOneTreatmentByAnimalIdAPI } from '@/api-site/treatment';
import { GetOneAnimalWeanedAPI } from '@/api-site/weanings';
import { formatDateDDMMYY } from '@/utils';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import { formatWeight } from '../../utils/formate-date';
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
  const { data: getOneFattening } = GetOneFatteningAPI({
    animalId: animal?.id,
  });
  const { data: getOneFarrowing } = GetOneFarrowingByAnimalIdAPI({
    animalId: animal?.id,
  });
  const { data: getOneSaleAnimalType } = GetOneSaleAnimalTypeAPI({
    animalTypeId: animal?.animalTypeId,
  });
  const { data: getAnimalTreatment } = GetOneTreatmentByAnimalIdAPI({
    animalId: animal?.id,
  });
  const { data: getAnimalWeaned } = GetOneAnimalWeanedAPI({
    animalId: animal?.id,
  });
  const { data: getMaleAnimalBreeding } = GetOneMaleBreedingAPI({
    animalMaleId: animal?.id,
  });

  const feedConversionIndex =
    getOneAnimal?.feedingsCount / getOneAnimal?.weight;

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
                {getOneAnimal?.gender === 'FEMALE' &&
                ['REPRODUCTION'].includes(getOneAnimal?.productionPhase) &&
                getOneAnimal?.farrowinglitterCount !== 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'FEMALE.BREEDING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.breedingFemaleCount || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'PROLIFICITE' })}
                        </CardDescription>
                        <CardTitle className="text-4xl flex">
                          {getOneAnimal?.prolificity.toFixed(1) || 0}
                          <CardDescription>
                            <div className="pt-5 text-xs font-normal">
                              /{t.formatMessage({ id: 'LITTER.PER.FARROWING' })}
                            </div>
                          </CardDescription>
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
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ) : getOneAnimal?.gender === 'MALE' &&
                  getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'VIEW.BREEDING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.breedingMaleCount || 0}
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
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          <Label>{t.formatMessage({ id: 'FEED.INDEX' })}</Label>
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {feedConversionIndex.toFixed(1) || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ) : ['FATTENING', 'GROWTH'].includes(
                    getOneAnimal?.productionPhase,
                  ) ? (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          <Label>
                            {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                          </Label>
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          <Label>{t.formatMessage({ id: 'FEED.INDEX' })}</Label>
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {feedConversionIndex.toFixed(1) || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ) : getOneAnimal?.productionPhase === 'GESTATION' ? (
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'FEMALE.BREEDING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.breedingFemaleCount || 0}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader className="pb-2">
                        <CardDescription>
                          {t.formatMessage({ id: 'FEMALE.FARROWING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneAnimal?.farrowingCount || 0}
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
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                ) : (
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
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
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
                      value={t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                    />
                  ) : getOneAnimal?.productionPhase === 'FATTENING' ? (
                    <Input
                      disabled
                      value={t.formatMessage({
                        id: 'PRODUCTIONTYPE.FATTENING',
                      })}
                    />
                  ) : getOneAnimal?.productionPhase === 'GESTATION' ? (
                    <Input disabled value={getOneAnimal?.productionPhase} />
                  ) : getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                    <Input disabled value={getOneAnimal?.productionPhase} />
                  ) : (
                    <Input disabled value={getOneAnimal?.productionPhase} />
                  )}

                  {getOneAnimal?.status === 'ACTIVE' &&
                  getOneAnimal?.gender === 'MALE' ? (
                    <Input
                      disabled
                      value={t.formatMessage({ id: 'STATUS.ACTIVE' })}
                    />
                  ) : getOneAnimal?.status === 'SOLD' ? (
                    <Input
                      disabled
                      value={t.formatMessage({ id: 'STATUS.SOLD' })}
                    />
                  ) : getOneAnimal?.status === 'DEAD' ? (
                    <Input
                      disabled
                      value={t.formatMessage({ id: 'STATUS.DEATH' })}
                    />
                  ) : (
                    <Input disabled type="text" value={getOneAnimal?.status} />
                  )}
                </div>
                <div className="mb-2 items-center grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  <div>
                    <Label> {t.formatMessage({ id: 'VIEW.BREED' })}</Label>
                    <Input disabled value={getOneAnimal?.breed?.name} />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.WEIGHT' })}</Label>
                    <Input
                      disabled
                      value={formatWeight(getOneAnimal?.weight)}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.BIRTHDATE' })}</Label>
                    <Input
                      disabled
                      value={formatDateDDMMYY(getOneAnimal?.birthday) || 'N/A'}
                    />
                  </div>
                </div>
                <div className="mb-2 items-center grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.LOCATION' })}</Label>
                    <Input
                      disabled
                      value={getOneAnimal?.location?.code || 'N/A'}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <Input disabled value={getOneAnimal?.codeMother || 'N/A'} />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                    <Input disabled value={getOneAnimal?.codeFather || 'N/A'} />
                  </div>
                </div>
                {getOneAnimal?.status === 'ACTIVE' ? (
                  <div>
                    <div className="mb-2 items-center grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                      <div>
                        <Label>
                          {t.formatMessage({ id: 'VIEW.ISOLATED' })}?
                        </Label>
                        <Input
                          disabled
                          value={
                            getOneAnimal?.isIsolated === 'YES'
                              ? t.formatMessage({ id: 'ISOLATED.YES' })
                              : t.formatMessage({ id: 'ISOLATED.NO' })
                          }
                        />
                      </div>
                      {getOneAnimal?.gender === 'MALE' &&
                      getOneAnimal?.productionPhase === 'FATTENING' ? (
                        <div>
                          <div>
                            <Label>
                              {t.formatMessage({ id: 'VIEW.CASTRATED' })}?
                            </Label>
                            <Input
                              disabled
                              value={
                                getOneAnimal?.isCastrated === 'YES'
                                  ? t.formatMessage({ id: 'ISOLATED.YES' })
                                  : t.formatMessage({ id: 'ISOLATED.NO' })
                              }
                            />
                          </div>
                        </div>
                      ) : getOneAnimal?.productionPhase === 'FATTENING' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'FATTENING.DATE' })}
                          </Label>
                          <Input
                            disabled
                            value={
                              formatDateDDMMYY(getOneFattening?.createdAt) ||
                              'N/A'
                            }
                          />
                        </div>
                      ) : getOneAnimal?.productionPhase === 'REPRODUCTION' &&
                        getOneAnimal?.farrowinglitterCount !== 0 &&
                        getOneAnimal?.breedingFemaleCount !== 0 &&
                        getOneAnimal?.gender === 'FEMALE' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'FARROWING.DATE' })}
                          </Label>
                          <Input
                            disabled
                            value={
                              formatDateDDMMYY(getOneFarrowing?.createdAt) ||
                              'N/A'
                            }
                          />
                        </div>
                      ) : ['GESTATION'].includes(
                          getOneAnimal?.productionPhase,
                        ) ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'FARROWING.DATE' })}
                          </Label>
                          <Input
                            disabled
                            value={
                              formatDateDDMMYY(
                                getOneFarrowing?.farrowingDate,
                              ) || 'N/A'
                            }
                          />
                        </div>
                      ) : getOneAnimal?.gender === 'MALE' &&
                        getOneAnimal?.productionPhase === 'REPRODUCTION' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'LAST.BREEDING' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={formatDateDDMMYY(
                              getMaleAnimalBreeding?.createdAt,
                            )}
                          />
                        </div>
                      ) : getOneAnimal?.gender === 'FEMALE' &&
                        getOneAnimal?.productionPhase === 'CROISSANCE' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'FARROWING.DATE' })}
                          </Label>
                          <Input disabled defaultValue={'Pas encore'} />
                        </div>
                      ) : (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'LAST.BREEDING' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={formatDateDDMMYY(
                              getMaleAnimalBreeding?.createdAt,
                            )}
                          />
                        </div>
                      )}
                      {getOneAnimal?.gender === 'FEMALE' &&
                      getOneAnimal?.productionPhase === 'REPRODUCTION' &&
                      getOneAnimal?.farrowinglitterCount !== 0 ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'LAST.WEANING' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={
                              getAnimalWeaned?.createdAt
                                ? formatDateDDMMYY(getAnimalWeaned?.createdAt)
                                : 'RAS'
                            }
                          />
                        </div>
                      ) : (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'LAST.TREATMENT.DATE' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={
                              formatDateDDMMYY(getAnimalTreatment?.createdAt) ||
                              'RAS'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : getOneAnimal?.status === 'SOLD' ? (
                  <div className="mb-2 flex items-center space-x-10">
                    <div>
                      <Label>Client</Label>
                      <Input
                        disabled
                        value={getOneSaleAnimalType?.soldTo || 'N/A'}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        disabled
                        value={getOneSaleAnimalType?.phone || 'N/A'}
                      />
                    </div>
                    <div>
                      <Label>{t.formatMessage({ id: 'SOLD.DATE' })}</Label>
                      <Input
                        disabled
                        value={
                          formatDateDDMMYY(getOneSaleAnimalType?.createdAt) ||
                          'N/A'
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
