import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';

import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { CardHeader } from '@/components/ui/card';
import { PrivateComponent } from '@/components/util/private-component';
import { MoveDown, MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { ListAnimalType } from './list-animal-type';

export function AnimalType() {
  const { t } = useInputState();
  const { push, back } = useRouter();

  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  return (
    <>
      <LayoutDashboard title={'Animal types'}>
        <CardHeader>
          <div className="flex items-center">
            <ButtonInput
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                back();
              }}
              icon={<MoveLeftIcon className="size-4" />}
            >
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t.formatMessage({ id: 'UTIL.COME_BACK' })}
              </span>
            </ButtonInput>

            <div className="ml-auto flex items-center gap-2">
              <ButtonInput
                type="button"
                size="sm"
                variant="outline"
                onClick={() => push(`/select/other-animal-type`)}
                icon={<MoveDown className="size-4" />}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t.formatMessage({ id: 'NEW.ANIMALTYPE' })}
                </span>
              </ButtonInput>
            </div>
          </div>
        </CardHeader>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h6 className="font-bold tracking-tight text-center sm:text-4xl lg:text-4xl">
                {t.formatMessage({ id: 'ANIMALTYPE.TITLE' })}
              </h6>
            </div>

            <div className="grid grid-cols-1 gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
              {isLoadingAssignedTypes ? (
                <LoadingFile />
              ) : isErrorAssignedTypes ? (
                <ErrorFile description="Error finding data please try again..." />
              ) : Number(dataAssignedTypes?.pages[0]?.data?.total) <= 0 ? (
                ''
              ) : (
                dataAssignedTypes?.pages
                  .flatMap((page: any) => page?.data?.value)
                  .map((item, index) => (
                    <>
                      <ListAnimalType
                        item={item}
                        index={index}
                        key={item?.id}
                      />
                    </>
                  ))
              )}
            </div>
          </div>
        </main>
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(AnimalType);
