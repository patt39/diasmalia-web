import { GetAssignedTypesAPI } from '@/api-site/assigned-type';
import { GetContributorsAPI } from '@/api-site/contributors';
import { AssigneTaskAPI } from '@/api-site/task';
import { GetOneUserMeAPI } from '@/api-site/user';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { DateInput, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { taskFrequency, taskPeriode, taskType } from '@/i18n/default-exports';
import { TaskModel } from '@/types/task';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  dueDate: yup.string().optional(),
  periode: yup.string().optional(),
  frequency: yup.string().optional(),
  type: yup.string().required('type is required'),
  title: yup.string().required('title is required'),
  description: yup.string().required('status is required'),
  animalTypeId: yup.string().required('animal type is required'),
  contributorId: yup.string().required('collaborator is required'),
});

const AssigneTask = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const {
    t,
    control,
    handleSubmit,
    errors,
    hasErrors,
    setHasErrors,
    watch,
    locale,
  } = useReactHookForm({ schema });
  const watchType = watch('type', '');
  const watchAnimalTypeId = watch('animalTypeId', '');
  const { data: user } = GetOneUserMeAPI();

  const {
    isLoading: isLoadingAssignedTypes,
    isError: isErrorAssignedTypes,
    data: dataAssignedTypes,
  } = GetAssignedTypesAPI({
    take: 20,
    sort: 'desc',
    sortBy: 'createdAt',
  });

  const {
    isLoading: isLoadingCollaborators,
    isError: isErrorCollaborators,
    data: dataCollaborators,
  } = GetContributorsAPI({
    take: 10,
    sort: 'desc',
    sortBy: 'createdAt',
    organizationId: user?.organizationId,
  });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } = AssigneTaskAPI();

  const onSubmit: SubmitHandler<TaskModel> = async (payload: TaskModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Task created successfully',
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
            <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
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

                <div className="w-full my-2">
                  <Label>Sélectionner le type de la tâche</Label>
                  <span className="text-red-600">*</span>
                  <SelectInput
                    control={control}
                    errors={errors}
                    placeholder="select task type"
                    valueType="key"
                    name="type"
                    dataItem={taskType.filter((i) => i?.lang === locale)}
                  />
                </div>
                {watchType === 'GENERIC' ? (
                  <div className="w-full mb-2">
                    <Label>Fréquence</Label>
                    <span className="text-red-600">*</span>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="select frequency"
                      valueType="text"
                      name="frequency"
                      dataItem={taskFrequency.filter((i) => i?.lang === locale)}
                    />
                  </div>
                ) : (
                  ''
                )}
                {watchType === 'SPECIFIC' ? (
                  <div className="w-full mb-2">
                    <Label>Période</Label>
                    <span className="text-red-600">*</span>
                    <SelectInput
                      control={control}
                      errors={errors}
                      placeholder="select periode"
                      valueType="text"
                      name="periode"
                      dataItem={taskPeriode.filter((i) => i?.lang === locale)}
                    />
                  </div>
                ) : (
                  ''
                )}
                <div className="w-full my-2">
                  <Label>
                    {t.formatMessage({
                      id: 'SELECT.ANIMALTYPE',
                    })}
                  </Label>
                  <span className="text-red-600">*</span>
                  <Controller
                    control={control}
                    name="animalTypeId"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        onValueChange={onChange}
                        name={'animalTypeId'}
                        value={value}
                      >
                        <SelectTrigger className="w-full space-x-1">
                          <SelectValue
                            placeholder={t.formatMessage({
                              id: 'SELECT.ANIMALTYPE',
                            })}
                          />
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
                                      value={item?.animalTypeId}
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
                {watchType === 'SPECIFIC' && watchAnimalTypeId ? (
                  <div className="flex items-center mb-2 space-x-4">
                    <div className="w-80">
                      <Label>Sélectionner un collaborateur</Label>
                      <span className="text-red-600">*</span>
                      <Controller
                        control={control}
                        name="contributorId"
                        render={({ field: { value, onChange } }) => (
                          <Select
                            onValueChange={onChange}
                            name={'contributorId'}
                            value={value}
                          >
                            <SelectTrigger className="w-full space-x-1">
                              <SelectValue placeholder="Select collaborator" />
                            </SelectTrigger>
                            <SelectContent className="dark:border-gray-800">
                              <SelectGroup>
                                {isLoadingCollaborators ? (
                                  <LoadingFile />
                                ) : isErrorCollaborators ? (
                                  <ErrorFile
                                    title="404"
                                    description="Error finding data please try again..."
                                  />
                                ) : Number(
                                    dataCollaborators?.pages[0]?.data?.total,
                                  ) <= 0 ? (
                                  <ErrorFile description="Don't have collaborators yet please add" />
                                ) : (
                                  dataCollaborators?.pages
                                    .flatMap((page: any) => page?.data?.value)
                                    .map((item, index) => (
                                      <>
                                        <SelectItem
                                          key={index}
                                          value={item?.id}
                                        >
                                          {item?.user?.profile?.firstName}{' '}
                                          {item?.user?.profile?.lastName}
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
                    <div className="w-80">
                      <Label>
                        <Label>{t.formatMessage({ id: 'DUEDATE' })}</Label>
                        <span className="text-red-600">*</span>
                      </Label>
                      <DateInput
                        control={control}
                        errors={errors}
                        placeholder="due date"
                        name="dueDate"
                      />
                    </div>
                  </div>
                ) : (
                  ''
                )}

                {watchType === 'GENERIC' ? (
                  <div className="w-full my-2">
                    <Label>Sélectionner un collaborateur</Label>
                    <span className="text-red-600">*</span>
                    <Controller
                      control={control}
                      name="contributorId"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          onValueChange={onChange}
                          name={'contributorId'}
                          value={value}
                        >
                          <SelectTrigger className="w-full space-x-1">
                            <SelectValue placeholder="Select collaborator" />
                          </SelectTrigger>
                          <SelectContent className="dark:border-gray-800">
                            <SelectGroup>
                              {isLoadingCollaborators ? (
                                <LoadingFile />
                              ) : isErrorCollaborators ? (
                                <ErrorFile
                                  title="404"
                                  description="Error finding data please try again..."
                                />
                              ) : Number(
                                  dataCollaborators?.pages[0]?.data?.total,
                                ) <= 0 ? (
                                <ErrorFile description="Don't have collaborators yet please add" />
                              ) : (
                                dataCollaborators?.pages
                                  .flatMap((page: any) => page?.data?.value)
                                  .map((item, index) => (
                                    <>
                                      <SelectItem key={index} value={item?.id}>
                                        {item?.user?.profile?.firstName}{' '}
                                        {item?.user?.profile?.lastName}
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

                <div className="mb-4">
                  <Label>Titre de la tâche</Label>
                  <span className="text-red-600">*</span>
                  <TextInput
                    control={control}
                    type="text"
                    name="title"
                    placeholder="title"
                    errors={errors}
                  />
                </div>
                <div className="mb-4">
                  <TextAreaInput
                    control={control}
                    label="Description de la tâche"
                    name="description"
                    placeholder="describe task"
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

export { AssigneTask };
