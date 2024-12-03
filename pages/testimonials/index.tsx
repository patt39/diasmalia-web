import { SendContactAPI } from '@/api-site/contact';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layouts/dashboard';
import { DashboardFooter } from '@/components/layouts/dashboard/footer';
import { ButtonInput } from '@/components/ui-setting';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { Label } from '@/components/ui/label';
import { PrivateComponent } from '@/components/util/private-component';
import { ContactsModel } from '@/types/contact';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  subject: yup.string().required('subject is required'),
  description: yup.string().required('description is required'),
});

export function Contact() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      subject: '',
      description: '',
    },
  });

  const { t } = useInputState();

  const { isPending: loading, mutateAsync: saveMutation } = SendContactAPI();

  const onSubmit: SubmitHandler<ContactsModel> = async (
    payload: ContactsModel,
  ) => {
    try {
      await saveMutation({
        ...payload,
      });
      AlertSuccessNotification({
        text: 'Message send successfully',
      });
      reset({
        subject: '',
        description: '',
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <LayoutDashboard title={'Contact-us'}>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <section className="py-10 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-bold tracking-tight text-center sm:text-4xl lg:text-4xl">
                  {t.formatMessage({ id: 'CONTACT.TITLE' })}
                </h2>
                <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">
                  {t.formatMessage({ id: 'CONTACT.DESCRIPTION' })}
                </p>
              </div>

              <div className="max-w-4xl mx-auto mt-12 sm:mt-16">
                <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                  <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                      <svg
                        className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          stroke-width="1"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <p className="mt-6 text-lg font-medium text-gray-900">
                        +39 3881155086
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        +1-446-526-0117
                      </p>
                    </div>
                  </div>

                  <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                      <svg
                        className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          stroke-width="1"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="mt-6 text-lg font-medium text-gray-900">
                        patrick.noubissi@yahoo.com
                      </p>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        hr@example.com
                      </p>
                    </div>
                  </div>
                  <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                      <svg
                        className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          stroke-width="1"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          strokeLinejoin="round"
                          stroke-width="1"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                        Via santa maria 17. 27029, Vigevano, IT
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 overflow-hidden bg-white rounded-xl">
                  <div className="px-6 py-12 sm:p-12">
                    <h3 className="text-2xl font-semibold text-center text-gray-900">
                      {t.formatMessage({ id: 'CONTACT.SUBTITLE' })}
                    </h3>
                    <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                      <div className="sm:col-span-2 lg:grid-cols-2 gap-x-5 gap-y-4">
                        <div className="items-center">
                          <Label>
                            {t.formatMessage({ id: 'CONTACT.SUBJECT' })}
                          </Label>
                          <TextInput
                            control={control}
                            type="text"
                            name="subject"
                            placeholder="Give a subject"
                            errors={errors}
                          />
                        </div>
                        <div className="my-4">
                          <TextAreaInput
                            control={control}
                            label="Message"
                            name="description"
                            placeholder="We are listening..."
                            errors={errors}
                          />
                        </div>
                        <div className="mt-4 flex items-center space-x-4">
                          <ButtonInput
                            type="submit"
                            className="w-full"
                            variant="primary"
                            disabled={loading}
                            loading={loading}
                          >
                            {t.formatMessage({ id: 'CONTACT.BUTTON' })}
                          </ButtonInput>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <DashboardFooter />
      </LayoutDashboard>
    </>
  );
}
export default PrivateComponent(Contact);
