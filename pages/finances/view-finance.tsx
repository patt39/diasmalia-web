import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';

const ViewFinance = ({
  showModal,
  setShowModal,
  finance,
}: {
  showModal: boolean;
  setShowModal: any;
  finance?: any;
}) => {
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
            {finance?.animal !== null ? (
              <div className="flex space-x-4 my-4 w-full">
                <div className="w-80">
                  <Label>Bande</Label>
                  <Input defaultValue={finance?.animal?.code} disabled />
                </div>
                <div className="w-80">
                  <Label>Type</Label>
                  <Input defaultValue={finance?.animalType?.name} disabled />
                </div>
              </div>
            ) : null}
            <div>
              <Label>Details</Label>
              <Textarea defaultValue={finance?.detail} disabled />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewFinance };
