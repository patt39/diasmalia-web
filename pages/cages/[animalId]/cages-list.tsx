/* eslint-disable @next/next/no-img-element */
import { GetOneAnimalAPI } from '@/api-site/animals';
import { DeleteOneCageAPI } from '@/api-site/cages';
import { useInputState } from '@/components/hooks';
import { ActionModalDialog } from '@/components/ui-setting/shadcn';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import {
  Bone,
  Egg,
  Grid,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CageEggHarvestings } from './egg-harvestings';
import { UpdateCages } from './update-cages';

const CagesList = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isEggHarvesting, setIsEggHarvesting] = useState(false);

  const { query, back } = useRouter();
  const animalId = String(query?.animalId);

  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animalId,
  });

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneCageAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ cageId: item?.id });
      AlertSuccessNotification({
        text: 'Cage deleted successfully',
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
        className="relative overflow-hidden transition-allduration-200 bg-gray-200 rounded-xl hover:bg-gray-400"
      >
        <div className="p-6 lg:px-10 lg:py-8">
          <div className="flex space-x-48">
            <h3 className="text-sm font-bold text-gray-900 h-8 sm:text-base lg:text-lg">
              {(item?.code).toUpperCase()}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <span className="relative flex size-4 text-black">
                      {item?.numberPerCage}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="dark:border-gray-800">
                  {item?.numberPerCage}
                  {t.formatMessage({ id: 'LOCATION.ANIMALS' })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="items-center justify-items-center mt-2">
            <div>
              <h2 className="text-sm flex items-center font-medium text-gray-500">
                <Bone className="h-3.5 w-3.5  hover:shadow-xxl mr-1" />
                Morts: {item?.death}
              </h2>
              <h2 className="text-sm flex items-center font-medium text-gray-500">
                <Grid className="h-3.5 w-3.5  hover:shadow-xxl mr-1" />
                Dimension: {item?.dimension}m<sup>3</sup>
              </h2>
              {getOneAnimal?.productionPhase === 'LAYING' ? (
                <h2 className="text-sm flex items-center font-medium text-gray-500">
                  <Egg className="h-3.5 w-3.5  hover:shadow-xxl mr-1" />
                  Oeufs rammassés: {item?.eggHarvested}
                </h2>
              ) : (
                ''
              )}
            </div>
          </div>
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
                <DropdownMenuItem onClick={() => setIsEggHarvesting(true)}>
                  <Egg className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    EggHarvesting
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  <span className="ml-2 cursor-pointer hover:text-red-600">
                    {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
              <ActionModalDialog
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => deleteItem(item)}
              />
            </DropdownMenu>
            <UpdateCages
              cage={item}
              showModal={isEdit}
              setShowModal={setIsEdit}
            />
            <CageEggHarvestings
              cage={item}
              showModal={isEggHarvesting}
              setShowModal={setIsEggHarvesting}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export { CagesList };
