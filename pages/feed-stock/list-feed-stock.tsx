/* eslint-disable @next/next/no-img-element */
import { DeleteOneFeedStockAPI } from '@/api-site/feed-stock';
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
  Anvil,
  Calendar,
  MoreHorizontal,
  PencilIcon,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { formatDateDDMMYY } from '../../utils/formate-date';
import { CreateOrUpdateFeedComposition } from './create-or-update-feed-composition';
import { CreateOrUpdateFeedStock } from './create-or-update-feed-stock';

const ListFeedStock = ({ item, index }: { item: any; index: number }) => {
  const { t, isOpen, setIsOpen, userStorage } = useInputState();
  const [isEdit, setIsEdit] = useState(false);
  const [isComposition, setIsComposition] = useState(false);

  const { isPending: loading, mutateAsync: deleteMutation } =
    DeleteOneFeedStockAPI();

  const deleteItem = async (item: any) => {
    setIsOpen(true);
    try {
      await deleteMutation({ feedStockId: item?.id });
      AlertSuccessNotification({
        text: 'Stock deleted successfully',
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
        <div className="p-6 lg:px-8 lg:py-8">
          <div className="flex space-x-32">
            {['PRESTARTER', 'PRÉDÉMARRAGE'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-orange-600 text-base font-bold mb-2">
                {t.formatMessage({ id: 'FEED.PRESTARTER' })}
              </div>
            ) : ['STARTER', 'DÉMARRAGE'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-amber-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.STARTER' })}
              </div>
            ) : ['GROWER', 'CROISSANCE'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-yellow-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.GROWER' })}
              </div>
            ) : ['FATTENER', 'ENGRAISSEUR'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-lime-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.FATTENER' })}
              </div>
            ) : ['FINISHER', 'FINITION'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-green-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.FINISHER' })}
              </div>
            ) : ['FORAGES', 'FOURAGES'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-emerald-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.FORAGES' })}
              </div>
            ) : ['SILAGES', 'ENSILAGES'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-teal-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.SILAGES' })}
              </div>
            ) : ['BYPRODUCTS', 'PRODUIT DÉRIVÉS'].includes(
                item?.feedCategory,
              ) ? (
              <div className="justify-items-start text-cyan-600 text-sm font-bold mb-2">
                {t.formatMessage({ id: 'FEED.BYPRODUCTS' })}
              </div>
            ) : ['COMPLETEFEED', 'ALIMENT COMPLÈT'].includes(
                item?.feedCategory,
              ) ? (
              <div className="justify-items-start text-sky-600 text-sm font-bold mb-2">
                {t.formatMessage({ id: 'FEED.COMPLETEFEED' })}
              </div>
            ) : ['CONCENTRATES', 'CONCENTRÉS'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-blue-600 text-lg font-bold mb-2">
                {t.formatMessage({ id: 'FEED.CONCENTRATES' })}
              </div>
            ) : ['LAY FOOD', 'ALIMENT PONTE'].includes(item?.feedCategory) ? (
              <div className="justify-items-start text-indigo-600 text-sm font-bold mb-2">
                {t.formatMessage({ id: 'FEED.LAYERSFEED' })}
              </div>
            ) : ['LACTATIZING FEMALE', 'FEMELLES ALLAITANTES'].includes(
                item?.feedCategory,
              ) ? (
              <div className="justify-items-start text-violet-600 text-sm font-bold mb-2">
                {t.formatMessage({ id: 'FEED.LACTATINGFEMALES' })}
              </div>
            ) : ['PREGNANT FEMALE', 'FEMELLES GESTANTES'].includes(
                item?.feedCategory,
              ) ? (
              <div className="justify-items-start text-purple-600 text-sm font-bold mb-2">
                {t.formatMessage({ id: 'FEED.FEMALEGESTATION' })}
              </div>
            ) : (
              <div className="justify-items-start text-fuchsia-600 text-lg font-bold mb-2">
                {item?.feedCategory}
              </div>
            )}
            <div>
              {item?.number < 4 && item?.number != 0 ? (
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
                      {t.formatMessage({ id: 'OUTOFSTOCK' })}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center space-x-6 mt-2 cursor-pointer">
                  <div onClick={() => setIsComposition(true)}>
                    <h2 className="mb-2 flex items-center text-base font-bold text-gray-500 h-4 space-x-2">
                      <Anvil className="h-3.5 w-3.5  hover:shadow-xxl" />
                      {t.formatMessage({ id: 'TABANIMAL.WEIGHT' })}:{' '}
                      {item?.weight}kg
                    </h2>
                    <h2 className="mb-2 flex items-center text-base font-normal text-gray-500 h-4 space-x-2">
                      <Calendar className="h-3.5 w-3.5  hover:shadow-xxl" />
                      Date: {formatDateDDMMYY(item?.updatedAt as Date)}
                    </h2>
                    <h2 className="flex items-center text-base font-normal text-gray-500 h-4 space-x-2">
                      {item?.animalType?.name}
                    </h2>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.formatMessage({ id: 'CLICK.TO.ADD.COMPOSITION' })} </p>
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:border-gray-800">
                <DropdownMenuItem onClick={() => setIsEdit(true)}>
                  <PencilIcon className="size-4 text-gray-600 hover:text-cyan-600" />
                  <span className="ml-2 cursor-pointer hover:text-cyan-600">
                    {t.formatMessage({ id: 'TABANIMAL.EDIT' })}
                  </span>
                </DropdownMenuItem>
                {userStorage?.role === 'SUPERADMIN' ? (
                  <DropdownMenuItem onClick={() => setIsOpen(true)}>
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                    <span className="ml-2 cursor-pointer hover:text-red-600">
                      {t.formatMessage({ id: 'TABANIMAL.DELETE' })}
                    </span>
                  </DropdownMenuItem>
                ) : null}
              </DropdownMenuContent>
              <ActionModalDialog
                loading={loading}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={() => deleteItem(item)}
              />
            </DropdownMenu>
            <CreateOrUpdateFeedStock
              feedStock={item}
              showModal={isEdit}
              setShowModal={setIsEdit}
            />
            <CreateOrUpdateFeedComposition
              feedStock={item}
              showModal={isComposition}
              setShowModal={setIsComposition}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export { ListFeedStock };
