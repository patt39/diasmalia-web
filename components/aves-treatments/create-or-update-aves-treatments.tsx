import { GetHealthsAPI } from '@/api-site/health';
import { CreateOrUpdateOneAvesTreatmentAPI } from '@/api-site/treatment';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { TreatmentAvesModel } from '@/types/treatments';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { LoadingFile } from '../ui-setting/ant';
import { ErrorFile } from '../ui-setting/ant/error-file';
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
  code: yup.string().optional(),
  note: yup.string().optional(),
  dose: yup.number().optional(),
  diagnosis: yup.string().optional(),
  healthId: yup.string().optional(),
  name: yup.string().required('name is required'),
  method: yup.string().required('method is required'),
});

const CreateOrUpdateAvestreatments = ({
  showModal,
  setShowModal,
  treatment,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  treatment?: any;
  animal?: any;
}) => {
  const {
    t,
    control,
    setValue,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { query } = useRouter();
  const animalTypeId = String(query?.animalTypeId);

  useEffect(() => {
    if (treatment) {
      const fields = [
        'code',
        'note',
        'name',
        'diagnosis',
        'healthId',
        'method',
        'dose',
      ];
      fields?.forEach((field: any) => setValue(field, treatment[field]));
    }
  }, [treatment, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneAvesTreatmentAPI();

  const onSubmit: SubmitHandler<TreatmentAvesModel> = async (
    payload: TreatmentAvesModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        treatmentId: treatment?.id,
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
                <div className="items-center">
                  <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    placeholder="Give a code"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    Treatement<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    placeholder="Give treatment name"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <Label>
                    Diagnostic<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="diagnosis"
                    placeholder="Give a diagnosis"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
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
                          <SelectValue placeholder="Select medication" />
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
                            ) : Number(dataTreatments?.pages[0]?.data?.total) <=
                              0 ? (
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="mb-4 flex items-center space-x-1">
                  <Label>
                    Dose:<span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="number"
                    name="dose"
                    placeholder="Give a dose"
                    errors={errors}
                  />
                  <Label>
                    Voie:<span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Give a method"
                    control={control}
                    errors={errors}
                    placeholder="Select method"
                    valueType="text"
                    name="method"
                    dataItem={[
                      { id: 1, name: 'EYE' },
                      { id: 2, name: 'ORAL' },
                      { id: 1, name: 'NASAL' },
                      { id: 2, name: 'INJECTION' },
                    ]}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Feedback"
                    name="note"
                    placeholder="Give details about animal state"
                    errors={errors}
                  />
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

export { CreateOrUpdateAvestreatments };
