import { GetOneFarrowingAPI } from '@/api-site/farrowings';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { Textarea } from '../ui/textarea';

const ViewFarrowing = ({
  showModal,
  setShowModal,
  farrowing,
}: {
  showModal: boolean;
  setShowModal: any;
  farrowing?: any;
}) => {
  const { data: getOneFarrowing } = GetOneFarrowingAPI({
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
            <form className="mt-6">
              <div className="flex-auto justify-center p-2">
                <div className="justify-items-center items-center">
                  <Image
                    className="lg:w-[300px] lg:h-[250px] lg:my-auto my-auto rounded-sm"
                    src={getOneFarrowing?.image}
                    alt="https://diasmalia-buck.s3.eu-central-1.amazonaws.com/photos/desinfection.jpeg20241114-cNrK.jpeg"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="my-4 disabled">
                  <Textarea defaultValue={getOneFarrowing?.note} disabled />
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
