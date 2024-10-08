import { GetOneTreatmentAPI } from '@/api-site/treatment';
import { useReactHookForm } from '@/components/hooks';
import { TextAreaInput } from '@/components/ui-setting/shadcn';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({});

const ViewAvesTreatment = ({
  showModal,
  setShowModal,
  treatment,
}: {
  showModal: boolean;
  setShowModal: any;
  treatment?: any;
}) => {
  const { control, errors } = useReactHookForm({ schema });

  const { data: getOneTreatment } = GetOneTreatmentAPI({
    treatmentId: treatment?.id,
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
            <form className="mt-2">
              <div className="flex-auto justify-center p-2">
                <div className="mb-2">
                  <Label htmlFor="text">Animal Code</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneTreatment.animal.code}
                  />
                </div>
                <div className="mb-2">
                  <Label htmlFor="text">Treatment name</Label>
                  <Input disabled type="text" value={getOneTreatment?.name} />
                </div>
                <div className="mb-2">
                  <Label htmlFor="text">Diagnostic</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneTreatment?.diagnosis}
                  />
                </div>
                <div className="mb-2 flex items-center space-x-4">
                  <Label htmlFor="text">Treatement:</Label>
                  <Input
                    disabled
                    type="text"
                    value={getOneTreatment?.medication}
                  />
                  <Label htmlFor="text">Doses:</Label>
                  <Input disabled type="number" value={getOneTreatment?.dose} />
                </div>
                <div className="mb-2 disabled">
                  <Label htmlFor="text">Note</Label>
                  <TextAreaInput
                    control={control}
                    name="note"
                    defaultValue={getOneTreatment?.note}
                    errors={errors}
                    disabled
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewAvesTreatment };
