import { GetOrganizationAPI, UpdateOrganizationAPI } from '@/api-site/user';
import { OrganizationModel } from '@/types/user';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, ReactQuillInput } from '../ui-setting';
import { TextInput } from '../ui-setting/shadcn';
import { Alert, AlertDescription } from '../ui/alert';

const schema = yup.object({
  name: yup.string().optional(),
  description: yup.string().required('description is required'),
});
const UpdateOrganization = () => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setValue,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const { userStorage } = useInputState();
  const { data: organization } = GetOrganizationAPI({
    userId: userStorage?.userId,
  });

  useEffect(() => {
    if (organization) {
      const fields = ['description', 'name'];
      fields?.forEach((field: any) => setValue(field, organization[field]));
    }
  }, [organization, setValue]);

  // Update data
  const { mutateAsync: saveMutation } = UpdateOrganizationAPI();

  const onSubmit: SubmitHandler<OrganizationModel> = async (
    payload: OrganizationModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        animalId: organization?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Informations updated successfully',
      });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            {hasErrors && (
              <Alert
                variant="destructive"
                className="mb-4 bg-red-600 text-center"
              >
                <AlertDescription className="text-white">
                  {hasErrors}
                </AlertDescription>
              </Alert>
            )}
            <div className="mt-2">
              <TextInput
                label="Organization name"
                control={control}
                type="text"
                name="name"
                placeholder="enterprise name"
                errors={errors}
              />
            </div>
            <div className="mt-4">
              <ReactQuillInput
                control={control}
                label="Description"
                name="description"
                placeholder="Write description"
                errors={errors}
              />
            </div>
            <div className="mb-2 mt-4 flex items-center space-x-4">
              <ButtonInput
                size="lg"
                type="submit"
                variant="default"
                className="w-full"
                loading={loading}
              >
                Save changes
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { UpdateOrganization };
