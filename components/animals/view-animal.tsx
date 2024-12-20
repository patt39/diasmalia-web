import { GetOneAnimalAPI } from '@/api-site/animals';
import { GetOneMaleBreedingAPI } from '@/api-site/breedings';
import { GetOneDeathAnimalAPI } from '@/api-site/deaths';
import { GetOneFarrowingByAnimalIdAPI } from '@/api-site/farrowings';
import { GetOneFatteningAPI } from '@/api-site/fattenings';
import { GetGestationByAnimalIdAPI } from '@/api-site/gestation';
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
import { Textarea } from '../ui/textarea';

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
  const { data: getOneDeathAnimal } = GetOneDeathAnimalAPI({
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
  const { data: getGestation } = GetGestationByAnimalIdAPI({
    animalId: animal?.id,
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
                {getOneAnimal?.animalType?.name === 'Cuniculture' ? (
                  <div className="relative flex items-center justify-center mx-auto">
                    <svg
                      width="100px"
                      height="100px"
                      viewBox="0 0 72 72"
                      id="emoji"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative mb-4"
                    >
                      <g id="color">
                        <path
                          fill="#FFFFFF"
                          stroke="none"
                          d="M30.921,28.0021c0,0,3.8009-4.523,10.1088,0.4052l-0.6097,11.5103l3.9176,6.0845 c0,0,4.5833,5.503,4.8333,6.2515s1.75,7.9151,1.5833,8.2485c-0.1667,0.3333-4.6667,6.5833-4.6667,6.5833L25.921,66.722 l-3.1667-5.703l0.5833-11.1003l5.5833-5.1667l2.8333-7L30.921,28.0021z"
                        />
                        <path
                          fill="#3F3F3F"
                          stroke="none"
                          d="M39.7544,27.7521c0,0-4.8333,14.8333,4.6667,21.6667c0,0,8.3333,7.6667,0.1667,17l6-1l3.6667-2.6667 l2.5-6.1667l-0.8333-5.3333l-5.1667-7.3333l-0.8333-1c0,0-2.8333-2.8333,0.1667-5.5l6.3333-7.3333l4.5-8l2.6667-7l0.5-8.3333l-4-1 l-5.6667,1l-5.8333,5l-4,6.1667l-2.6667,6.3333L39.7544,27.7521z"
                        />
                        <path
                          fill="#3F3F3F"
                          stroke="none"
                          d="M32.1082,27.7521c0,0,4.8333,14.8333-4.6667,21.6667c0,0-8.3333,7.6667-0.1667,17l-6-1l-3.6667-2.6667 l-2.5-6.1667l0.8333-5.3333l5.1667-7.3333l0.8333-1c0,0,2.8333-2.8333-0.1667-5.5l-6.3333-7.3333l-4.5-8l-2.6667-7l-0.5-8.3333l4-1 l5.6667,1l5.8333,5l4,6.1667l2.6667,6.3333L32.1082,27.7521z"
                        />
                      </g>
                      <g id="hair" />
                      <g id="skin" />
                      <g id="skin-shadow" />
                      <g id="line">
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M60.5693,9.8131c0,0-12.4983-0.3048-16.784,19.8578"
                        />
                        <polyline
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          points="41.0298,50.553 35.8398,53.9543 30.5638,50.553"
                        />
                        <polyline
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          points="31.3767,61.0191 35.7968,58.9868 40.4201,61.0191"
                        />
                        <line
                          x1="35.8398"
                          x2="35.7968"
                          y1="53.9543"
                          y2="58.9868"
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                        />
                        <ellipse
                          cx="45.1214"
                          cy="39.9176"
                          rx="1.6461"
                          ry="2.8119"
                          fill="#000000"
                          stroke="none"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M22.3332,36.7338C5.6688,23.7275,7.9043,6.2824,7.9043,6.2824C23.959,0.7258,31.3767,27.9952,31.3767,27.9952 s4.4135-3.561,9.0435,0c0,0,7.4177-27.2693,23.4724-21.7128c0,0,2.2355,17.4451-14.4289,30.4514"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M11.2275,9.8131c0,0,12.4983-0.3048,16.784,19.8578"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M22.3332,43.745c0,0-10.8725,8.2306-4.7758,17.9853c0,0,2.8451,5.2838,13.2096,4.979h10.2628 c10.3644,0.3048,13.2095-4.979,13.2095-4.979c6.0967-9.7547-4.7758-17.9853-4.7758-17.9853"
                        />
                        <ellipse
                          cx="26.8786"
                          cy="39.9176"
                          rx="1.6461"
                          ry="2.8119"
                          fill="#000000"
                          stroke="none"
                        />
                      </g>
                    </svg>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center mx-auto">
                    <svg
                      width="100px"
                      height="100px"
                      viewBox="0 0 72 72"
                      id="emoji"
                      className="relative mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="color">
                        <path
                          fill="#FFA7C0"
                          stroke="none"
                          d="M26.8377,20.5855c0,0-0.75-5.125-10.375-7.125s-8.625-2.375-8.625-2.375l-1.875,1.875l2.125,9.25 l0.875,6.375l2.625,7l3.75,3.375h5.5l-1.25,8.75l1.25,8.375l2.75,4.25l2,2.25c0,0,13.5,7.25,20.875-1s5.875-15.5,5.875-15.5 l-1.125-7.375l2.875-0.125l4.125-1l3.5-7l1.375-4.875l-0.125-4.25l2.375-6.375l0.125-3.125l-3.125-1l-4.375,1.5l-7.5,2 l-4.875,3.125l-1.125,3.5C44.4627,21.0855,32.9627,19.3355,26.8377,20.5855z"
                        />
                        <polygon
                          fill="#E67A94"
                          stroke="none"
                          points="35.9627,42.2105 27.9627,45.9605 26.4627,51.0855 27.4627,54.8355 29.7127,55.8355 35.7127,53.9605 40.0877,55.3355 44.3377,54.7105 45.2127,50.5855 43.7127,45.5855"
                        />
                        <path
                          fill="#E67A94"
                          stroke="none"
                          d="M64.4627,14.0855l-3.375,2.5l-6.875,1.625l-4.875,4.25l-1,4.375c0,0,0.25,8.75,2.5,10.375s5,1.5,5,1.5 l3.125-1.75l3.25-7.375l1-6.25l2.125-8.25L64.4627,14.0855z"
                        />
                        <path
                          fill="#E67A94"
                          stroke="none"
                          d="M7.296,14.0855l3.375,2.5l6.875,1.625l4.875,4.25l1,4.375c0,0-0.25,8.75-2.5,10.375s-5,1.5-5,1.5 l-3.125-1.75l-3.25-7.375l-1-6.25l-2.125-8.25L7.296,14.0855z"
                        />
                      </g>
                      <g id="line">
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M40.5348,55.6239l-3.9761-1.494c-0.363-0.1364-0.7632-0.1364-1.1261,0l-3.9761,1.494c-2.2002,0.8267-4.5486-0.7996-4.5486-3.1499 v-2.463c0-2.11,1.0916-4.0698,2.8856-5.1806l2.3807-1.4741c2.3414-1.4497,5.3015-1.4497,7.6429,0l2.3807,1.4741 c1.794,1.1108,2.8856,3.0706,2.8856,5.1806v2.463C45.0833,54.8244,42.735,56.4507,40.5348,55.6239z"
                        />
                        <ellipse
                          cx="32.1846"
                          cy="49.7087"
                          rx="2.6115"
                          ry="1.6068"
                          transform="matrix(0.3327 -0.943 0.943 0.3327 -25.3997 63.5235)"
                          fill="#000000"
                          stroke="none"
                        />
                        <ellipse
                          cx="39.8065"
                          cy="49.7087"
                          rx="1.6068"
                          ry="2.6115"
                          transform="matrix(0.943 -0.3327 0.3327 0.943 -14.2694 16.0738)"
                          fill="#000000"
                          stroke="none"
                        />
                        <circle
                          cx="26.0833"
                          cy="36.0855"
                          r="2"
                          fill="#000000"
                          stroke="none"
                        />
                        <circle
                          cx="46.0417"
                          cy="36.0855"
                          r="2"
                          fill="#000000"
                          stroke="none"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M25.8333,61.4188c-10.0833-6.5-5.1667-23.1667-5.1667-23.1667c-7.7762,2.9161-9.0215-3.7404-10.9204-8.2062 c-0.7452-1.7525-1.0738-3.6364-1.1634-5.5386C8.4229,21.11,6.9701,16.4312,6.089,13.868c-0.47-1.3674,0.6215-2.7649,2.0621-2.6417 c1.1647,0.0996,2.4527,0.5098,3.5792,0.9664c1.8985,0.7695,3.8733,1.3555,5.9082,1.591c8.4189,0.9743,9.2693,7.3018,9.2693,7.3018 s10.5705-1.75,17.7588,0.25c0,0,0.8287-6.9109,9.2476-7.8852c2.0349-0.2355,4.0098-0.8215,5.9082-1.591 c1.1266-0.4566,2.4145-0.8668,3.5792-0.9664c1.4406-0.1231,2.5321,1.2744,2.0621,2.6417 c-0.8811,2.5633-2.3339,7.242-2.4939,10.6394c-0.0896,1.9022-0.4182,3.7862-1.1634,5.5386 c-1.8989,4.4657-3.1442,11.1222-10.9204,8.2062c0,0,4.9167,16.6667-5.1667,23.1667"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M30.8333,59.3355c0,0,4.6667,4,10.6667,0"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M23.0625,26.023c0,0-1.375-6.4375-7.1875-8c-5.8125-1.5625-5.5-2.1875-5.5-2.1875"
                        />
                        <path
                          fill="none"
                          stroke="#000000"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width="2"
                          d="M47.8268,26.023c0,0,1.375-6.4375,7.1875-8s5.5-2.1875,5.5-2.1875"
                        />
                      </g>
                    </svg>
                  </div>
                )}

                {getOneAnimal?.gender === 'FEMALE' &&
                ['REPRODUCTION'].includes(getOneAnimal?.productionPhase) ? (
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
                          {getOneAnimal?.prolificity?.toFixed(1) || 0}
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
                  <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
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
                          {t.formatMessage({ id: 'VIEW.FEEDINGS' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {formatWeight(getOneAnimal?.feedingsCount ?? 0)}
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
                          {t.formatMessage({ id: 'FEMALE.FARROWING' })}
                        </CardDescription>
                        <CardTitle className="text-4xl">
                          {getOneFarrowing?.litter || 0}
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
                  <Input
                    disabled
                    type="text"
                    value={
                      getOneAnimal?.gender === 'FEMALE'
                        ? t.formatMessage({ id: 'ANIMAL.GENDER' })
                        : getOneAnimal?.gender
                    }
                  />
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
                  {getOneAnimal?.status === 'ACTIVE' ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'VIEW.BIRTHDATE' })}</Label>
                      <Input
                        disabled
                        value={
                          formatDateDDMMYY(getOneAnimal?.birthday) || 'N/A'
                        }
                      />
                    </div>
                  ) : getOneAnimal?.status === 'DEAD' ? (
                    <div>
                      <Label>{t.formatMessage({ id: 'VIEW.DEATH' })}</Label>
                      <Input
                        disabled
                        value={
                          formatDateDDMMYY(getOneDeathAnimal?.createdAt) ||
                          'N/A'
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <Label>{t.formatMessage({ id: 'VIEW.SOLD' })}</Label>
                      <Input
                        disabled
                        value={
                          formatDateDDMMYY(getOneSaleAnimalType?.createdAt) ||
                          'N/A'
                        }
                      />
                    </div>
                  )}
                </div>
                <div className="mb-2 items-center grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.LOCATION' })}</Label>
                    <Input
                      disabled
                      value={
                        getOneAnimal?.location?.code?.toUpperCase() || 'N/A'
                      }
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                    <Input
                      disabled
                      value={getOneAnimal?.codeMother?.toUpperCase() || 'N/A'}
                    />
                  </div>
                  <div>
                    <Label>{t.formatMessage({ id: 'VIEW.FATHER' })}</Label>
                    <Input
                      disabled
                      value={getOneAnimal?.codeFather?.toUpperCase() || 'N/A'}
                    />
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
                      ) : ['REPRODUCTION', 'LACTATION'].includes(
                          getOneAnimal?.productionPhase,
                        ) && getOneAnimal?.gender === 'FEMALE' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'FARROWING.DATE' })}
                          </Label>
                          <Input
                            disabled
                            value={formatDateDDMMYY(
                              getOneFarrowing?.createdAt ?? 'N/A',
                            )}
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
                              formatDateDDMMYY(getGestation?.farrowingDate) ||
                              'N/A'
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
                      ) : getOneAnimal?.productionPhase === 'GROWTH' ? (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'DATE.WEANED' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={formatDateDDMMYY(
                              getOneAnimal?.createdAt,
                            )}
                          />
                        </div>
                      ) : (
                        <div>
                          <Label>
                            {t.formatMessage({ id: 'DATE.WEANED' })}
                          </Label>
                          <Input
                            disabled
                            defaultValue={t.formatMessage({
                              id: 'NOT.YET',
                            })}
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
                              formatDateDDMMYY(getAnimalTreatment?.createdAt) ??
                              'RAS'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : getOneAnimal?.status === 'DEAD' ? (
                  <div className="mb-4">
                    <Label>Cause</Label>
                    <Textarea defaultValue={getOneDeathAnimal?.note} disabled />
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAnimal };
