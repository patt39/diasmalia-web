import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TrashIcon } from 'lucide-react';

const FeedCompositionComponent = ({
  item,
  onClick,
}: {
  item?: any;
  onClick: () => void;
}) => {
  return (
    <div className="">
      <div className="mt-2 flex lg:col-span-2 space-x-4 items-center">
        <div className="w-96">
          <Input
            type="text"
            name="type"
            defaultValue={`${item?.type.toUpperCase()}`}
            disabled
          />
        </div>
        <div>
          <Input
            disabled
            type="text"
            name="percentage"
            defaultValue={`${item?.percentage}`}
          />
        </div>
        <div className="">
          <TooltipProvider>
            <Tooltip>
              <Button
                onClick={onClick}
                variant={'link'}
                size="default"
                className="cursor-pointer"
              >
                <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
              </Button>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export { FeedCompositionComponent };
