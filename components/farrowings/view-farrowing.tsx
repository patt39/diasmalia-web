import { GetOneFarrowingAPI } from '@/api-site/farrowings';
import { TextAreaInput } from '@/components/ui-setting/shadcn';
import { XIcon } from 'lucide-react';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const schema = yup.object({});

const ViewFarrowing = ({
  showModal,
  setShowModal,
  farrowing,
}: {
  showModal: boolean;
  setShowModal: any;
  farrowing?: any;
}) => {
  const { control, errors } = useReactHookForm({ schema });

  const { data: GetOneFarrowing } = GetOneFarrowingAPI({
    farrowingId: farrowing.id,
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
                <div className="mb-4 flex items-center space-x-4">
                  <Label>Litter</Label>
                  <Input disabled type="text" value={GetOneFarrowing.litter} />
                </div>
                <div className="mb-4 disabled">
                  <TextAreaInput
                    control={control}
                    label="Note"
                    name="note"
                    defaultValue={GetOneFarrowing.note}
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

export { ViewFarrowing };
