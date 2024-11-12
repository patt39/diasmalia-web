import { GetOneBreedingAPI } from '@/api-site/breedings';
import { XIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const ViewBreeding = ({
  showModal,
  setShowModal,
  breeding,
}: {
  showModal: boolean;
  setShowModal: any;
  breeding?: any;
}) => {
  const { data: OneBreeding } = GetOneBreedingAPI({
    breedingId: breeding?.id,
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
            <form className="mt-6">
              <div className="flex-auto justify-center p-2">
                <div className="mb-4 disabled">
                  <Textarea defaultValue={OneBreeding?.note} disabled />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewBreeding };
