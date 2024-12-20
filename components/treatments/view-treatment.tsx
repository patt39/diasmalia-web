import { XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const ViewTreatment = ({
  showModal,
  setShowModal,
  treatment,
}: {
  showModal: boolean;
  setShowModal: any;
  treatment?: any;
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
            <form className="mt-6">
              <div className="flex-auto justify-center p-2">
                <div className="mb-4 flex items-center space-x-2">
                  <Label htmlFor="text">Code:</Label>
                  <Input disabled value={treatment?.animal?.code} />
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  <Label>Treatment:</Label>
                  <Input disabled value={treatment?.name} />
                </div>
                <div className="mb-4 flex items-center space-x-2">
                  <Label>Diagnostic:</Label>
                  <Input disabled value={treatment?.diagnosis} />
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  <Label>Medication:</Label>
                  <Input disabled value={treatment.health?.name} />
                </div>
                <Label>Observation</Label>
                <div className="mb-4 disabled">
                  <Textarea value={treatment?.note} disabled />
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewTreatment };
