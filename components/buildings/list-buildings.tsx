/* eslint-disable @next/next/no-img-element */
import { DeleteOneBuildingAPI } from '@/api-site/buildings';
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
  Fence,
  House,
  MoreHorizontal,
  PencilIcon,
  Settings,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CreateBulkLocations } from '../locations/bulk-create-locations';
import { ActionModalDialog } from '../ui-setting/shadcn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Parameters } from './parameters';
import { UpdateBuilding } from './update-buildings';
import { UserParameters } from './user-parameters';

const ListBuildings = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState<boolean>(false);
  const [isCheckParameters, setIsCheckParameters] = useState(false);
  const [isBuildingParameters, setIsBuildingParameters] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneBuildingAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ buildingId: item.id });
      AlertSuccessNotification({
        text: 'Building deleted successfully',
      });
      setIsOpen(false);
    } catch (error: any) {
      setIsOpen(true);
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
          <div className="mb-2 justify-items-end">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <span className="relative flex size-4 text-black">
                      {item?._count?.locations ?? 0}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  {item?.animalType?.name === 'Porciculture'
                    ? t.formatMessage({ id: 'VIEW.LODGES' })
                    : item?.animalType?.name === 'Cuniculture'
                      ? t.formatMessage({ id: 'VIEW.HUTCHES' })
                      : item?.animalType?.name === 'Bovins'
                        ? t.formatMessage({ id: 'VIEW.STABLES' })
                        : t.formatMessage({ id: 'VIEW.PENS' })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex items-center justify-center space-x-4"
                  href={`/building/${item?.id}`}
                >
                  <div className="justify-items-center">
                    <House className="h-10 w-10  hover:shadow-xxl items-center" />
                    <h2 className="text-sm font-medium text-gray-500">
                      {item?.squareMeter}m<sup>2</sup>
                    </h2>
                  </div>
                  <div className="flex-shrink-0 w-px h-20  bg-gray-200"></div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
                      {(item?.code).toUpperCase()}
                    </h3>
                    {item?.productionPhase === 'GROWTH' ? (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'POST.WEANING' })}
                      </p>
                    ) : item?.productionPhase === 'FATTENING' ? (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({
                          id: 'PRODUCTIONTYPE.FATTENING',
                        })}
                      </p>
                    ) : item?.productionPhase === 'GESTATION' ? (
                      <p className=" text-sm font-medium text-gray-500">
                        {t.formatMessage({ id: 'MATERNITY' })}
                      </p>
                    ) : (
                      <p className=" text-sm font-medium text-gray-500">
                        {item?.productionPhase}
                      </p>
                    )}
                  </div>
                </Link>
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
                <DropdownMenuItem onClick={() => setIsBulkOpen(true)}>
                  <Fence className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {item?.animalType?.name === 'Porciculture'
                      ? t.formatMessage({ id: 'PIGS.LODGES' })
                      : item?.animalType?.name === 'Cuniculture'
                        ? t.formatMessage({ id: 'RABBITS.HUTCHES' })
                        : item?.animalType?.name === 'Bovins'
                          ? t.formatMessage({ id: 'COWS.STABLES' })
                          : t.formatMessage({ id: 'ADD.PENS' })}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsBuildingParameters(true)}>
                  <Settings className="size-4 text-gray-600 hover:text-purple-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    {t.formatMessage({ id: 'PARAMETERS' })}
                  </span>
                </DropdownMenuItem>
                {item?._count?.assignMaterials < 8 ? (
                  <DropdownMenuItem onClick={() => setIsCheckParameters(true)}>
                    <Settings className="size-4 text-gray-600 hover:text-purple-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'CHECK.PARAMETERS' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
                {userStorage?.role === 'SUPERADMIN' &&
                item?._count?.locations == 0 ? (
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
      {isEdit ? (
        <UpdateBuilding
          building={item}
          showModal={isEdit}
          setShowModal={setIsEdit}
        />
      ) : null}
      {isBulkOpen ? (
        <CreateBulkLocations
          building={item}
          showModal={isBulkOpen}
          setShowModal={setIsBulkOpen}
        />
      ) : null}
      {isCheckParameters ? (
        <Parameters
          building={item}
          showModal={isCheckParameters}
          setShowModal={setIsCheckParameters}
        />
      ) : null}
      {isBuildingParameters ? (
        <UserParameters
          building={item}
          showModal={isBuildingParameters}
          setShowModal={setIsBuildingParameters}
        />
      ) : null}
    </>
  );
};
export { ListBuildings };
