import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { CreateHealthAPI } from '@/api-site/health';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HealthsModel } from '@/types/health';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  animalTypeId: yup.string().optional(),
  name: yup.string().required('name is a required field'),
  category: yup.string().required('category is required'),
});

const CreateHealth = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  health?: any;
}) => {
  const { t, watch, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });
  const watchHealthType = watch('category', '');

  // Create
  const { isPending: loading, mutateAsync: saveMutation } = CreateHealthAPI();

  const onSubmit: SubmitHandler<HealthsModel> = async (
    payload: HealthsModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Health saved successfully',
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
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
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
                    {t.formatMessage({ id: 'MEDICATION.CATEGORY' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <SelectInput
                    firstOptionName="Choose a transaction type"
                    control={control}
                    errors={errors}
                    placeholder="Select type"
                    valueType="text"
                    name="category"
                    dataItem={[
                      { id: 1, name: 'MEDICATION' },
                      { id: 2, name: 'HYGIENE' },
                      { id: 3, name: 'EQUIPMENT' },
                    ]}
                  />
                </div>
                {watchHealthType === 'MEDICATION' ? (
                  <div className="my-2 items-center">
                    <Label>
                      {t.formatMessage({ id: 'SELECT.ANIMALTYPE' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Controller
                      control={control}
                      name="animalTypeId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'animalTypeId'}
                          value={value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select animal type" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              {isLoadingAssignedTypes ? (
                                <LoadingFile />
                              ) : isErrorAssignedTypes ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataAssignedTypes?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have location codes" />
                              ) : (
                                dataAssignedTypes?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item, index) => (
                                    <>
                                      <SelectItem
                                        key={index}
                                        value={item?.animalType?.id}
                                      >
                                        {item?.animalType?.name}
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
                ) : (
                  ''
                )}
                <div className="mb-2">
                  <Label>
                    {t.formatMessage({ id: 'NAME' })}
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextInput
                    control={control}
                    type="text"
                    name="name"
                    placeholder="Give a name"
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

export { CreateHealth };
