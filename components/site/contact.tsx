import { SendContactAPI } from '@/api-site/contact';
import { ContactsModel } from '@/types/contact';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ButtonInput } from '../ui-setting';
import { TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const schema = yup.object({
  email: yup.string().optional(),
  phone: yup.string().required('phone is required'),
  fullName: yup.string().required('fullName is required'),
  description: yup.string().required('description is required'),
});
const Contact = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone: '',
      email: '',
      fullName: '',
      description: '',
    },
  });

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
        phone: '',
        email: '',
        fullName: '',
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
      <section className="py-12 bg-gray-50 sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 xl:gap-x-36">
            <div className="flex flex-col self-stretch justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-4xl">
                  Contact Us
                </h2>
                <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
                  Get in touch with us for what so ever question or additional
                  insight you want from us
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:mt-auto">
                <div>
                  <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                    USA OFFICE Hours
                  </h3>
                  <p className="mt-5 text-base font-medium text-gray-900">
                    Monday-Friday
                    <br />
                    8:00 am to 5:00 pm
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                    Our Address
                  </h3>
                  <p className="mt-5 text-base font-medium text-gray-900">
                    8502 Preston Rd. Ingle, <br />
                    Maine 98380, USA
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                    Canada Office Hours
                  </h3>
                  <p className="mt-5 text-base font-medium text-gray-900">
                    8502 Preston Rd. Ingle, <br />
                    Maine 98380, USA
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-medium tracking-widest text-blue-600 uppercase">
                    Get In Touch
                  </h3>
                  <p className="mt-5 text-base font-medium text-gray-900">
                    +1-246-888-0653
                    <br />
                    +1-222-632-0194
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-xl rounded-2xl">
              <div className="p-6 sm:p-10">
                <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2">
                    <Label className="text-base font-medium text-gray-900">
                      Nom complet
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="fullName"
                      placeholder="Full name"
                      errors={errors}
                    />
                  </div>
                  <div className="mb-2">
                    <Label className="text-base font-medium text-gray-900">
                      Numero de télephone
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      errors={errors}
                    />
                  </div>
                  <div className="mb-2">
                    <Label className="text-base font-medium text-gray-900">
                      Email address
                    </Label>
                    <TextInput
                      control={control}
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      errors={errors}
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium text-gray-900">
                      Message
                    </Label>
                    <TextAreaInput
                      control={control}
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
                      Send message
                    </ButtonInput>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Contact };
