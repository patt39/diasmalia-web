import { CreateCollaboratorAPI } from '@/api-site/contributors';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { SelectInput, TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { ContributorModel } from '@/types/user';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().optional(),
  phone: yup.string().required('phone is required'),
  occupation: yup.string().required('occupation is required'),
  lastName: yup.string().required('last name is required'),
  firstName: yup.string().required('first name is required'),
  status: yup.string().required('status is required'),
});

const AddContributor = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const { t, control, handleSubmit, errors, hasErrors, setHasErrors } =
    useReactHookForm({ schema });

  // Create
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateCollaboratorAPI();

  const onSubmit: SubmitHandler<ContributorModel> = async (
    payload: ContributorModel,
  ) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Collaborator created successfully',
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

                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Nom</Label>
                    <span className="text-red-600">*</span>
                    <TextInput
                      control={control}
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Prénom</Label>
                    <span className="text-red-600">*</span>
                    <TextInput
                      control={control}
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Email</Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="email"
                      placeholder="Email"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Phone</Label>
                    <span className="text-red-600">*</span>
                    <TextInput
                      control={control}
                      type="number"
                      name="phone"
                      placeholder="phone"
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="my-2 flex items-center space-x-4">
                  <div className="w-80">
                    <Label>Role</Label>
                    <span className="text-red-600">*</span>
                    <TextInput
                      control={control}
                      type="text"
                      name="occupation"
                      placeholder="Collaborator's role"
                      errors={errors}
                    />
                  </div>
                  <div className="w-80">
                    <Label>Status</Label>
                    <span className="text-red-600">*</span>
                    <SelectInput
                      firstOptionName="Choose a production type"
                      control={control}
                      errors={errors}
                      placeholder="Select role"
                      valueType="text"
                      name="status"
                      dataItem={[
                        { id: 1, name: 'ADMIN' },
                        { id: 2, name: 'SUPERADMIN' },
                      ]}
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

export { AddContributor };
