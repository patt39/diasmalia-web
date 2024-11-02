import { CreateOneCheckAPI } from '@/api-site/breedings';
import { GetLocationsAPI } from '@/api-site/locations';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput } from '@/components/ui-setting/shadcn';
import { checkPregnancyMethod, checkResults } from '@/i18n/default-exports';
import { CheckPregnancysModel } from '@/types/breeding';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { Label } from '@radix-ui/react-label';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { DateInput, LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const schema = yup.object({
  farrowingDate: yup.date().optional(),
  method: yup.string().required('method is required'),
  result: yup.string().required('result is required'),
  locationCode: yup.string().required('Location code is required'),
});

const CheckPregnancy = ({
  showModal,
  setShowModal,
  breeding,
}: {
  showModal: boolean;
  setShowModal: any;
  breeding?: any;
}) => {
  const {
    t,
    watch,
    locale,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);
  const watchResult = watch('result');

  useEffect(() => {
    if (breeding) {
      const fields = ['method', 'result', 'farrowingDate'];
      fields?.forEach((field: any) => setValue(field, breeding[field]));
    }
  }, [breeding, setValue]);

  // Create data
  const { isPending: loading, mutateAsync: saveMutation } = CreateOneCheckAPI();

  const onSubmit: SubmitHandler<CheckPregnancysModel> = async (
    payload: CheckPregnancysModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        breedingId: breeding?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Breeding checked successfully',
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const {
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
    data: dataLocations,
  } = GetLocationsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    productionPhase: 'GESTATION',
    animalTypeId: animalTypeId,
  });

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="mb-2">
                  <Label>
                    Methode
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a size"
                    control={control}
                    errors={errors}
                    placeholder="Select a method"
                    valueType="text"
                    name="method"
                    dataItem={checkPregnancyMethod.filter(
                      (i) => i?.lang === locale,
                    )}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    Résultat
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a size"
                    control={control}
                    errors={errors}
                    placeholder="Select result"
                    valueType="key"
                    name="result"
                    dataItem={checkResults.filter((i) => i?.lang === locale)}
                  />
                </div>
                {watchResult === 'PREGNANT' ? (
                  <>
                    <div>
                      <Label>
                        Donnez la date de mise bas
                        <span className="text-red-600">*</span>
                      </Label>
                      <DateInput
                        control={control}
                        errors={errors}
                        placeholder="Pick a date"
                        name="farrowingDate"
                      />
                    </div>
                    <div className="mt-2">
                      <Label>
                        Sélectionner un emplacement
                        <span className="text-red-600">*</span>
                      </Label>
                      <Controller
                        control={control}
                        name="locationCode"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'locationCode'}
                            value={value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a location code" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-gray-800">
                              <SelectGroup>
                                <SelectLabel>Location codes</SelectLabel>
                                {isLoadingLocations ? (
                                  <LoadingFile />
                                ) : isErrorLocations ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataLocations?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have location codes" />
                                ) : (
                                  dataLocations?.pages
                                    .flatMap((page: any) => page?.data?.value)
                                    .map((item, index) => (
                                      <>
                                        <SelectItem
                                          key={index}
                                          value={item?.code}
                                        >
                                          {item?.code}
                                        </SelectItem>
                                      </>
                                    ))
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div className="mt-4 flex items-center space-x-4">
                  <ButtonInput
                    type="button"
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                  >
                    {t.formatMessage({ id: 'ALERT.CANCEL' })}
                  </ButtonInput>
                  <ButtonInput
                    type="submit"
                    className="w-full"
                    variant="primary"
                    disabled={loading}
                    loading={loading}
                  >
                    {t.formatMessage({ id: 'ALERT.CONTINUE' })}
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CheckPregnancy };
