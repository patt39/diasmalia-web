/* eslint-disable @next/next/no-img-element */
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDateDDMMYY, formatWeight } from '@/utils';
import { Badge } from '../ui/badge';
import { TableCell, TableRow } from '../ui/table';

const ListWeanings = ({ item, index }: { item: any; index: number }) => {
  const { t } = useInputState();

  return (
    <>
      <TableRow key={index} className="dark:border-gray-800">
        <TableCell className="font-medium">{item?.animal?.code}</TableCell>
        <TableCell>{item?.farrowing?.litter}</TableCell>
        <TableCell>{item?.litter}</TableCell>
        <TableCell>{formatWeight(item?.weight)}</TableCell>
        <TableCell>
          {Number(item?.farrowing?.litter - item?.litter) <= 2 ? (
            <Badge className="text-xs" variant="default">
              {t.formatMessage({ id: 'GOOD.MOTHER' })}
            </Badge>
          ) : (
            <Badge className="text-xs" variant="destructive">
              {t.formatMessage({ id: 'BAD.MOTHER' })}
            </Badge>
          )}
        </TableCell>
        <TableCell>{formatDateDDMMYY(item?.createdAt as Date)}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <span className="sr-only">
                  {t.formatMessage({ id: 'TABANIMAL.MENU' })}
                </span>
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
};
export { ListWeanings };
