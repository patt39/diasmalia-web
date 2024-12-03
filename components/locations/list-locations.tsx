/* eslint-disable @next/next/no-img-element */
import { GetOneFarrowingByAnimalIdAPI } from '@/api-site/farrowings';
import {
  ChangeLocationStatusAPI,
  DeleteOneLocationAPI,
} from '@/api-site/locations';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import {
  Anvil,
  ArrowLeftRight,
  BadgeCheck,
  Bone,
  Droplets,
  Eclipse,
  Grid2X2,
  Hospital,
  IdCard,
  MilkOff,
  MoreHorizontal,
  Origami,
  PencilIcon,
  Salad,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateBulkAnimals } from '../animals/create-bulk-animal';
import { OffspringsIdentification } from '../animals/offsprings-identification';
import { CreateOrUpdateDeaths } from '../deaths/create-or-update-deaths';
import { CreateFarrowings } from '../farrowings/create-farrowings';
import { CreateOrUpdateFattenings } from '../fattenings/create-or-update-fattenings';
import { CreateFeedings } from '../feedings/create-feedings';
import { CreateOrUpdateIsolations } from '../isolations/create-or-update-isolations';
import { BulkCreateTreatments } from '../treatments/bulk-create-treatments';
import { CreateTreatments } from '../treatments/create-treatments';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ActionModalConfirmeDialog } from '../ui-setting/shadcn/action-modal-confirme-dialog';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { CreateOrUpdateWeanings } from '../weanings/create-or-update-weaning';
import { AnimalsChangeLocations } from './change-animals-locations';
import { UpdateLocations } from './update-locations';

const ListLocations = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, isConfirmOpen, setIsConfirmOpen } =
    useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDeath, setIsDeath] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isTreatment, setIsTreatment] = useState(false);
  const [isMotherTreatment, setIsMotherTreatment] = useState(false);
  const [isFattening, setIsFattening] = useState(false);
  const [isFarrowing, setIsFarrowing] = useState(false);
  const [isIsolation, setIsIsolation] = useState(false);
  const [isWeaning, setIsWeaning] = useState(false);
  const [isIdentification, setIsIdentification] = useState(false);
  const [isGrowthTreatment, setIsGrowthTreatment] = useState(false);
  const [isChangeLocation, setIsChangeLocation] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneLocationAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ locationId: item.id });
      AlertSuccessNotification({
        text: 'Location deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { isPending: loadingConfirme, mutateAsync: saveMutation } =
    ChangeLocationStatusAPI();

  const changeItem = async (item: any) => {
    setIsConfirmOpen(true);
    try {
      await saveMutation({ locationId: item?.id });
      AlertSuccessNotification({
        text: 'Status changed successfully',
      });
      setIsConfirmOpen(false);
    } catch (error: any) {
      setIsConfirmOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { data: getOneFarrowing } = GetOneFarrowingByAnimalIdAPI({
    animalId: item?.animals?.[0]?.id,
  });

  const animalPerSquareMeter = Number(
    item?.squareMeter / item?._count?.animals,
  );

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-200 rounded-xl hover:bg-gray-400"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="flex space-x-40">
            <div className="justify-items-start mb-2">
              {item?.status ? (
                <Badge variant="secondary">
                  {t.formatMessage({ id: 'TABANIMAL.INSERVICE' })}
                </Badge>
              ) : (
                <Badge variant="destructive">
                  {t.formatMessage({
                    id: 'TABANIMAL.OUTSERVICE',
                  })}
                </Badge>
              )}
            </div>
            <div>
              {item?.productionPhase === 'GROWTH' &&
              item?.animalType?.name === 'Porciculture' &&
              animalPerSquareMeter < 0.15 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'FATTENING' &&
                item?.animalType?.name === 'Porciculture' &&
                animalPerSquareMeter < 0.65 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'REPRODUCTION' &&
                ['Ovins', 'Caprins'].includes(item?.animalType?.name) &&
                animalPerSquareMeter < 1.2 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'FATTENING' &&
                ['Ovins', 'Caprins'].includes(item?.animalType?.name) &&
                animalPerSquareMeter < 0.5 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.productionPhase === 'REPRODUCTION' &&
                item?.animalType?.name === 'Cuniculture' &&
                animalPerSquareMeter < 0.5 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : item?.animalType?.name === 'Cuniculture' &&
                ['FATTENING', 'GROWTH'].includes(item?.productionPhase) &&
                animalPerSquareMeter < 0.07 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="mt-2">
                        <span className="relative flex size-4">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex size-4 rounded-full bg-red-500"></span>
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {t.formatMessage({ id: 'POPULATION.DENSITY' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <span className="relative flex size-4 text-black">
                          {item?._count?.animals}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="dark:border-gray-800">
                      {item?._count?.animals} {''}
                      {item?._count?.animals === 1
                        ? t.formatMessage({ id: 'LOCATION.ANIMAL' })
                        : t.formatMessage({ id: 'LOCATION.ANIMALS' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                {item?.productionPhase !== 'FATTENING' ? (
                  <Link
                    className="flex items-center justify-center space-x-2"
                    href={`/location/${item?.id}`}
                  >
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 h-4">
                        <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                          <Grid2X2 className="h-3.5 w-3.5  hover:shadow-xxl" />
                          Surface: {item?.squareMeter}m<sup>2</sup>
                        </h2>
                      </h2>
                      {['Pisciculture'].includes(
                        item?.animalType?.name,
                      ) ? null : (
                        <>
                          <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                            <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                            {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                            {item?.manger}
                          </h2>
                          <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                            <Droplets className="h-3.5 w-3.5  hover:shadow-xxl" />
                            {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                            {item?.through}
                          </h2>
                        </>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                        {(item?.code).toUpperCase()}
                      </h3>
                      {item?.productionPhase === 'GROWTH' ? (
                        <p className=" text-sm font-medium text-gray-500">
                          {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                        </p>
                      ) : item?.productionPhase === 'FATTENING' ? (
                        <p className=" text-sm font-medium text-gray-500">
                          {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                        </p>
                      ) : (
                        <p className=" text-sm font-medium text-gray-500">
                          {item?.productionPhase}
                        </p>
                      )}
                      {item?.productionPhase === 'LACTATION' ? (
                        <p className="text-xs font-normal text-gray-500">
                          {t.formatMessage({ id: 'LITTER' })}:{' '}
                          {getOneFarrowing?.litter}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={`/location/${item?.id}`}
                    className="flex items-center justify-center space-x-2"
                  >
                    <div>
                      <h2 className="text-sm font-medium text-gray-500 h-4">
                        <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                          <Grid2X2 className="h-3.5 w-3.5  hover:shadow-xxl" />
                          Surface: {item?.squareMeter}m<sup>2</sup>
                        </h2>
                      </h2>
                      {['Pisciculture'].includes(
                        item?.animalType?.name,
                      ) ? null : (
                        <>
                          <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                            <Salad className="h-3.5 w-3.5  hover:shadow-xxl" />
                            {t.formatMessage({ id: 'LOCATION.MANGERS' })}:{' '}
                            {item?.manger}
                          </h2>
                          <h2 className="mt-2 flex items-center text-sm font-medium text-gray-500 h-4">
                            <Droplets className="h-3.5 w-3.5  hover:shadow-xxl" />
                            {t.formatMessage({ id: 'LOCATION.THROUGHS' })}:{' '}
                            {item?.through}
                          </h2>
                        </>
                      )}
                    </div>
                    <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                        {(item?.code).toUpperCase()}
                      </h3>
                      {item?.productionPhase === 'GROWTH' ? (
                        <p className=" text-sm font-medium text-gray-500">
                          {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                        </p>
                      ) : item?.productionPhase === 'FATTENING' ? (
                        <p className=" text-sm font-medium text-gray-500">
                          {t.formatMessage({ id: 'PRODUCTIONTYPE.FATTENING' })}
                        </p>
                      ) : (
                        <p className=" text-sm font-medium text-gray-500">
                          {item?.productionPhase}
                        </p>
                      )}
                    </div>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.formatMessage({ id: 'CLICK.TOSEE' })}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="grid grid-cols-1 mt-6 sm:mt-2 px-20 sm:grid-cols-2 xl:grid-cols-3 sm:gap-8 xl:gap-12">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                  className="ml-40"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">
                    {t.formatMessage({ id: 'TABANIMAL.MENU' })}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
                {item?._count?.animals == 0 ? (
                  <DropdownMenuItem onClick={() => setIsBulkOpen(true)}>
                    <Origami className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({ id: 'ADD.ANIMALS' })}
                    </span>
                  </DropdownMenuItem>
                ) : item?._count?.animals !== 0 &&
                  item?.productionPhase !== 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsBulkOpen(true)}>
                    <Origami className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({ id: 'ADD.ANIMALS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?.productionPhase == 'LACTATION' &&
                item?._count?.animals > 1 ? (
                  <DropdownMenuItem onClick={() => setIsWeaning(true)}>
                    <MilkOff className="size-4 text-gray-600 hover:text-violet-600" />
                    <span className="ml-2 cursor-pointer hover:text-violet-600">
                      {t.formatMessage({ id: 'WEAN' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?.productionPhase == 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsMotherTreatment(true)}>
                    <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({ id: 'FEMALE.CARE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals > 1 &&
                item?.animalType?.name !== 'Cuniculture' &&
                item?.productionPhase == 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsGrowthTreatment(true)}>
                    <Hospital className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      {t.formatMessage({ id: 'OFFSPRINGS.CARE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals == 1 &&
                item?.animalType?.name !== 'Cuniculture' &&
                item?.productionPhase == 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsIdentification(true)}>
                    <IdCard className="size-4 text-gray-600 hover:text-fuchsia-600" />
                    <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                      {t.formatMessage({ id: 'OFFSPRING.IDENTIFICATION' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 &&
                item?.productionPhase !== 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsTreatment(true)}>
                    <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 &&
                ['GROWTH', 'FATTENING'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsDeath(true)}>
                    <Bone className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 &&
                ['GROWTH', 'FATTENING'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsIsolation(true)}>
                    <Eclipse className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsFeeding(true)}>
                    <Salad className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 &&
                ['GROWTH', 'REPRODUCTION'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsFattening(true)}>
                    <Anvil className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.FATTENING' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals == 1 &&
                ['GESTATION'].includes(item?.productionPhase) ? (
                  <DropdownMenuItem onClick={() => setIsFarrowing(true)}>
                    <Origami className="size-4 text-gray-600 hover:text-emerald-600" />
                    <span className="ml-2 cursor-pointer hover:text-emerald-600">
                      {t.formatMessage({ id: 'TABWEANING.FARROWING' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals !== 0 &&
                item?.productionPhase !== 'LACTATION' ? (
                  <DropdownMenuItem onClick={() => setIsChangeLocation(true)}>
                    <ArrowLeftRight className="size-4 text-gray-600 hover:text-teal-600" />
                    <span className="ml-2 cursor-pointer hover:text-teal-600">
                      {t.formatMessage({ id: 'ANIMAL.MOVEMENT' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                {item?._count?.animals === 0 ? (
                  <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
                    <BadgeCheck className="size-4 text-gray-600 hover:text-sky-600" />
                    <span className="ml-2 cursor-pointer hover:text-sky-400">
                      {t.formatMessage({ id: 'CHANGE.STATUS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?._count?.animals === 0 ? (
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isOpen ? (
        <ActionModalDialog
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={() => deleteItem(item)}
        />
      ) : null}
      {isConfirmOpen ? (
        <ActionModalConfirmeDialog
          loading={loadingConfirme}
          isConfirmOpen={isConfirmOpen}
          setIsConfirmOpen={setIsConfirmOpen}
          onClick={() => changeItem(item)}
        />
      ) : null}
      {isEdit ? (
        <UpdateLocations
          location={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isFeeding ? (
        <CreateFeedings
          location={item}
          showModal={isFeeding}
          setShowModal={setIsFeeding}
        />
      ) : null}
      {isTreatment ? (
        <BulkCreateTreatments
          location={item}
          showModal={isTreatment}
          setShowModal={setIsTreatment}
        />
      ) : null}
      {isChangeLocation ? (
        <AnimalsChangeLocations
          location={item}
          showModal={isChangeLocation}
          setShowModal={setIsChangeLocation}
        />
      ) : null}
      {isFattening ? (
        <CreateOrUpdateFattenings
          location={item}
          showModal={isFattening}
          setShowModal={setIsFattening}
        />
      ) : null}
      {isFarrowing ? (
        <CreateFarrowings
          location={item}
          showModal={isFarrowing}
          setShowModal={setIsFarrowing}
        />
      ) : null}
      {isDeath ? (
        <CreateOrUpdateDeaths
          location={item}
          showModal={isDeath}
          setShowModal={setIsDeath}
        />
      ) : null}
      {isIsolation ? (
        <CreateOrUpdateIsolations
          location={item}
          showModal={isIsolation}
          setShowModal={setIsIsolation}
        />
      ) : null}
      {isBulkOpen ? (
        <CreateBulkAnimals
          location={item}
          showModal={isBulkOpen}
          setShowModal={setIsBulkOpen}
        />
      ) : null}
      {isWeaning ? (
        <CreateOrUpdateWeanings
          showModal={isWeaning}
          setShowModal={setIsWeaning}
        />
      ) : null}
      {isIdentification ? (
        <OffspringsIdentification
          location={item}
          showModal={isIdentification}
          setShowModal={setIsIdentification}
        />
      ) : null}
      {isMotherTreatment ? (
        <CreateTreatments
          location={item}
          showModal={isMotherTreatment}
          setShowModal={setIsMotherTreatment}
        />
      ) : null}
      {isGrowthTreatment ? (
        <BulkCreateTreatments
          location={item}
          showModal={isGrowthTreatment}
          setShowModal={setIsGrowthTreatment}
        />
      ) : null}
    </>
  );
};
export { ListLocations };
