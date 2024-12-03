import { GetInfiniteAnimalTypesAPI } from '@/api-site/animal-type';
import { createAssignedTypeAPI } from '@/api-site/assigned-type';
import { AssignedTypeFormModel } from '@/types/assigned-type';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonLoadMore } from '../ui-setting';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { ButtonInput } from '../ui-setting/button-input';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';

const schema = yup.object({ animalTypeIds: yup.array().optional() });

const AnimalTypeComponent = () => {
  const {
    t,
    control,
    handleSubmit,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { push, back } = useRouter();
  const { ref, inView } = useInView();

  const onSubmit: SubmitHandler<AssignedTypeFormModel> = async (
    payload: AssignedTypeFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);

    try {
      await createAssignedTypeAPI({ ...payload });

      setHasErrors(false);
      setLoading(false);
      push(`/animal-types`);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const {
    isLoading: isLoadingAnimalTypes,
    isError: isErrorAnimalTypes,
    data: dataAnimalTypes,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteAnimalTypesAPI({
    take: 4,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
  });

  useEffect(() => {
    let fetching = false;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <>
      <div className="m-auto w-full max-w-4xl rounded-lg p-6 py-6 bg-white shadow-md dark:bg-black md:mt-4">
        <div className="mt-2 mx-auto flex justify-center">
          <h6 className="text-center text-xl font-bold">
            {t.formatMessage({ id: 'SELECT.ANIMALTYPE' })}
          </h6>
        </div>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          {hasErrors && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{hasErrors}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            {isLoadingAnimalTypes ? (
              <LoadingFile />
            ) : isErrorAnimalTypes ? (
              <ErrorFile
                title="404"
                description="Error find data please try again..."
              />
            ) : Number(dataAnimalTypes?.pages[0]?.data?.total) <= 0 ? (
              ''
            ) : (
              dataAnimalTypes?.pages
                .flatMap((page: any) => page?.data?.value)
                .map((item, index) => (
                  <Controller
                    key={index}
                    control={control}
                    name="animalTypeIds"
                    render={({ field: { ...field } }) => (
                      <>
                        <div
                          className="flex flex-row space-x-3 space-y-0 rounded-md border p-4 shadow items-center"
                          key={item?.id}
                        >
                          <Checkbox
                            checked={field?.value?.includes(item?.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    item?.id,
                                  ])
                                : field?.onChange(
                                    field?.value?.filter(
                                      (value: any) => value !== item?.id,
                                    ),
                                  );
                            }}
                          />
                          <div>
                            <strong className="font-medium text-gray-900 dark:text-white">
                              {item?.name}
                            </strong>
                            <p className="mt-1 text-pretty text-sm text-gray-700 dark:text-gray-200">
                              {item?.description}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  />
                ))
            )}
          </div>
          <div className="mx-auto mt-4 justify-center text-center">
            {hasNextPage && (
              <ButtonLoadMore
                ref={ref}
                isFetchingNextPage={isFetchingNextPage}
                onClick={() => fetchNextPage()}
              />
            )}
          </div>
          <div className="mt-6">
            <ButtonInput
              type="submit"
              className="w-full"
              variant="primary"
              size="lg"
              loading={loading}
            >
              {t.formatMessage({ id: 'SAVE.PREFERENCES' })}
            </ButtonInput>
          </div>
        </form>
      </div>
    </>
  );
};

export { AnimalTypeComponent };
