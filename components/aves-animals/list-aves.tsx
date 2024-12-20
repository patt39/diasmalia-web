/* eslint-disable @next/next/no-img-element */
import {
  ArchiveOneAnimalAPI,
  ChangeProductionStatusAPI,
  DeleteOneAnimalAPI,
  DownloadReportAPI,
} from '@/api-site/animals';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateOrUpdateFinances } from '@/pages/finances/create-or-update-finances';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
  formatDateDifference,
  formatWeight,
} from '@/utils';
import {
  Anvil,
  Ban,
  Bone,
  Calendar,
  ClipboardPlus,
  Download,
  Eclipse,
  Egg,
  Eye,
  FileArchive,
  Grid,
  HeartHandshakeIcon,
  Hospital,
  MoreHorizontal,
  PencilIcon,
  Salad,
  TrashIcon,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateOrUpdateAvesDeaths } from '../aves-deaths/create-or-update-aves-deaths';
import { CreateOrUpdateAvesFeedings } from '../aves-feeding/create-or-update-aves-feedings';
import { CreateOrUpdateAvesIsolations } from '../aves-isolations/create-or-update-aves-isolations';
import { CreateAvesSales } from '../aves-sales/create-aves-sales';
import { CreateAvestreatments } from '../aves-treatments/create-aves-treatments';
import { CreateOrUpdateEggHarvestings } from '../egg-harvestings/create-or-update-egg-harvestings';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { ActionModalConfirmeDialog } from '../ui-setting/shadcn/action-modal-confirme-dialog';
import { Badge } from '../ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { PutInCages } from './put-in-cages';
import { UpdateAvesAnimals } from './update-aves';
import { ViewAvesAnimal } from './view-aves-animal';

const ListAvesAnimals = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, setLoading, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [isTreatment, setIsTreatment] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isDeath, setIsDeath] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [isIsolation, setIsIsolation] = useState(false);
  const [putIncages, setPutInCages] = useState(false);
  const [expenses, setExpenses] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneAnimalAPI();

  const { mutateAsync: archiveMutation } = ArchiveOneAnimalAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ animalId: item?.id });
      AlertSuccessNotification({
        text: 'Animal deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const response = await DownloadReportAPI({
        animalId: item?.id,
      });
      const link = document.createElement('a');
      link.href = response.config.url;
      link.click();
      link.remove();
      AlertSuccessNotification({
        text: 'Pdf downloaded successfully',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const archiveItem = async (item: any) => {
    try {
      await archiveMutation({ animalId: item?.id });
      AlertSuccessNotification({
        text: 'Animal archived successfully',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const { isPending: loadingConfirme, mutateAsync: saveMutation } =
    ChangeProductionStatusAPI();

  const changeItem = async (item: any) => {
    setIsConfirmOpen(true);
    try {
      await saveMutation({ animalId: item?.id });
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

  return (
    <>
      <div
        key={index}
        className="relative overflow-hidden transition-allduration-200 bg-gray-100 rounded-xl hover:bg-gray-200"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="flex space-x-40">
            <div className="mb-6">
              {item?.status === 'ACTIVE' ? (
                <Badge variant="default">
                  {t.formatMessage({ id: 'STATUS.ACTIVE' })}
                </Badge>
              ) : item?.status === 'SOLD' ? (
                <Badge variant="secondary">
                  {t.formatMessage({ id: 'STATUS.SOLD' })}
                </Badge>
              ) : item?.status === 'STOPPED' ? (
                <Badge variant="secondary">
                  {t.formatMessage({ id: 'STATUS.STOPPED' })}
                </Badge>
              ) : (
                <Badge variant="destructive">
                  {t.formatMessage({ id: 'STATUS.DEATH' })}
                </Badge>
              )}
            </div>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <span className="relative flex size-4 text-black">
                        {item?.quantity <= 0 ? 0 : item?.quantity}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="dark:border-gray-800">
                    {item?.quantity} {''}
                    {item?.quantity === 1
                      ? t.formatMessage({ id: 'LOCATION.ANIMAL' })
                      : t.formatMessage({ id: 'LOCATION.ANIMALS' })}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="flex justify-center space-x-4 cursor-pointer"
                  onClick={() => setIsView(true)}
                >
                  <div>
                    <h2 className="text-sm flex items-center font-medium text-gray-500 h-8">
                      <Anvil className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}:{' '}
                      {formatWeight(item?.weight)}
                    </h2>
                    <h2 className="flex items-center text-sm font-medium text-gray-500">
                      <Calendar className="h-3.5 w-3.5  hover:shadow-xxl" />
                      Age: {formatDateDifference(item?.birthday)}
                    </h2>
                  </div>
                  <div className="flex-shrink-0 w-px h-16  bg-gray-200"></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                      {(item?.code).toUpperCase()}
                    </h3>
                    {item?.productionPhase === 'GROWTH' ? (
                      <p className="text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONPHASE.GROWTH' })}
                      </p>
                    ) : item?.productionPhase === 'LAYING' ? (
                      <p className="text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONPHASE.LAYING' })}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'PRODUCTIONPHASE.FATTENING' })}
                      </p>
                    )}
                    {item?.location?.addCages === 'YES' &&
                    item?.location?.cages !== 0 &&
                    item?.animalType?.name !== 'Pisciculture' ? (
                      <p className="text-xs font-normal text-gray-500">cages</p>
                    ) : item?.location?.addCages === 'YES' &&
                      item?.animalType?.name == 'Pisciculture' ? (
                      <>
                        <p className="text-xs font-normal text-gray-500">
                          {t.formatMessage({ id: 'TANK' })}
                        </p>
                        <p className="text-xs font-normal text-gray-500">
                          {item?.breed?.name}
                        </p>
                      </>
                    ) : item?.location?.addCages === 'NO' &&
                      item?.animalType?.name == 'Pisciculture' ? (
                      <>
                        <p className="text-xs font-normal text-gray-500">
                          {t.formatMessage({ id: 'POND' })}
                        </p>
                        <p className="text-xs font-normal text-gray-500">
                          {item?.breed?.name}
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.formatMessage({ id: 'CLICK.TOSEE' })} </p>
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
                {item?.status == 'ACTIVE' && item?.quantity !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsTreatment(true)}>
                    <Hospital className="size-4 text-gray-600 hover:text-lime-600" />
                    <span className="ml-2 cursor-pointer hover:text-lime-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.CARE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?.status == 'ACTIVE' && item?.quantity !== 0 ? (
                  <DropdownMenuItem onClick={() => setIsDeath(true)}>
                    <Bone className="size-4 text-gray-600 hover:text-amber-600" />
                    <span className="ml-2 cursor-pointer hover:text-amber-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.DEATHS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?.status == 'ACTIVE' && item?.quantity !== 0 ? (
                  <>
                    <DropdownMenuItem onClick={() => setIsIsolation(true)}>
                      <Eclipse className="size-4 text-gray-600 hover:text-yellow-600" />
                      <span className="ml-2 cursor-pointer hover:text-yellow-600">
                        {t.formatMessage({ id: 'ANIMALTYPE.ISOLATIONS' })}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsFeeding(true)}>
                      <Salad className="size-4 text-gray-600 hover:text-violet-600" />
                      <span className="ml-2 cursor-pointer hover:text-violet-600">
                        {t.formatMessage({ id: 'ANIMALTYPE.FEEDINGS' })}
                      </span>
                    </DropdownMenuItem>
                  </>
                ) : null}
                {item?.productionPhase == 'LAYING' &&
                item?.quantity !== 0 &&
                item?.status == 'ACTIVE' &&
                item?.location?.addCages == 'YES' &&
                ['Pondeuses', 'Poulet de chair', 'Poulets Brahma'].includes(
                  item?.animalType?.name,
                ) ? (
                  <DropdownMenuItem onClick={() => setIsHarvesting(true)}>
                    <Egg className="size-4 text-gray-600 hover:text-purple-600" />
                    <span className="ml-2 cursor-pointer hover:text-purple-600">
                      {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
                    </span>
                  </DropdownMenuItem>
                ) : item?._count?.cages !== item?.location?.cages &&
                  item?.productionPhase == 'LAYING' &&
                  item?.status == 'ACTIVE' &&
                  ['Pondeuses', 'Quails'].includes(item?.animalType?.name) ? (
                  <>
                    <DropdownMenuItem onClick={() => setPutInCages(true)}>
                      <Grid className="size-4 text-gray-600 hover:text-purple-600" />
                      <span className="ml-2 cursor-pointer hover:text-purple-600">
                        {t.formatMessage({ id: 'PUT.IN.CAGES' })}
                      </span>
                    </DropdownMenuItem>
                    {item?._count?.cages == 0 ? (
                      <DropdownMenuItem onClick={() => setIsHarvesting(true)}>
                        <Egg className="size-4 text-gray-600 hover:text-purple-600" />
                        <span className="ml-2 cursor-pointer hover:text-purple-600">
                          {t.formatMessage({ id: 'ANIMALTYPE.EGGHAVESTING' })}
                        </span>
                      </DropdownMenuItem>
                    ) : (
                      <Link href={`/cages/${item?.id}`}>
                        <DropdownMenuItem>
                          <Eye className="size-4 text-gray-600 hover:text-purple-600" />
                          <span className="ml-2 cursor-pointer hover:text-purple-600">
                            {t.formatMessage({ id: 'VIEW.CAGES' })}
                          </span>
                        </DropdownMenuItem>
                      </Link>
                    )}
                  </>
                ) : item?._count?.cages !== 0 ? (
                  <Link href={`/cages/${item?.id}`}>
                    <DropdownMenuItem>
                      <Eye className="size-4 text-gray-600 hover:text-purple-600" />
                      <span className="ml-2 cursor-pointer hover:text-purple-600">
                        View cages
                      </span>
                    </DropdownMenuItem>
                  </Link>
                ) : null}
                {(item?.quantity === 0 && userStorage?.role === 'SUPERADMIN') ||
                item?.status == 'STOPPED' ? (
                  <>
                    <DropdownMenuItem onClick={() => archiveItem(item)}>
                      <FileArchive className="size-4 text-gray-600 hover:text-fuchsia-600" />
                      <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                        {t.formatMessage({ id: 'ARCHIVES' })}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownloadPdf()}>
                      <Download className="size-4 text-gray-600 hover:text-pink-600" />
                      <span className="ml-2 cursor-pointer hover:text-pink-600">
                        {t.formatMessage({ id: 'REPORT.DOWNLOAD' })}
                      </span>
                    </DropdownMenuItem>
                  </>
                ) : null}
                {item?.quantity !== 0 &&
                item?.status == 'ACTIVE' &&
                userStorage?.role === 'SUPERADMIN' ? (
                  <DropdownMenuItem onClick={() => setIsSold(true)}>
                    <HeartHandshakeIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'MENU.SALES' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {item?.quantity !== 0 &&
                item?.status == 'ACTIVE' &&
                userStorage?.role === 'SUPERADMIN' ? (
                  <DropdownMenuItem onClick={() => setIsEdit(true)}>
                    <PencilIcon className="size-4 text-gray-600 hover:text-violet-600" />
                    <span className="ml-2 cursor-pointer hover:text-violet-600">
                      {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                <Link href={`/treatment/${item?.id}`}>
                  <DropdownMenuItem>
                    <ClipboardPlus className="size-4 text-gray-600 hover:text-green-600" />
                    <span className="ml-2 cursor-pointer hover:text-green-600">
                      {t.formatMessage({ id: 'HEALTH' })}
                    </span>
                  </DropdownMenuItem>
                </Link>
                {item?.quantity !== 0 &&
                item?.status == 'ACTIVE' &&
                userStorage?.role === 'SUPERADMIN' ? (
                  <DropdownMenuItem onClick={() => setExpenses(true)}>
                    <WalletCards className="size-4 text-gray-600 hover:text-fuchsia-600" />
                    <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                      {t.formatMessage({ id: 'FINANCE.EXPENSES' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  <Link href={`/expenses/${item?.id}`}>
                    <DropdownMenuItem>
                      <WalletCards className="size-4 text-gray-600 hover:text-fuchsia-600" />
                      <span className="ml-2 cursor-pointer hover:text-fuchsia-600">
                        {t.formatMessage({ id: 'FINANCE.EXPENSES' })}
                      </span>
                    </DropdownMenuItem>
                  </Link>
                )}
                {userStorage?.role === 'SUPERADMIN' &&
                item?.status == 'ACTIVE' ? (
                  <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
                    <Ban className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'STOP.PRODUCTION' })}
                    </span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
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
            </DropdownMenu>
            {isEdit ? (
              <UpdateAvesAnimals
                animal={item}
                showModal={isEdit}
                setShowModal={setIsEdit}
              />
            ) : null}
            {isView ? (
              <ViewAvesAnimal
                animal={item}
                showModal={isView}
                setShowModal={setIsView}
              />
            ) : null}
            {isFeeding ? (
              <CreateOrUpdateAvesFeedings
                animal={item}
                feeding={item?.animalTypeId}
                showModal={isFeeding}
                setShowModal={setIsFeeding}
              />
            ) : null}
            {isTreatment ? (
              <CreateAvestreatments
                animal={item}
                treatment={item?.animalTypeId}
                showModal={isTreatment}
                setShowModal={setIsTreatment}
              />
            ) : null}
            {isHarvesting ? (
              <CreateOrUpdateEggHarvestings
                animal={item}
                eggHarvesting={item?.animalTypeId}
                showModal={isHarvesting}
                setShowModal={setIsHarvesting}
              />
            ) : null}
            {isDeath ? (
              <CreateOrUpdateAvesDeaths
                animal={item}
                death={item?.animalTypeId}
                showModal={isDeath}
                setShowModal={setIsDeath}
              />
            ) : null}
            {isSold ? (
              <CreateAvesSales
                animal={item}
                showModal={isSold}
                setShowModal={setIsSold}
              />
            ) : null}
            {isIsolation ? (
              <CreateOrUpdateAvesIsolations
                animal={item}
                isolation={item?.animalTypeId}
                showModal={isIsolation}
                setShowModal={setIsIsolation}
              />
            ) : null}
            {putIncages ? (
              <PutInCages
                animal={item}
                showModal={putIncages}
                setShowModal={setPutInCages}
              />
            ) : null}
            {expenses ? (
              <CreateOrUpdateFinances
                animal={item}
                showModal={expenses}
                setShowModal={setExpenses}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export { ListAvesAnimals };
