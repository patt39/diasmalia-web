import { GetOneIsolationAPI } from '@/api-site/isolations';
import { useReactHookForm } from '@/components/hooks';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const schema = yup.object({});

const ViewAvesIsolation = ({
  showModal,
  setShowModal,
  isolation,
}: {
  showModal: boolean;
  setShowModal: any;
  isolation?: any;
}) => {
  const { t } = useReactHookForm({ schema });

  const { data: getOneIsolation } = GetOneIsolationAPI({
    isolationId: isolation?.id,
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
                  getOneIsolation?.animalType?.name,
                ) ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'NUMBER.ANIMALS' })}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={getOneIsolation?.number} disabled />
                  </div>
                ) : getOneIsolation?.male !== 0 ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.MALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={getOneIsolation?.male} disabled />
                  </div>
                ) : getOneIsolation?.female !== 0 ? (
                  <div className="my-4">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.FEMALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={getOneIsolation?.female} disabled />
                  </div>
                ) : (
                  <div className="my-4 flex items-center space-x-1">
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.MALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={getOneIsolation?.male} disabled />
                    <Label>
                      {t.formatMessage({ id: 'ANIMAL.FEMALES' })}:
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input defaultValue={getOneIsolation?.female} disabled />
                  </div>
                )}
                <div className="mb-4">
                  <Textarea placeholder={getOneIsolation?.note} disabled />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAvesIsolation };
