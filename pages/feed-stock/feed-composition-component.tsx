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
    <div className="mt-4 ml-2 flex items-center">
      <div className="w-96">
        <Input
          type="text"
          defaultValue={`${item?.type.toUpperCase()}`}
          disabled
        />
      </div>
      <div className="w-60 ml-4">
        <Input disabled type="text" defaultValue={`${item?.percentage}`} />
      </div>
      <div>
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
  );
};

export { FeedCompositionComponent };
