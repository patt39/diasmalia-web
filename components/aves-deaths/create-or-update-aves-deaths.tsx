import { GetOneAnimalTypeAPI } from '@/api-site/animal-type';
import { CreateOrUpdateOneAvesDeathAPI } from '@/api-site/deaths';
import { useReactHookForm } from '@/components/hooks';
import { ButtonInput } from '@/components/ui-setting';
import { TextAreaInput, TextInput } from '@/components/ui-setting/shadcn';
import { DeathsModel } from '@/types/deaths';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { Label } from '../ui/label';

const schema = yup.object({
  code: yup.string().optional(),
  male: yup.number().optional(),
  female: yup.number().optional(),
  number: yup.number().optional(),
  note: yup.string().required('note is a required field'),
});

const CreateOrUpdateAvesDeaths = ({
  showModal,
  setShowModal,
  death,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  death?: any;
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

  const { data: animalType } = GetOneAnimalTypeAPI({
    animalTypeId: animalTypeId,
  });

  useEffect(() => {
    if (death) {
      const fields = ['code', 'female', 'male', 'number', 'note'];
      fields?.forEach((field: any) => setValue(field, death[field]));
    }
  }, [death, setValue]);

  useEffect(() => {
    if (animal) {
      const fields = ['code'];
      fields?.forEach((field: any) => setValue(field, animal[field]));
    }
  }, [animal, setValue]);

  // Create or Update data
  const { isPending: loading, mutateAsync: saveMutation } =
    CreateOrUpdateOneAvesDeathAPI();

  const onSubmit: SubmitHandler<DeathsModel> = async (payload: DeathsModel) => {
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        deathId: death?.id,
      });
      setHasErrors(false);
      AlertSuccessNotification({
        text: 'Death saved successfully',
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

                {!death?.id ? (
                  <div className="mb-4">
                    <div className="items-center">
                      <Label>{t.formatMessage({ id: 'ANIMAL.CODE' })}</Label>
                      <TextInput
                        control={control}
                        type="text"
                        name="code"
                        errors={errors}
                        disabled
                      />
                    </div>
                    {['Pisciculture', 'Pondeuses'].includes(
                      animalType?.name,
                    ) ? (
                      <div className="mt-2">
                        <Label>
                          {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="number"
                          placeholder="number"
                          errors={errors}
                        />
                      </div>
                    ) : animalType?.name === 'Poulet de chair' &&
                      animal?.productionPhase === 'GROWTH' ? (
                      <div className="mt-2">
                        <Label>
                          {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                          <span className="text-red-600">*</span>
                        </Label>
                        <TextInput
                          control={control}
                          type="number"
                          name="number"
                          placeholder="number"
                          errors={errors}
                        />
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center space-x-10">
                        <div className="w-96">
                          <Label>
                            {t.formatMessage({ id: 'ANIMAL.MALES' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="male"
                            defaultValue="0"
                            placeholder="number of males"
                            errors={errors}
                          />
                        </div>
                        <div className="w-96">
                          <Label>
                            {t.formatMessage({ id: 'ANIMAL.FEMALES' })}
                            <span className="text-red-600">*</span>
                          </Label>
                          <TextInput
                            control={control}
                            type="number"
                            name="female"
                            defaultValue="0"
                            placeholder="number of females"
                            errors={errors}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
                <div className="mb-2">
                  <Label>
                    Cause et moyen de disposition des carcasses
                    <span className="text-red-600">*</span>
                  </Label>
                  <TextAreaInput
                    control={control}
                    name="note"
                    placeholder="cause and disposal method"
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

export { CreateOrUpdateAvesDeaths };
