import { GetAnimalsAPI } from '@/api-site/animals';
import { GetOneBuildingAPI } from '@/api-site/buildings';
import { GetHealthsAPI } from '@/api-site/health';
import { CreateOneFemaleTreatmentAPI } from '@/api-site/treatment';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { treatmentMethods } from '@/i18n/default-exports';
import { TreatmentsPostModel } from '@/types/treatments';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const schema = yup.object({
  dose: yup.string().optional(),
  code: yup.string().optional(),
  name: yup.string().required('name is required'),
  healthId: yup.string().required('medication is required'),
  diagnosis: yup.string().required('diagnostic is required'),
  method: yup.string().required('method is required'),
});

const CreateTreatments = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  farrowing?: any;
  location?: any;
  animal?: any;
}) => {
  const { t, control, handleSubmit, errors, hasErrors, setHasErrors, locale } =
    useReactHookForm({ schema });
  const { query } = useRouter();
  const buildingId = String(query?.buildingId);
  const { data: getOneBuilding } = GetOneBuildingAPI({
    buildingId: buildingId,
  });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOneFemaleTreatmentAPI();

  const onSubmit: SubmitHandler<TreatmentsPostModel> = async (
    payload: TreatmentsPostModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Treatment saved successfully',
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
    isLoading: isLoadingTreatments,
    isError: isErrorTreatments,
    data: dataTreatments,
  } = GetHealthsAPI({
    take: 10,
    sort: 'desc',
    status: true,
    sortBy: 'createdAt',
    category: 'MEDICATION',
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  const { data: dataAnimal } = GetAnimalsAPI({
    take: 5,
    sort: 'desc',
    status: 'ACTIVE',
    sortBy: 'createdAt',
    productionPhase: 'LACTATION',
    locationId: location?.id,
    animalTypeId: getOneBuilding?.animalTypeId,
  });

  return (
    <>
      {showModal ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <div className="justify-end">
              <button
                className="float-right border-0 bg-transparent text-black"
                onClick={() => setShowModal(false)}
              >
                <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                  <XIcon />
                </span>
              </button>
            </div>
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
                <div className="my-2 items-center">
                  <Label>{t.formatMessage({ id: 'VIEW.MOTHER' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    defaultValue={`${dataAnimal?.pages[0]?.data?.value?.[0]?.code}`}
                    errors={errors}
                    disabled
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>
                    Treatement<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    placeholder="treatment name"
                    errors={errors}
                  />
                </div>
                <div className="mb-2 items-center space-x-1">
                  <Label>
                    Diagnostic<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="diagnosis"
                    placeholder="diagnosis"
                    errors={errors}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>
                      Medication<span className="text-red-600">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="healthId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'healthId'}
                          value={value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="select medication" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              {isLoadingTreatments ? (
                                <LoadingFile />
                              ) : isErrorTreatments ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataTreatments?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have active animals yet" />
                              ) : (
                                dataTreatments?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item: any, index: any) => (
                                    <>
                                      <SelectItem key={index} value={item?.id}>
                                        {item?.name}
                                      </SelectItem>
                                    </>
                                  ))
                              )}
                              <Button variant="link">
                                <Link href="/health">
                                  {t.formatMessage({ id: 'ADD.MEDICATION' })}
                                </Link>
                              </Button>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-60">
                    <Label>
                      Voie<span className="text-red-600">*</span>
                    </Label>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="select method"
                      valueType="text"
                      name="method"
                      dataItem={treatmentMethods.filter(
                        (i) => i?.lang === locale,
                      )}
                    />
                  </div>
                  <div className="w-40">
                    <Label>
                      Dose<span className="text-red-600">*</span>
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="dose"
                      placeholder="doses"
                      errors={errors}
                    />
                  </div>
                </div>
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

export { CreateTreatments };
