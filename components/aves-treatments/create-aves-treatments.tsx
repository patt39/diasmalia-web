import { GetHealthsAPI } from '@/api-site/health';
import { CreateOrUpdateOneAvesTreatmentAPI } from '@/api-site/treatment';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { treatmentMethods } from '@/i18n/default-exports';
import { TreatmentAvesModel } from '@/types/treatments';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
  code: yup.string().optional(),
  note: yup.string().optional(),
  diagnosis: yup.string().optional(),
  healthId: yup.string().optional(),
  dose: yup.string().required('dose is required'),
  name: yup.string().required('name is required'),
  method: yup.string().required('method is required'),
});

const CreateAvestreatments = ({
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

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create
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
                <div className="items-center mb-2">
                  <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="code"
                    errors={errors}
                    disabled
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
                    placeholder="treatment name"
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
                    placeholder="diagnosis"
                    errors={errors}
                  />
                </div>
                <div className="mb-8 flex items-center space-x-4">
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
                                  Ajouter un medicament
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
                      placeholder="ex 0,2ml"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
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

export { CreateAvestreatments };
