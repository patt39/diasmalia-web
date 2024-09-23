import { GetOneAnimalAPI } from '@/api-site/animals';
import { XIcon } from 'lucide-react';
import { useIntl } from 'react-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';

const ViewHealth = ({
  showModal,
  setShowModal,
  animal,
}: {
  showModal: boolean;
  setShowModal: any;
  animal?: any;
}) => {
  const t = useIntl();
  const { data: getOneAnimal } = GetOneAnimalAPI({
    animalId: animal?.id,
  });

  return (
    <>
      {showModal ? (
        <div className="max-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-2xl overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent mb-auto text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl mb-4 dark:text-white">
                <XIcon />
              </span>
            </button>
            {getOneAnimal?.treatments?.map((item: any) => (
              <>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full my-4 justify-items-center"
                  key={item?.id}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{item?.name}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-x-8 flex">
                        <div>Medication: {item?.medication.toLowerCase()} </div>
                        <div> Dose: {item?.dose} </div>
                        <div> Voie: {item?.method.toLowerCase()}</div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export { ViewHealth };
