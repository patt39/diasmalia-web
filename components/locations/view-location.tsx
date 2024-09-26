import { GetOneLocationAPI } from '@/api-site/locations';
import { capitalizeFirstLetter } from '@/utils/utils';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const ViewLocation = ({
  showModal,
  setShowModal,
  location,
}: {
  showModal: boolean;
  setShowModal: any;
  location?: any;
}) => {
  const t = useIntl();
  const { data: getOneLocation } = GetOneLocationAPI({
    locationId: location?.id,
  });

  return (
    <>
      {showModal ? (
        <div className="max-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll  bg-gray-100 rounded-xl hover:bg-gray-200">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <form className="my-6">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {getOneLocation?.animals.map((item: any) => (
                  <>
                    <Card
                      x-chunk="dashboard-05-chunk-1"
                      className=" dark:border-gray-800"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg" key={item?.id}>
                          {item?.code}
                        </CardTitle>
                        <CardDescription className="mb-2">
                          Poid: {item?.weight}kg
                        </CardDescription>
                        <CardDescription>
                          Genre: {capitalizeFirstLetter(item?.gender)}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </>
                ))}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewLocation };
