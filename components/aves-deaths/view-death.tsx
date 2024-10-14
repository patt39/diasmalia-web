import { GetOneDeathAPI } from '@/api-site/deaths';
import { useReactHookForm } from '@/components/hooks';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({});

const ViewAvesDeath = ({
  showModal,
  setShowModal,
  death,
}: {
  showModal: boolean;
  setShowModal: any;
  death?: any;
}) => {
  const { t } = useReactHookForm({ schema });

  const { data: GetOneDeath } = GetOneDeathAPI({
    deathId: death?.id,
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
            <form className="mt-4">
              <div className="flex-auto justify-center p-2">
                {['Poulet de chair', 'Pisciculture', 'Pondeuses'].includes(
                  GetOneDeath?.animalType?.name,
                ) ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={GetOneDeath?.number} disabled />
                  </div>
                ) : GetOneDeath?.male !== 0 ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.MALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={GetOneDeath?.male} disabled />
                  </div>
                ) : GetOneDeath?.female !== 0 ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.FEMALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={GetOneDeath?.female} disabled />
                  </div>
                ) : (
                  <div className="my-4 flex items-center space-x-1">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.MALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={GetOneDeath?.male} disabled />
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.FEMALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={GetOneDeath?.female} disabled />
                  </div>
                )}
                <div className="mb-4">
                  <Input defaultValue={GetOneDeath?.note} disabled />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAvesDeath };
